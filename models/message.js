'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  author: String,
  key: String,
  post: String,
  time: String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;