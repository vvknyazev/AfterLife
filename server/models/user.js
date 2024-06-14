const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, default: 'USER'},
    refreshToken: String,
    activationCode: String,
    activationCodeGeneratedAt: { type: Date },
    isActivated: {type: Boolean, default: false},
    photo: {type: String, default: 'media/default.jpeg'},
    name: String,
    bio: String,
    games: {type: [String]}
})

module.exports = model('User', User);

