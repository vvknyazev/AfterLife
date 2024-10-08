const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const UserDto = require('../dtos/user-dto');
const refresh = require('passport-oauth2-refresh');
const {generateFromEmail} = require('unique-username-generator');

function generateActivationCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateJwt = (id, email, role, isActivated) => {
    return jwt.sign(
        {id, email, role, isActivated},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn: '15m'}
    )
}
const generateRefreshJwt = (id, email, role, isActivated) => {
    return jwt.sign(
        {id, email, role, isActivated},
        process.env.REFRESH_SECRET_KEY,
        {expiresIn: '30d'}
    )
}

async function generateUniqueUsername(email) {
    let username;
    let isUnique = false;

    while (!isUnique) {
        username = generateFromEmail(email, 3);
        const existingUser = await User.findOne({username});
        if (!existingUser) {
            isUnique = true;
        }
    }

    return username;
}

class UserController {

    async registration(req, res) {

        // const {username, email, password, role} = req.body;
        const {email, password, role} = req.body;
        if (!email || !password) {
            // return next(ApiError.badRequest('Некорректный email или password'))
            return res.status(400).json({'message': 'Username and password are required.'});
        }

        const candidateEmail = await User.findOne({email});
        // const candidateUsername = await User.findOne({username});
        if (candidateEmail) {
            // return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            return res.sendStatus(409);
        }
        const username = await generateUniqueUsername(email);

        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4();

        const activationCode = generateActivationCode();

        const user = await User.create({
            username,
            email,
            role,
            password: hashPassword,
            activationLink: activationLink,
            activationCodeGeneratedAt: new Date(),
            activationCode: activationCode
        });

        await mailService.sendActivationToMail(email, activationCode);

        const userDto = new UserDto(user); //email, id, isActivated

        const accessToken = generateJwt(user.id, user.email, user.role, user.isActivated);

        const refreshToken = generateRefreshJwt(user.id, user.email, user.role, user.isActivated);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.json({accessToken})
    }

    async resend(req, res) {
        const {email} = req.body;
        console.log("req.body: ", req.body);
        if (!email) {
            return res.status(400).json({'message': 'Email is required.'});
        }
        try {
            const activationCode = generateActivationCode();

            const user = await User.findOne({email});
            user.activationCode = activationCode;
            user.activationCodeGeneratedAt = new Date();
            user.currentStep = 2;
            await user.save();

            await mailService.sendActivationToMail(email, activationCode);

            return res.status(200).json({'message': 'Activation code sent successfully.'});
        } catch (error) {
            return res.status(500).json({'message': 'Failed to send activation code. Please try again later.'});
        }
    }

    async login(req, res) {
        const {email, password} = req.body
        console.log(req.body);
        console.log(email);
        console.log(password);
        const user = await User.findOne({email});
        if (!user) {
            // return next(ApiError.internal('Пользователь не найден'))
            return res.sendStatus(401);
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword || email !== user.email) {
            // return next(ApiError.internal('Указан неверный пароль или имя пользователя'))
            return res.sendStatus(401);
        }
        const accessToken = generateJwt(user.id, user.email, user.role, user.isActivated);
        const refreshToken = generateRefreshJwt(user.id, user.email, user.role, user.isActivated);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000,

        });
        res.json({accessToken});
    }

    async refresh(req, res) {
        console.log("refresh func")
        const cookies = req.cookies;
        console.log("cookies.jwt: ", cookies.jwt);
        console.log("cookies: ", cookies);

        if (cookies?.session) {
            // console.log("req.session passport user refreshtoken: ", req.session.passport.user.refreshToken);
            if (req?.session?.passport?.user?.source === 'discord') {
                res.sendStatus(200);
                // refresh.requestNewAccessToken(
                //     'discord',
                //     req.session.passport.user.refreshToken,
                //     function (err, accessToken, refreshToken) {
                //         console.log("err: ", err)
                //         console.log("accessToken: ", accessToken)
                //         console.log("refreshToken: ", refreshToken)
                //         req.session.passport.user.refreshToken = accessToken;
                //         res.json({accessToken})
                //     },);

            } else if (req?.session?.passport?.user?.source === 'google') {
                res.sendStatus(200);
                // refresh.requestNewAccessToken(
                //     'google',
                //     req.session.passport.user.refreshToken,
                //     function (err, accessToken, refreshToken) {
                //         console.log("err: ", err)
                //         console.log("accessToken: ", accessToken)
                //         console.log("refreshToken: ", refreshToken)
                //         req.session.passport.user.refreshToken = accessToken;
                //         res.json({accessToken})
                //     },);
            } else {
                res.sendStatus(200);
            }
        } else if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const user = await User.findOne({refreshToken});

            if (!user) return res.sendStatus(403); //Forbidden

            jwt.verify(
                refreshToken,
                process.env.REFRESH_SECRET_KEY,
                (err, decoded) => {
                    if (err || user.email !== decoded.email) return res.sendStatus(403);
                    const accessToken = generateJwt(user.id, user.email, user.role, user.isActivated);
                    res.json({accessToken})
                }
            );
        } else {
            return res.sendStatus(401);
        }
    }

    async logout(req, res) {
        const cookies = req.cookies;
        console.log("its logout function")
        console.log("cookies.jwt: in logout ", cookies.jwt);
        console.log("cookies: in logout", cookies);
        // console.log("logout func")
        // console.log("req.cookies: ", req?.cookies);
        // console.log("cookies?.session: ", req.cookies?.session);
        // res.clearCookie('session');
        // res.cookie('test1', 'test1', {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: 30 * 24 * 60 * 60 * 1000,
        //
        // });
        // req.session.hello = "hello";
        // console.log("req.session: ", req.session);
        // res.clearCookie('test', {httpOnly: true, sameSite: 'none', secure: true, domain: ".localhost:3000", path:'/'});
        // res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        // res.end();
        if (req?.user) {
            req.session = null;
            res.redirect(process.env.CLIENT_URL); // ????
            // return res.sendStatus(204);
            // Clear the session cookie by its name
            // res.clearCookie('test', {httpOnly: true, sameSite: 'None', secure: true});
            // res.sendStatus(204);
            // Redirect to the desired location, such as the home page
            // res.redirect(process.env.CLIENT_URL);
            // req.logout();
            // req.session = null;
            // req.session.save();
            // res.clearCookie('session', {httpOnly: true, sameSite: 'None', secure: true});
            // res.clearCookie('session.sig', {httpOnly: true, sameSite: 'None', secure: true});
            // res.end();
            // res.sendStatus(204);
            // req.session = null;
            // console.log("req.user: ", req.user);
            // console.log("cookies?.session: ", req.cookies?.session);
            // console.log("req.cookies: ", req.cookies);
            // res.clearCookie('session', {httpOnly: true, sameSite: 'None', secure: true});
            // const user = await User.findOne({email: req.user.email});
            // user.refreshToken = '';
            // const result = await user.save();
            // console.log("result: ", result);
            // console.log("req.session.cookie: ", result);
            //
        } else {

            const cookies_jwt = req.cookies.jwt;
            console.log("logout another check coockie: ", cookies_jwt);
            if (!cookies_jwt) return res.sendStatus(204); // No Content
            const refreshToken = cookies_jwt;


            // Is refreshToken in db?
            const user = await User.findOne({refreshToken});
            console.log("finded user: ", user)
            if (!user) {
                res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
                return res.sendStatus(204);
            }
            // Delete refreshToken in db

            user.refreshToken = '';
            const result = await user.save();
            console.log("result: ", result);

            // res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
            res.sendStatus(204);
        }
    }

    async activate(req, res) {

        const {activationCode} = req.body;

        const activationCodeParsed = parseInt(activationCode.join(''), 10);

        console.log("activationCodeParsed: ", activationCodeParsed)

        const user = await User.findOne({activationCode: activationCodeParsed});
        console.log("USER WHEN EXPIRED: ", user);
        if (!user) {
            return res.status(400).json({message: 'Неверный код активации'});
        }

        const now = new Date();
        const activationCodeGeneratedAt = new Date(user.activationCodeGeneratedAt);
        const fifteenMinutes = 15 * 60 * 1000;
        // const fifteenMinutes = 15;

        if (now - activationCodeGeneratedAt > fifteenMinutes) {
            // await User.deleteOne({ _id: user._id });
            return res.status(400).json({message: 'Activation code has expired'});
        }

        user.isActivated = true;
        user.currentStep = 3;
        await user.save();

        return res.json({message: 'Аккаунт успешно активирован'});

        // const activationLink = req.params.link;
        // const user = await User.findOne({activationLink});
        // if (user) {
        //     user.isActivated = true;
        //     await user.save();
        //     // await userService.activate(activationLink);
        //     return res.redirect(process.env.CLIENT_URL);
        // } else {
        //     console.log("Ссылка активации говно");
        // }

    }

    async checkUsername(req, res) {
        const {nickname} = req.body;

        if (!nickname) {
            return res.status(400).json({message: 'Username is required'});
        }
        const cookies_jwt = req.cookies.jwt;


        try {
            if (cookies_jwt) {
                const refreshToken = cookies_jwt;
                const selfUser = await User.findOne({refreshToken});

                const user = await User.findOne({username: nickname});

                if (user && user.username !== selfUser.username) {
                    return res.status(200).json({exists: true, message: 'Username already exists'});
                } else {
                    return res.status(200).json({exists: false, message: 'Username is available'});
                }
            } else if (req?.user) {
                const selfUser = await User.findOne({email: req.user.email})
                const user = await User.findOne({username: nickname});
                if (user && user.username !== selfUser.username) {
                    return res.status(200).json({exists: true, message: 'Username already exists'});
                } else {
                    return res.status(200).json({exists: false, message: 'Username is available'});
                }
            }

        } catch (error) {
            console.error('Error checking username:', error);
            return res.status(500).json({message: 'Internal server error'});
        }

    }

    async completeRegistration(req, res) {
        const {username, dob, gender} = req.body;

        if (!username || !dob || !gender) {
            return res.status(400).json({message: 'Data required'});
        }

        const cookies_jwt = req.cookies.jwt;
        // if (!cookies_jwt) return res.sendStatus(204);


        try {
            if (cookies_jwt) {
                const refreshToken = cookies_jwt;
                const user = await User.findOne({refreshToken});
                user.username = username;
                user.dob = dob;
                user.gender = gender;
                user.currentStep = 4;
                await user.save();
                return res.status(200).json({message: 'Username updated'});
            } else if (req?.user) {
                const user = await User.findOne({email: req.user.email})
                user.username = username;
                user.dob = dob;
                user.gender = gender;
                user.currentStep = 4;
                await user.save();
                return res.status(200).json({message: 'Username updated'});
            } else {
                return res.sendStatus(204);
            }


        } catch (error) {
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    async step(req, res) {
        const cookies_jwt = req.cookies.jwt;

        if (cookies_jwt) {
            const refreshToken = cookies_jwt;
            const user = await User.findOne({refreshToken});
            if (user) {
                return res.json(user.currentStep);
            }
        } else if (req?.user) {
            if (req.user.isNewUser) {
                const user = await User.findOne({email: req.user.email})
                user.isNewUser = false;
                await user.save();
            }
            return res.json(req.user.currentStep);
        }

        return res.sendStatus(204);
    }

    async check(req, res) {
        if (req.user) {
            const userDto = new UserDto(req.user);
            return res.json(userDto);
        } else {
            const cookies_jwt = req.cookies.jwt;
            console.log("cookies_jwt: ", cookies_jwt)
            if (!cookies_jwt) return res.sendStatus(204); // No Content
            const refreshToken = cookies_jwt;

            // Is refreshToken in db?
            const user = await User.findOne({refreshToken});
            if (!user) {
                console.log("не авторизован");
                return res.sendStatus(403);
            }

            const userDto = new UserDto(user);
            return res.json(userDto);
        }
    }
}

module.exports = new UserController()
