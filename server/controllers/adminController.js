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
}

module.exports = new AdminController()