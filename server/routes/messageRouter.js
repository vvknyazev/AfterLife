const Router = require('express')
const messageController = require("../controllers/messageController");
const router = new Router()

router.post("/addmsg", messageController.addMessage);
router.post("/getmsg", messageController.getMessages);
router.get("/getAllUsers", messageController.getAllUsers);

module.exports = router
