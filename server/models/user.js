const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, default: 'USER'},
    refreshToken: String,
    activationLink: String,
    isActivated: {type: Boolean, default: false},
    photo: {type: String, default: 'nav/user-photo.png'},
    name: String,
    bio: String,
})

module.exports = model('User', User);

