const {Schema, model} = require('mongoose');

const UserGoogle = new Schema({
    googleId: {type: String, unique: true, require: true},
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    role: {type: String, default: 'USER'},
    isActivated: {type: Boolean, default: true},
    photo: {type: String},
})

module.exports = model('UserGoogle', UserGoogle);

