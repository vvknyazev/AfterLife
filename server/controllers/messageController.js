const Message = require("../models/message");
const Contact = require("../models/contact");
const User = require("../models/user");

class MessageController {
    async addMessage(req, res, next) {
        try {
            const {from, to, message} = req.body;
            const data = await Message.create({
                message: {text: message},
                users: [from, to],
                sender: from,
            });
            // let contacts = await Contact.findOne({sender: from});
            // if (contacts) {
            //     console.log(contacts);
            //     let contactsArr = contacts.users;
            //     let elementToMove = contactsArr.find(user => user.id === to);
            //     let index = contactsArr.indexOf(elementToMove);
            //
            //          console.log("contactsArr: ", contactsArr);
            //          console.log("elementsToMove: ", elementToMove);
            //          console.log("index: ", index);
            //
            //     if (index !== -1) {
            //         contactsArr.splice(index, 1);
            //         contactsArr.unshift(elementToMove);
            //         console.log("contactsArr: ", contactsArr)
            //     }
            //
            //     // await contacts.save();
            // }
            if (data) return res.json({msg: "Message added successfully."});
            else return res.json({msg: "Failed to add message to the database"});
        } catch (ex) {
            next(ex);
        }
    }

    async getMessages(req, res, next) {
        try {
            // console.log("REQUEST GET MESSAGES: ", req.body);
            const {from, to} = req.body;

            const messages = await Message.find({
                users: {
                    $all: [from, to],
                },
            }).sort({updatedAt: 1});

           //
           // // warning, bad performance
           //  let contacts = await Contact.findOne({sender: from});
           //  if (contacts) {
           //      let contactsArr = contacts.users;
           //      let elementToMove = contactsArr.find(user => user.id === to);
           //      let index = contactsArr.indexOf(elementToMove);
           //
           //      console.log("contactsArr: ", contactsArr);
           //      console.log("elementsToMove: ", elementToMove);
           //      console.log("index: ", index);
           //
           //      // if (index !== -1) {
           //      //     contactsArr.splice(index, 1);
           //      //     contactsArr.unshift(elementToMove);
           //      // }
           //      //
           //      // await contacts.save();
           //  }
           //  //end warning

            const projectedMessages = messages.map((msg) => {
                const date = new Date(msg.createdAt);
                const formattedDate = date.toLocaleString();
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    time: formattedDate,
                };
            });
            // console.log("projectedMessages: ", projectedMessages);
            res.json(projectedMessages);
        } catch (ex) {
            next(ex);
        }
    }

    // async getAllUsers(req, res) {
    //     try {
    //         const users = await User.find({}, {
    //             password: 0,
    //             refreshToken: 0,
    //             email: 0,
    //             activationLink: 0,
    //             isActivated: 0
    //         });
    //         res.json(users);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Произошла ошибка при получении пользователей.');
    //     }
    // }
    async getAllContacts(req, res) {
        try {
            const {from} = req.body;

            // const allContacts = await Contact.find({});

            const contacts = await Contact.findOne({sender: from});
            if (contacts) {
                res.json(contacts.users);
            } else {
                res.status(204).send("Контактов нет");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Произошла ошибка при получении контактов.');
        }
    }

    async addContact(req, res) {
        try {
            const {from, to} = req.body;

            const contacts = await Contact.findOne({sender: from});

            let contact;

            const user = await User.findOne({_id: to}, {name: 1, photo: 1});

            if (contacts) {
                let hasId = false;
                for (let i = 0; i < contacts.users.length; i++) {
                    if (contacts.users[i].id === to) {
                        hasId = true;
                        break;
                    }
                }
                if (!hasId) {
                    await contacts.users.unshift({id: to, name: user.name, photo: user.photo});
                    await contacts.save();
                }
            } else {
                contact = await Contact.create({
                    users: [{id: to, name: user.name, photo: user.photo}],
                    sender: from
                });
            }

            if (contacts) return res.json({info: "contacts"})
            else if (contact) return res.json({info: "Contact added successfully."});
            else return res.json({info: "Failed to add contact to the database"});
        } catch (err) {
            console.error(err);

        }
    }

    async updateContacts(req, res) {
        try {
            const {from, updatedContacts} = req.body;

            const contactsSender = await Contact.findOneAndUpdate({sender: from}, {users: updatedContacts});
            // const contactsReceiver = await Contact.findOneAndUpdate({sender: to}, {users: updatedContacts});
            contactsSender.save();

            return res.json({info: "contacts updated"})
        } catch (err) {
            console.error(err);
        }
    }

    async addNotifications(req, res) {
        try {
            const {from, notifications, offline} = req.body;

            console.log("from ", from);
            console.log("notifications ", notifications);
            console.log("offline ", offline);


            if (!offline) {
                const contactsSender = await Contact.findOneAndUpdate({sender: from}, {notifications: notifications});
                contactsSender.save();
            } else {
                const contactsSender = await Contact.findOneAndUpdate(
                    { sender: from },
                    { $push: { notifications: notifications } },
                );
                contactsSender.save();
            }
            return res.json({info: "contacts updated"})
        } catch (err) {
            console.error(err);
        }
    }
    async getNotifications(req, res) {
        try {
            const {from} = req.body;

            console.log("req.body: ", req.body);

            const contacts = await Contact.findOne({sender: from});

            return res.json(contacts.notifications);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new MessageController()