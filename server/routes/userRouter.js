const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
// const authMiddleware = require('../middlware/authMiddleware');


router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/auth', userController.check)

module.exports = router
