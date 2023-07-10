const Router = require('express')
const modelController = require("../controllers/modelController");
const router = new Router()

router.get('/all', modelController.getAll);

module.exports = router
