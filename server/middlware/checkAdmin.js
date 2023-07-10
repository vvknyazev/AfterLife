const jwt = require("jsonwebtoken");
const User = require('../models/user');

module.exports = function (req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(403).json({message: "User is not authorized"});
    }
    if (token) {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, data) => {
            if (err) {
                res.locals.admin = null;
                next();
            } else {
                if (data.roles.includes('ADMIN')) {
                    res.locals.admin = await User.findById(data.id).lean();
                } else {
                    return res.status(403).json({message: "You are not an admin"});
                }
                next();
            }
        });
    } else {
        res.locals.admin = null;
        next();
    }
}