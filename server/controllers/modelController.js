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
            const { q, games } = req.query;

            // Преобразуем games в массив, если он передан
            const searchGames = games ? games.split(',') : [];
            console.log("searchGames: ", searchGames);

            // Основной критерий поиска
            let searchCriteria = { role: 'MODEL' };

            // Добавляем критерии поиска по username или name, если q задан
            if (q) {
                searchCriteria.$or = [
                    { username: { $regex: q, $options: 'i' } },
                    { name: { $regex: q, $options: 'i' } }
                ];
            }

            // Добавляем критерий поиска по категориям игр, если games заданы
            if (searchGames.length > 0) {
                searchCriteria.games = { $in: searchGames };
            }

            // Получаем всех пользователей, соответствующих критериям поиска, исключая некоторые поля
            const models = await User.find(searchCriteria, {
                password: 0,
                refreshToken: 0,
                email: 0,
                activationLink: 0,
                isActivated: 0
            });

            // Возвращаем первые 5 результатов
            res.json(models.slice(0, 5));

        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка');
        }
    }
}

module.exports = new ModelController()
