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
        console.log("ID: ", id)
        try {
            if (id !== undefined && id !== "undefined") {
                console.log("req params", req.params)
                console.log('я какого-то хуя тут выполняюсь, вот мой id', id);
                const model = await User.findOne({_id: id}, {
                    password: 0,
                    refreshToken: 0,
                    email: 0,
                    activationLink: 0,
                    isActivated: 0
                });

                res.json(model);
                console.log(model);
            } else{
                res.status(500).send('Произошла ошибка при получении пользователей.');
            }
        } catch (err){
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }

    }
}
module.exports = new ModelController()