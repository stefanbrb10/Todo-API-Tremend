require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

mongoose.connect(process.env.CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Connected to the database (MONOGODB)"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/auth', authRoutes); // has register and login
app.use('/todos', todoRoutes); // all the Todo HTTP methods


app.listen(process.env.PORT, () => console.log('Server is running')); 
