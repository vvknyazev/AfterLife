const User = require("../models/user");

class ModelController {
    async getAll(req, res) {
        try {
            const models = await User.find({role: 'MODEL'}, {
                password: 0,
                refreshToken: 0,
                email: 0,
                activationLink: 0,
                isActivated: 0
            });
            res.json(models);
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }
    }

    async getOne(req, res) {
        const {id} = req.params; //id from route /:id
        console.log("ID: ", id)
        try {
            if (id !== undefined && id !== "undefined") {
                console.log("req params", req.params)
                const model = await User.findOne({_id: id}, {
                    password: 0,
                    refreshToken: 0,
                    email: 0,
                    activationLink: 0,
                    isActivated: 0
                });

                res.json(model);
                console.log(model);
            } else {
                res.status(500).send('Произошла ошибка при получении пользователей.');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }

    }

    async search(req, res) {
        try {
            const {q} = req.query;

            console.log("q: ", q);

            const models = await User.find({role: 'MODEL'}, {
                password: 0,
                refreshToken: 0,
                email: 0,
                activationLink: 0,
                isActivated: 0
            });
            let found;
            if (q) {
                found = await User.find({
                    role: 'MODEL',
                    $or: [
                        { username: { $regex: q, $options: 'i' } },
                        { name: { $regex: q, $options: 'i' } }
                    ]
                }, {
                    password: 0,
                    refreshToken: 0,
                    email: 0,
                    activationLink: 0,
                    isActivated: 0,
                });
                console.log("found: ", found);
            }

            q ? res.json(found.slice(0, 5)) : res.json(models.slice(0, 5));

        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка');
        }
    }
}

module.exports = new ModelController()
