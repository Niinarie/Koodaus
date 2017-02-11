'use strict';
let mysql = require('mysql')
let app = require('express')();
var allowedOrigins = "*:*";

let http = require('http').Server(app);
let io = require('socket.io')(http, {origins: allowedOrigins});

var participants= 0;

var db = mysql.createConnection({
    host: 'http://',
    user: 'chat',
    database: 'chatdata',
    password: 'avaruusdata2017'
})
 
// Log any errors connected to the db
db.connect(function(err){
  if (!err) console.log('connected to db');
    if (err) console.log(err)
})

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
  
  socket.on('add-message', (message, date) => {
    db.query('INSERT INTO chat_messages (msg_channel,msg_sender,msg_content) VALUES (?)', message);
    io.to(message.msg_channel).emit('message', {type:'new-message', msg_sender: message.msg_sender, msg_content: message.msg_content, msg_channel: message.msg_channel, msg_date: date});
  });

  socket.on('get-messages', (data) => {
    let messages;
     db.query('SELECT * FROM chat_messages WHERE msg_channel = ?', data)
            .on('result', function(result){
                // Push results onto the notes array
                messages = result;
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('new-messages',messages);
            })
  });

  socket.on('get-channels', () => {
    let channels;
     db.query('SELECT ch_id,ch_name, COUNT(chat_messages.msg_channel) AS count FROM chat_channels LEFT JOIN chat_messages ON chat_channels.ch_id=chat_messages.msg_channel GROUP BY chat_channels.ch_id')
            .on('result', function(result){
                // Push results onto the notes array
               channels = result;
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('new-channels',channels);
            })
  });

  socket.on('join_channel', (data) => {
    socket.join(data);
    var sids 	= io.sockets.adapter.rooms[data].sockets
    io.sockets.emit("users", {sids});
    console.log(socket.id, 'joined channel:', data);
  });

   socket.on("new_user", (data) => {
      socket.join(data.channel);
      participants = participants + 1;

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

