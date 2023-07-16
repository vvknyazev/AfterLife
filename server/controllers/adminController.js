const User = require("../models/user");


class AdminController {
    async getFullAll(req, res) {
        try {
            const models = await User.find({role: 'MODEL'});
            res.json(models);
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }
    }

    async getFullOne(req, res) {
        const {id} = req.params; //id from route /:id

        const model = await User.findOne({_id: id});

        res.json(model);
        console.log(model);
    }

    async changeModel(req, res) {
        const {id, username, email, name, bio, photoURL, games} = req.body;
        console.log("req body: ", req.body);
        const model = await User.findOne({_id: id});
        model.username = username;
        model.email = email;
        model.name = name;
        model.bio = bio;
        model.photo = photoURL;
        model.games = games;
        await model.save();
        return res.sendStatus(204);
    }
}

module.exports = new AdminController()