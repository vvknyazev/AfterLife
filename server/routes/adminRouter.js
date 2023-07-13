const Router = require('express')
const adminController = require("../controllers/adminController");

const router = new Router()

router.get('/getFullModels', adminController.getFullAll)
router.get('/getFullOne/:id', adminController.getFullOne)

module.exports = router
