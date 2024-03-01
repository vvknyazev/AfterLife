const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const UserDto = require('../dtos/user-dto');
const refresh = require('passport-oauth2-refresh');

function generateActivationCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateJwt = (id, username, email, role, isActivated) => {
    return jwt.sign(
        {id, username, email, role, isActivated},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn: '15m'}
    )
}
const generateRefreshJwt = (id, username, email, role, isActivated) => {
    return jwt.sign(
        {id, username, email, role, isActivated},
        process.env.REFRESH_SECRET_KEY,
        {expiresIn: '30d'}
    )
}

class UserController {
    async registration(req, res) {

        const {username, email, password, role} = req.body;
        if (!username || !email || !password) {
            // return next(ApiError.badRequest('Некорректный email или password'))
            return res.status(400).json({'message': 'Username and password are required.'});
        }

        const candidateEmail = await User.findOne({email});
        const candidateUsername = await User.findOne({username});
        if (candidateEmail || candidateUsername) {
            // return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            return res.sendStatus(409);
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4();

        const activationCode = generateActivationCode();

        const user = await User.create({
            username,
            email,
            role,
            password: hashPassword,
            activationLink: activationLink,
            activationCode: activationCode
        });

        await mailService.sendActivationToMail(email, activationCode);

        const userDto = new UserDto(user); //email, id, isActivated

        const accessToken = generateJwt(user.id, user.username, user.email, user.role, user.isActivated);

        const refreshToken = generateRefreshJwt(user.id, user.username, user.email, user.role, user.isActivated);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.json({accessToken})
    }


    async login(req, res, next) {
        const {email, password} = req.body
        console.log(req.body);
        console.log(email);
        console.log(password);
        const user = await User.findOne({email});
        if (!user) {
            // return next(ApiError.internal('Пользователь не найден'))
            return res.sendStatus(401);
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword || email !== user.email) {
            // return next(ApiError.internal('Указан неверный пароль или имя пользователя'))
            return res.sendStatus(401);
        }
        const accessToken = generateJwt(user.id, user.username, user.email, user.role, user.isActivated);
        const refreshToken = generateRefreshJwt(user.id, user.username, user.email, user.role, user.isActivated);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,

        });
        res.json({accessToken});
    }

    async refresh(req, res, next) {
        console.log("refresh func")
        const cookies = req.cookies;
        console.log("cookies.jwt: ", cookies.jwt);
        console.log("cookies: ", cookies);

        if (cookies?.session) {
            console.log("req.session passport user refreshtoken: ", req.session.passport.user.refreshToken);
            if (req?.session?.passport?.user.source === 'discord'){

                refresh.requestNewAccessToken(
                    'discord',
                    req.session.passport.user.refreshToken,
                    function (err, accessToken, refreshToken) {
                        console.log("err: ", err)
                        console.log("accessToken: ", accessToken)
                        console.log("refreshToken: ", refreshToken)
                        req.session.passport.user.refreshToken = accessToken;
                        res.json({accessToken})
                    },);

            } else if (req?.session?.passport?.user?.source === 'google'){
                refresh.requestNewAccessToken(
                    'google',
                    req.session.passport.user.refreshToken,
                    function (err, accessToken, refreshToken) {
                        console.log("err: ", err)
                        console.log("accessToken: ", accessToken)
                        console.log("refreshToken: ", refreshToken)
                        req.session.passport.user.refreshToken = accessToken;
                        res.json({accessToken})
                    },);
            } else{
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
                    const accessToken = generateJwt(user.id, user.username, user.email, user.role, user.isActivated);
                    res.json({accessToken})
                }
            );
        } else {
            return res.sendStatus(401);
        }
    }

    async logout(req, res) {
        const cookies_jwt = req.cookies.jwt;
        if (!cookies_jwt) return res.sendStatus(204); // No Content
        const refreshToken = cookies_jwt;


        // Is refreshToken in db?
        const user = await User.findOne({refreshToken});
        if (!user) {
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
            return res.sendStatus(204);
        }

        // Delete refreshToken in db
        user.refreshToken = '';
        const result = await user.save();
        console.log(result);

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204);
    }

    async activate(req, res, next) {

        const {activationCode} = req.body;

        const activationCodeParsed = parseInt(activationCode.join(''), 10);

        const user = await User.findOne({activationCode: activationCodeParsed});


        if (!user) {
            return res.status(400).json({message: 'Неверный код активации'});
        }

        user.isActivated = true;
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
