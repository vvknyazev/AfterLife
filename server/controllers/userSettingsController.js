const fs = require("fs");
const User = require("../models/user");

class UserSettingsController {
    async uploadPhoto(req, res) {

        const cookies_jwt = req.cookies.jwt;

        console.log("req.user: ", req.user);
        if (req?.user){
            if (req.file) {
                const fileExtension = req.file.mimetype.split('/')[1];
                const fileName = `${req.user.id}.${fileExtension}`;
                fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                    if (err) throw err;
                });

                const user = await User.findOne({email: req.user.email})
                user.photo = `media/${fileName}`;
                await user.save();
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
        console.log(req.user);

        const cookies_jwt = req.cookies.jwt;

        if (req?.user){
            const user = await User.findOne({email: req.user.email})

            user.name = name;
            user.bio = bio;
            user.games = games;

            await user.save();
            return res.sendStatus(204);

        } else if (cookies_jwt) {
            const refreshToken = cookies_jwt;
            const user = await User.findOne({refreshToken});

            user.name = name;
            user.bio = bio;
            user.games = games;

            await user.save();
            return res.sendStatus(204);
        }
    }
}

module.exports = new UserSettingsController()