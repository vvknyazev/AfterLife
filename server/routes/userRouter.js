const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const passport = require("passport");
// const authMiddleware = require('../middlware/authMiddleware');


router.post('/register', userController.registration)
router.post('/login', userController.login)

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline'
}))

router.get('/login/google/redirect', passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/welcome`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
}));

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
});

router.get('/google/logout', function (req, res){
    req.session = null;
    res.redirect(process.env.CLIENT_URL);
    // req.session.destroy(function (err) {
    //     res.redirect(process.env.CLIENT_URL);
    // });
});

router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/auth', userController.check)

module.exports = router
