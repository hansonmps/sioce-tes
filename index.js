const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./routes/postinganRouter');
const hostname = 'localhost';
const port = 5005;

const app = express();

app.use('/router', router);
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`SERVER RUNNING AT http://${hostname}:${port}/`);
})