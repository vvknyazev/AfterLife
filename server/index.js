const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const path = require("path");
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(express.urlencoded({extended: true}))
app.use('/api', router)
async function start() {
    try {
        await mongoose.connect('mongodb+srv://vvknyazev:0GGL4Xb2Vz1jo72X@afterlifedb.vqwvtcg.mongodb.net/?retryWrites=true&w=majority', {
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