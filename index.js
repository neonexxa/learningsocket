var app = require('express')(); // Express initializes app to be a function handler that you can supply to an HTTP server
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){ //home "/" route handler
//  res.send('<h1>Hello world</h1>');  this is where our html will come can write direct here or only the refs also can
	res.sendFile(__dirname + '/index.html'); //to load file use "sendFile" instead of "send"
});

io.on('connection', function(socket){//if user connected
  console.log('a user connected');
  //socket.on('disconnect', function(){//if user disconnected
  //  console.log('user disconnected');
  //});
  socket.on('chat message', function(msg){// if user send message 
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){ //make the http server listen to port 3000
  console.log('listening on *:3000');
});