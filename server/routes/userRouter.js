const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlware/authMiddleware');


router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/auth', authMiddleware ,userController.check)

module.exports = router
