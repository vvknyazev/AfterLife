const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const userSettings = require('./userSettings')

router.use('/user', userRouter);
router.use('/user', userSettings);
module.exports = router
