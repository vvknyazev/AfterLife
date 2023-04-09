const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const router = require('./routes/index');
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require("./middlware/credentials");
const corsOptions = require("./config/corsOptions");
const passport = require("passport");

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(credentials);
app.use(cors(corsOptions));


app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use('/api', router)
async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true
        });
        app.listen(PORT, (e) => {
            if (e) console.log(e);
            console.log('Server has been started on port: ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start();