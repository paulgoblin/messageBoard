'use strict'

function init(){
  $('.board').on('click','i.edit',summonEdit)
  $('.board').on('click','i.delete',deleteMessage)
  $('.board').on('click','.putMessage',putMessage)
  $('.postMessage').click(postMessage)
}

function deleteMessage(e){
  let _id = $(e.target).closest('.message').find('._id').text();
  let message = {};
  message._id = _id;

  $.post('/messages/delete', message)
  .done(function(data){
    $(e.target).closest('.message').remove();
  })
  .fail(function(err){
    console.error(err);
    swal({
      title: "Error Deleting!",
      text: "check console logs",
      type: "error",
      confirmButtonText: "OK"
    });
  });

}

function putMessage(e){
  let $form = $(e.target).closest('.editForm');
  let message = makeMessage($form);
  message._id = $form.find('._id').text();
  console.log(message)

  //put to DB
  $.post('/messages/update', message)
  .done(function(data){
    console.log(data)
    let $postElems = makePostElems(message);
    let $messagePost = $form.closest('.message');
    $messagePost.after($postElems);
    $messagePost.remove();
  })
  .fail(function(err){
    console.error(err);
    swal({
      title: "Error Posting!",
      text: "check console logs",
      type: "error",
      confirmButtonText: "OK"
    });
  });

}

function populateForm($form){
  let name = $form.siblings('.name').text();
  let post = $form.siblings('.post').text();

  $form.find('.author').val(name);
  $form.find('textarea').val(post);
}

function summonEdit(e){
  let $form = $(e.target).closest('.message').find('.editForm')
  populateForm($form);
  $form.fadeToggle();
}

function postMessage(e){
  let $form = $('#postForm');
  let message = makeMessage($form);

  //post to db
  $.post('/messages', message)
  .done(function(data){
    console.log(data)
    let $postElems = makePostElems(data);
    $('.board').append($postElems);
  })
  .fail(function(err){
    console.error(err);
    swal({
      title: "Error Posting!",
      text: "check console logs",
      type: "error",
      confirmButtonText: "Cool"
    });
  });

}

function makePostElems(data) {
  let author = data.author;
  let post = data.post;
  let date = data.time;

  let $postElem = $('#sample').clone().removeAttr('id');
  $postElem.find('.post').text(post)
  $postElem.find('.name').text(author)
  $postElem.find('.date').text(date)

  return $postElem;

}

function makeMessage($form){
  let message = {};
  message.author = $form.find('.author').val();
  let rawkey = $form.find('.key').val();
  message.key = md5(rawkey);
  message.post = $form.find('textarea').val();
  message.time = moment().format('dddd, MMM Do YYYY, h:mm a');
  console.log("moment: ",message.time)
  clearForm($form);
  return message;
}

function clearForm($form){
  $form.find('.author').val('');
  $form.find('.key').val('');
  $form.find('textarea').val('');
}

$(document).ready(init);





