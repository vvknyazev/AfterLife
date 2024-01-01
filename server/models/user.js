const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, default: 'USER'},
    refreshToken: String,
    activationLink: String,
    isActivated: {type: Boolean, default: false},
    photo: {type: String, default: '/nav/user-photo.jpeg'},
    name: String,
    bio: String,
    games: {type: [String]},
    userId: {type: String, unique: false, require: false},
    source: {type: String, enum : ['local','google', 'discord'], default: 'local'}
})

module.exports = model('User', User);

