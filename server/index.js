const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();
router(app);

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

// server setup
const port = process.env.PORT || 3006;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening on port ", port);
