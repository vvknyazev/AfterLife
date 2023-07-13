const Router = require('express')
const User = require("../models/user");
const router = new Router()

router.get('/getFullModels', async (req, res) => {
    try {
        const models = await User.find({ role: 'MODEL' });
        res.json(models);
    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка при получении пользователей.');
    }
})

module.exports = router
