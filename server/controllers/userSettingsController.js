const fs = require("fs");
const UserGoogle = require("../models/userGoogle");
const UserDiscord = require("../models/userDiscord");
const User = require("../models/user");
const UserDto = require("../dtos/user-dto");

class UserSettingsController {
    async uploadPhoto(req, res) {

        const cookies_jwt = req.cookies.jwt;

        if (req.user?.googleId) {
            if (req.file) {
                const fileExtension = req.file.mimetype.split('/')[1];
                const fileName = `${req.user.googleId}.${fileExtension}`;
                fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                    if (err) throw err;
                });

                const userGoogle = await UserGoogle.findOne({googleId: req.user.googleId});
                userGoogle.photo = `media/${fileName}`;
                await userGoogle.save();
            }
            return res.sendStatus(204);
        } else if (req.user?.discordId) {
            if (req.file) {
                const fileExtension = req.file.mimetype.split('/')[1];
                const fileName = `${req.user.discordId}.${fileExtension}`;
                fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                    if (err) throw err;
                });

                const userDiscord = await UserDiscord.findOne({discordId: req.user.discordId});
                userDiscord.photo = `media/${fileName}`;
                await userDiscord.save();
            }
            return res.sendStatus(204);
        } else if (cookies_jwt) {
            const refreshToken = cookies_jwt;
            const user = await User.findOne({refreshToken});

            if (req.file) {
                const fileExtension = req.file.mimetype.split('/')[1];
                const fileName = `${user._id}.${fileExtension}`;

                fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                    if (err) throw err;
                });
                user.photo = `media/${fileName}`;

                await user.save();
            }

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