const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const router = require('./routes/index');
const path = require("path");
const {Server} = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require("./middlware/credentials");
const corsOptions = require("./config/corsOptions");
const passport = require("passport");
const passportSetup = require("./service/passport-setup");

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    }
})
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log('user connected: ', socket.id);
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("users:", onlineUsers);

        const onlineUsersArray = Array.from(onlineUsers.keys());

        io.emit("getOnlineUsers", onlineUsersArray);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg, data.chatID);
            socket.to(sendUserSocket).emit("get-notification", data.msg, data.chatID, {isRead: 'false', date: new Date()});
            console.log("socket check")
        }
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
        for (const [userID, socketID] of onlineUsers) {
            if (socketID === socket.id) {
                onlineUsers.delete(userID);
                break;
            }
        }
        console.log("online users after disconnect: ", onlineUsers);
        const onlineUsersArray = Array.from(onlineUsers.keys());
        io.emit("removeOnlineUsers", onlineUsersArray);
    })
});

app.use(
    cookieSession({name: "session", keys: [process.env.COOKIE_KEY], maxAge: 24 * 60 * 60 * 100})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(credentials);
app.use(cors(corsOptions));


app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(process.env.CLIENT_URL, express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended: true}))


app.use(cookieParser());
app.use('/api', router)

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true
        });
        server.listen(PORT, (e) => {
            if (e) console.log(e);
            console.log('Server has been started on port: ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start();