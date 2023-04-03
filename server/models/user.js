const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, default: 'USER'},
})

module.exports = model('User', User);

