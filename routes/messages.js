'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../models/message')

router.get('/',function(req,res){
  Message.find({}, function(err,messages){
    if(err) return res.status(400).send('error getting messages',err);
    res.render('messages', {title: "Cork Board Forum", messages: messages});
  });
})

router.post('/', function(req,res){
  var message = new Message(req.body);
  message.save(function(err,savedMessage){
    if(err) return res.status(400).send('error posting message',err);
    res.send(message);
  });
})

router.post('/update', function(req,res){
  Message.update({_id: req.body._id}, req.body,function(err,num, rawRes){
    if(err) return res.status(400).send('error updating message',err);
    res.send(num,rawRes);
  });
})

router.post('/delete', function(req,res){
  Message.remove({_id: req.body._id}, function(err){
    if(err) return res.status(400).send('error deleting message',err);
    res.send('message deleted');
  });
})

module.exports = router;

