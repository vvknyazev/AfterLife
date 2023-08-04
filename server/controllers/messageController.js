const Message = require("../models/message");
const User = require("../models/user");

class MessageController {
    async addMessage(req, res, next) {
        try {
            const { from, to, message } = req.body;
            const data = await Message.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });

            if (data) return res.json({ msg: "Message added successfully." });
            else return res.json({ msg: "Failed to add message to the database" });
        } catch (ex) {
            next(ex);
        }
    }
    async getMessages(req, res, next){
        try {
            console.log("REQUEST GET MESSAGES: ", req.body);
            const { from, to } = req.body;

            const messages = await Message.find({
                users: {
                    $all: [from, to],
                },
            }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });
            console.log("projectedMessages: ", projectedMessages);
            res.json(projectedMessages);
        } catch (ex) {
            next(ex);
        }
    }
    async getAllUsers(req, res){
        try {
            const users = await User.find({}, {password: 0, refreshToken: 0, email: 0, activationLink: 0, isActivated: 0});
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении пользователей.');
        }
    }

}
module.exports = new MessageController()