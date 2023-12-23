const Router = require('express')
const messageController = require("../controllers/messageController");
const router = new Router()

router.post("/addmsg", messageController.addMessage);
router.post("/getmsg", messageController.getMessages);
// router.get("/getAllUsers", messageController.getAllUsers);
router.post("/get-contacts", messageController.getAllContacts);
router.post("/add-contact", messageController.addContact);
router.put("/update-contacts", messageController.updateContacts);
router.put("/add-notifications", messageController.addNotifications);
router.post("/get-notifications", messageController.getNotifications);

module.exports = router
