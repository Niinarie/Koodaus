'use strict';
let express = require('express');
let mysql = require('mysql');
let path = require('path');
let app = require('express')();
let cors = require('cors');
var allowedOrigins = "*:*";
let http = require('http').Server(app);
let io = require('socket.io')(http);


var participants= 0;



var db = mysql.createConnection({
	host: 'localhost',
	user: 'chat',
	password: 'avaruusdata2017',
	database: 'chatdata'
})

db.connect(function(err){
	if (!err) console.log('connected to db')

	if (err) console.log(err)
})


io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
  
socket.on('add-message', (message, date) => {
console.log(message);
    db.query('INSERT INTO chat_messages SET ?', message, function(err, result){
	if(err) console.log('error inserting');	
});
    io.to(message.msg_channel).emit('message', {type:'new-message', msg_sender: message.msg_sender, msg_content: message.msg_content, msg_channel: message.msg_channel, msg_date: date});
  });

 socket.on('get-old-messages', (data) => {
    let messages = [];
     db.query('SELECT * FROM chat_messages WHERE msg_channel = ?', data)
            .on('result', function(result){
                // Push results onto the notes array
                messages.push(result);
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('old-messages',messages);
            })
  })

 socket.on('get-channels', () => {
    let channels = [];
     db.query('SELECT ch_id,ch_name, COUNT(chat_messages.msg_channel) AS count FROM chat_channels LEFT JOIN chat_messages ON chat_channels.ch_id=chat_messages.msg_channel GROUP BY chat_channels.ch_id')
            .on('result', function(result){
                // Push results onto the notes array
               channels.push(result);
		console.log(result);
            })
            .on('end', function(){
                // Only emit notes after query has been completed
               console.log(channels);
		socket.emit('new-channels',channels);
            })
  })

  socket.on('join_channel', (data) => {
    socket.join(data);
    var sids 	= io.sockets.adapter.rooms[data].sockets
    io.sockets.emit("users", {sids});
    console.log(socket.id, 'joined channel:', data);
  });

   socket.on("new_user", (data) => {

      participants = participants + 1;
	socket.join(1);

      io.sockets.emit("new_connection", {
        user: {
          name: data.name,
          id: socket.id
        },
        sender:"system",
        created_at: new Date().toISOString(),
        participants: participants
      });
    });

    socket.on('get users',(data)=> {
      let room = data;
    //  var socketsInRoom 	= io.sockets.adapter.rooms[data]; // sockets = default "/" namespace
      var sids 			= io.sockets.adapter.rooms[room].sockets
      socket.emit("users", {sids});
      console.log(sids);
});
    
});



http.listen(5000, () => {
  console.log('started on port 5000 on sessionId');
});
