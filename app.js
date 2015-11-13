'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/messageapp')

var app = express();
app.set('view engine','jade');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/',require('./routes/messages'))
app.use('/messages',require('./routes/messages'))

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});