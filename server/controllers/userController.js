const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateJwt = (id, username ,email, role) => {
    return jwt.sign(
        {id, username, email, role},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn: '15m'}
    )
}
const generateRefreshJwt = (id, username, email, role) => {
    return jwt.sign(
        {id, username, email, role},
        process.env.REFRESH_SECRET_KEY,
        {expiresIn: '30d'}
    )
}

class UserController {
    async registration(req, res, next) {

        const {username, email, password, role} = req.body;
        if (!username || !email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({email});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, role, password: hashPassword})
        const accessToken = generateJwt(user.id, user.username, user.email, user.role);
        const refreshToken = generateRefreshJwt(user.id, user.username, user.email, user.role);
        return res.json({accessToken})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        console.log(req.body);
        console.log(email);
        console.log(password);
        const user = await User.findOne({email});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword || email !== user.email) {
            return next(ApiError.internal('Указан неверный пароль или имя пользователя'))
        }
        const accessToken = generateJwt(user.id, user.username, user.email, user.role);
        const refreshToken = generateRefreshJwt(user.id, user.username, user.email, user.role);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",

        });
        res.json({accessToken});
    }

    async refresh(req, res, next) {

        const cookies = req.cookies;
        console.log(cookies.jwt);
        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies.jwt;
        const user = await User.findOne({refreshToken});

        if (!user) return res.sendStatus(403); //Forbidden
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
            (err, decoded) => {
                if (err || user.email !== decoded.email) return res.sendStatus(403);
                const accessToken = generateJwt(user.id, user.username, user.email, user.role);
                res.json({accessToken})
            }
        );
    }

    async logout(req, res) {
        const cookies_jwt = req.cookies.jwt;
        if (!cookies_jwt) return res.sendStatus(204); // No Content
        const refreshToken = cookies_jwt;


        // Is refreshToken in db?
        const user = await User.findOne({refreshToken});
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        // Delete refreshToken in db
        user.refreshToken = '';
        const result = await user.save();
        console.log(result);

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        // res.redirect('/api/user/login');
        res.sendStatus(204);
    }

    async check(req, res) {
        return res.json({message: "only access for auth users, and you are in"})
    }
}

module.exports = new UserController()
