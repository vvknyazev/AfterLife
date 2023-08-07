const {Schema, model} = require('mongoose');

const Contact = new Schema({
        users: [{
            id: {type: String},
            name: {type: String},
            photo: {type: String},
        }],
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
);

module.exports = model('Contact', Contact);

