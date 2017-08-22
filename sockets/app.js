var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile( __dirname + '/index.html');
});
app.get('/ns', function(req, res){
  res.sendFile( __dirname + '/indexns.html');
});
//new namespace 
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  console.log('someone connected');
  nsp.emit('hi', 'Hello everyone!');
});
var clients = 0;
//Whenever someone connects this gets executed
//default namespace /
io.on('connection', function(socket){
  console.log('A user connected');
   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});

  //Send a message after a timeout of 4seconds
  setTimeout(function(){
    //socket.send('Sent a message 4seconds after connection!');//message event
     //Sending an object when emmiting an event
	socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
	}, 4000);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
     clients--;
     io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
  });
  socket.on('clientEvent', function(data){
	console.log(data);
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});