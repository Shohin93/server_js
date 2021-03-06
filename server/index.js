const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const router = require('./router');
// db setup
mongoose.connect('mongodb://localhost/auth');

const app = express();

app.use(passport.initialize());
// app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router(app);

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

// server setup
const port = process.env.PORT || 3006;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening on port ", port);
