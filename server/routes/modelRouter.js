const Router = require('express')
const modelController = require("../controllers/modelController");
const router = new Router()

router.get('/all', modelController.getAll);
router.get('/getOne/:id', modelController.getOne);
router.get('/search', modelController.search);

module.exports = router
