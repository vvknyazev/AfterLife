const User = require("../models/user");

class ModelController {
    async getAll(req, res) {
        try {
            const models = await User.find({ role: 'MODEL' }, {password: 0, refreshToken: 0, email: 0, activationLink: 0, isActivated: 0});
            res.json(models);
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }
    }
    async getOne(req, res){
        const {id} = req.params; //id from route /:id

        const model = await User.findOne({_id: id}, {password: 0, refreshToken: 0, email: 0, activationLink: 0, isActivated: 0});

        res.json(model);
        console.log(model);
    }
}
module.exports = new ModelController()