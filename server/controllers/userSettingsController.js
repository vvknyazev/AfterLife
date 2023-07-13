const fs = require("fs");
const UserGoogle = require("../models/userGoogle");
const UserDiscord = require("../models/userDiscord");
const User = require("../models/user");
const UserDto = require("../dtos/user-dto");

class UserSettingsController {
    async uploadPhoto(req, res) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            if (err) throw err;
        });

        const cookies_jwt = req.cookies.jwt;

        if (req.user?.googleId) {
            const userGoogle = await UserGoogle.findOne({googleId: req.user.googleId});
            userGoogle.photo = `${process.env.API_URL}/${req.file.originalname}`;
            await userGoogle.save();
            return res.sendStatus(204);
        } else if (req.user?.discordId) {
            const userDiscord = await UserDiscord.findOne({discordId: req.user.discordId});
            userDiscord.photo = `${process.env.API_URL}/${req.file.originalname}`;
            await userDiscord.save();
            return res.sendStatus(204);
        } else if (cookies_jwt) {
            const refreshToken = cookies_jwt;
            const user = await User.findOne({refreshToken});
            user.photo = `${process.env.API_URL}/${req.file.originalname}`;
            await user.save();
            return res.sendStatus(204);
        }

    }

    async saveInfo(req, res) {
        const {name, bio, games} = req.body;
        console.log(req.body);

        const cookies_jwt = req.cookies.jwt;

        if (req.user?.googleId) {
            const userGoogle = await UserGoogle.findOne({googleId: req.user.googleId});

            userGoogle.name = name;

            userGoogle.bio = bio;

            userGoogle.games = games;

            await userGoogle.save();
            return res.sendStatus(204);
        } else if (req.user?.discordId) {
            const userDiscord = await UserDiscord.findOne({discordId: req.user.discordId});

            userDiscord.name = name;

            userDiscord.bio = bio;

            userDiscord.games = games;

            await userDiscord.save();
            return res.sendStatus(204);
        } else if (cookies_jwt) {
            console.log("CHANGES")
            const refreshToken = cookies_jwt;
            const user = await User.findOne({refreshToken});
            user.name = name;

            user.bio = bio;

            user.games = games;

            console.log('games', games);

            await user.save();
            return res.sendStatus(204);
        }
    }
}

module.exports = new UserSettingsController()