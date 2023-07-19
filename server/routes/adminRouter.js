const Router = require('express')
const adminController = require("../controllers/adminController");
const multer = require("multer");

const upload = multer({dest: 'uploads/'});

const router = new Router()

router.get('/getFullModels', adminController.getFullAll);
router.get('/getFullOne/:id', adminController.getFullOne);
router.put('/changeModel/:id', upload.single('pic'), adminController.changeModel)
router.post('/createModel', upload.single('pic'), adminController.createModel)

module.exports = router
