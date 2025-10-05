const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./models/backEnd/config/connectDB');

const port = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
    res.send('test');
});

app.listen(port, () => {
    console.log(`Server Berjalan di http://localhost:${port}`)
});