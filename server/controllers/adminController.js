const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const generateRefreshJwt = (id, username, email, role, isActivated) => {
    return jwt.sign(
        {id, username, email, role, isActivated},
        process.env.REFRESH_SECRET_KEY,
        {expiresIn: '30d'}
    )
}
class AdminController {

    async getFullAll(req, res) {
        try {
            const models = await User.find({role: 'MODEL'});
            console.log("models: ", models);
            res.json(models);
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }
    }

    async getFullOne(req, res) {
        const {id} = req.params; //id from route /:id

        const model = await User.findOne({_id: id});

        res.json(model);
        console.log(model);
    }

    async changeModel(req, res) {
        const {id, username, email, name, bio, photoURL, games} = req.body;

        if (req.file) {
            const fileExtension = req.file.mimetype.split('/')[1];
            const fileName = `${id}.${fileExtension}`;
            fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                if (err) throw err;
            });
        }
        let parsedGames;

        if (games){
            parsedGames = JSON.parse(games);
        }

        // console.log("req body: ", req.body);
        const model = await User.findOne({_id: id});
        model.username = username;
        model.email = email;
        model.name = name;
        model.bio = bio;
        if (req.file){
            const fileExtension = req.file.mimetype.split('/')[1];
            const fileName = `${id}.${fileExtension}`;
            model.photo = `media/${fileName}`;
            console.log("model.photo: ", model.photo)
        }
        model.games = parsedGames;
        await model.save();
        return res.sendStatus(204);
    }

    async createModel(req, res) {
        const {username, email, password, name, bio, games} = req.body;

        const generatedId = new ObjectId();

        let fileName;

        if (req.file) {
            const fileExtension = req.file.mimetype.split('/')[1];
            fileName = `${generatedId}.${fileExtension}`;

            fs.rename(req.file.path, 'uploads/media/' + fileName, function (err) {
                if (err) throw err;
            });
        }

        if (!username || !email || !password) {
            return res.status(400).json({'message': 'Username and password are required.'});
        }
        const candidateEmail = await User.findOne({email});
        const candidateUsername = await User.findOne({username});
        if (candidateEmail || candidateUsername) {
            return res.sendStatus(409);
        }
        const hashPassword = await bcrypt.hash(password, 5);

        let parsedGames;

        if (games){
            parsedGames = JSON.parse(games);
        }

        const user = await User.create({
            _id: generatedId,
            username,
            email,
            role: "MODEL",
            password: hashPassword,
            isActivated: true,
            name,
            bio,
            photo: req.file ? `media/${fileName}` : '/nav/user-photo.jpeg',
            games: parsedGames,
        });

        user.refreshToken = generateRefreshJwt(user.id, user.username, user.email, user.role, user.isActivated);

        await user.save();
        return res.sendStatus(204);
    }
}

module.exports = new AdminController()
