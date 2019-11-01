var express = require('express');
var app = express();

app.use('', express.static('.'));

/* Start the server */
console.log('Server started');
app.listen(3000);