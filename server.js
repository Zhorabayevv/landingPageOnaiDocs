const express = require('express');

const app = express();
const port = 8000; 

app.use(express.static(__dirname + '/build'));

app.listen(port);

console.log('server on: ' + port);