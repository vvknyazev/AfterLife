const fs = require("fs");

class UserSettingsController{
    async uploadPhoto(req, res){
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            if (err) throw err;
            console.log('renamed complete');
        });

        console.log("REQ user!! :")
        console.log(req.user);
        // const picture = new Picture({
        //     title: req.body.title,
        //     picture: req.file.originalname
        // })
        // await picture.save()
        // res.redirect('/')
    }
}
module.exports = new UserSettingsController()