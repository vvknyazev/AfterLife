const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const userSettings = require('./userSettings')
const adminRouter = require('./adminRouter')
const modelRouter = require('./modelRouter')
const messageRouter = require('./messageRouter')
const checkAdmin = require('../middlware/checkAdmin');

router.use('/user', userRouter);
router.use('/user', userSettings);
router.use('/admin', checkAdmin, adminRouter);
router.use('/model', modelRouter);
router.use('/message', messageRouter);


module.exports = router
