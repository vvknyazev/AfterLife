const Router = require('express')
const router = new Router()
const multer = require("multer");
// const userSettingsController = require('../controllers/userSettingsController')
const fs = require("fs");
const UserGoogle = require("../models/userGoogle");
const UserDiscord = require('../models/userDiscord');
const User = require("../models/user");

const upload = multer({dest: 'uploads/'});

router.post('/upload-photo', upload.single('pic'), async (req, res) => {

    // console.log(req.file);

    fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
        if (err) throw err;
        // console.log('renamed complete');
    });
    // console.log("user:");
    // console.log(req.user);
    if (req.user?.googleId){
        console.log("IT IS GOOGLE USER CHANGE PHOTO")
        const userGoogle = await UserGoogle.findOne({googleId: req.user.googleId});
        userGoogle.photo = `${process.env.API_URL}/${req.file.originalname}`;
        await userGoogle.save();
        // return res.redirect(process.env.CLIENT_URL);
    } else if (req.user?.discordId){
        const userDiscord = await UserDiscord.findOne({discordId: req.user.discordId});
        userDiscord.photo = `${process.env.API_URL}/${req.file.originalname}`;
        await userDiscord.save();
        // return res.redirect(process.env.CLIENT_URL);
    } else if (req.user.email){
        const user = await User.findOne({email: req.user.email});
        user.photo = `${process.env.API_URL}/${req.file.originalname}`;
        await user.save();
        // return res.redirect(process.env.CLIENT_URL);
    }

})


module.exports = router
