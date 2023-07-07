const fs = require("fs");
const UserGoogle = require("../models/userGoogle");
const UserDiscord = require("../models/userDiscord");
const User = require("../models/user");

class UserSettingsController {
    async uploadPhoto(req, res) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            if (err) throw err;
        });

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
        } else if (req.user?.email) {
            const user = await User.findOne({email: req.user.email});
            user.photo = `${process.env.API_URL}/${req.file.originalname}`;
            await user.save();
            return res.sendStatus(204);
        }
    }

    async saveInfo(req, res) {
        const {name, bio} = req.body;

        if (req.user?.googleId) {
            const userGoogle = await UserGoogle.findOne({googleId: req.user.googleId});

            userGoogle.name = name;

            userGoogle.bio = bio;

            await userGoogle.save();
            return res.sendStatus(204);
        } else if (req.user?.discordId) {
            const userDiscord = await UserDiscord.findOne({discordId: req.user.discordId});

            userDiscord.name = name;

            userDiscord.bio = bio;

            await userDiscord.save();
            return res.sendStatus(204);
        } else if (req.user?.email) {
            const user = await User.findOne({email: req.user.email});

            user.name = name;

            user.bio = bio;

            await user.save();
            return res.sendStatus(204);
        }
    }
}

module.exports = new UserSettingsController()