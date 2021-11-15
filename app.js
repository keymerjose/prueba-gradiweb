require('dotenv').config();
const opn       = require('opn');
const Server    = require('./models/server');

const server    = new Server();

server.listen();

opn('http://localhost:8080/');