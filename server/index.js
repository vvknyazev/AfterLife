const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ a: 5 });
});
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