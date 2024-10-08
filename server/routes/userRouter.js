const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const passport = require("passport");
// const authMiddleware = require('../middlware/authMiddleware');


router.post('/register', userController.registration)
router.post('/login', userController.login)

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    failureMessage: true,
}));

router.get('/login/google/redirect', passport.authenticate("google", {
    // successRedirect: `${process.env.CLIENT_URL}/profile`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    failureMessage: true,
}), (req, res) => {
    if (req?.user) {
        if (req.user?.isNewUser) {
            res.redirect(`${process.env.CLIENT_URL}/complete`);
        } else {
            res.redirect(`${process.env.CLIENT_URL}/profile`);
        }
    }
});

router.get('/login/discord', passport.authenticate('discord', {
    scope: ['identify', 'email'],
    accessType: 'offline',
    failureMessage: true,
}));

router.get('/login/discord/redirect', passport.authenticate("discord", {
        // successRedirect: `${process.env.CLIENT_URL}/profile`,
        failureRedirect: `${process.env.CLIENT_URL}/login`,
        failureMessage: true,
    }), (req, res) => {
        if (req?.user) {
            if (req.user?.isNewUser) {
                res.redirect(`${process.env.CLIENT_URL}/complete`);
            } else {
                res.redirect(`${process.env.CLIENT_URL}/profile`);
            }
        }
    }
);

router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log("req.user: ", req.user);
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    } else {
        console.log("req.user: ", req?.user);
        res.sendStatus(204);
    }
});

router.get('/google/logout', function (req, res) {
    req.session = null;
    res.redirect(process.env.CLIENT_URL);
});

router.post('/logout', userController.logout)
// router.get('/activate/:link', userController.activate)
router.post('/activate', userController.activate);
router.post('/resend', userController.resend);
router.get('/refresh', userController.refresh)
router.get('/step', userController.step)
router.post('/check-username', userController.checkUsername)
router.post('/complete-registration', userController.completeRegistration)

router.get('/auth', userController.check)

module.exports = router
