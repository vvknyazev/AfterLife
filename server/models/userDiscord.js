const {Schema, model} = require('mongoose');

const UserDiscord = new Schema({
    discordId: {type: String, unique: true, require: true},
    username: {type: String, unique: true, require: true},
    email: {type: String, unique: true, require: true},
    role: {type: String, default: 'USER'},
    isActivated: {type: Boolean, default: true},
    photo: {type: String},
    refreshToken: {type: String},
    name: String,
    bio: String,
    games: {type: [String]},
})

module.exports = model('UserDiscord', UserDiscord);

