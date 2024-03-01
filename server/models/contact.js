const {Schema, model} = require('mongoose');

const Contact = new Schema({
        users: [{
            id: {type: String},
            username: {type: String},
            photo: {type: String},
        }],
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        notifications: [{
            chatID: String,
            isRead: String,
            date: String,
        }]
    },
);

module.exports = model('Contact', Contact);

