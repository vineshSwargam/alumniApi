const express = require("express");
const session = require("express-session");
var bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
const { check, validationResult } = require('express-validator/check');
//const  expressValidator = require('express-validator');
const path = require("path");
const config = require('./config/database');
// const passport = require('passport');
const bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://loclahost/yourdatabaseName')
mongoose.connect('mongodb://localhost/alumni');
let db = mongoose.connection;


//Check Connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Check for DB errors
db.on('error', function (err) {
  console.log(err);
});

//Init App
const app = express();

//Middleware for body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//Session Middleware
app.use(session({ secret: 'ModijiInventedTheInternet' }));

//Set Public Folder
app.use(express.static('./public'));


const authRoutes = ['/auth/login', '/auth/signup'];
app.all('*', (req, res, next) => {
  if (!req.session.username && authRoutes.indexOf(req.path) === -1 ) {
    res.json({ url: req.path });
    return;
  }
  next();
})
app.get('/', (req, res) => res.send('HOME'));

let authRouter = require('./routes/authentication');
app.use('/auth', authRouter);

let eventRouter = require('./routes/events');
app.use('/events', eventRouter);

app.listen(4000, () => {
  console.log("Server started successfully");
});