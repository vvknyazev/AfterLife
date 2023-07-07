const Router = require('express')
const router = new Router()
const multer = require("multer");
const userSettingsController = require('../controllers/userSettingsController')

const upload = multer({dest: 'uploads/'});

router.post('/upload-photo', upload.single('pic'), userSettingsController.uploadPhoto);
router.put('/save-info', userSettingsController.saveInfo);


module.exports = router
