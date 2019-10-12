var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {

    io.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('message-sent', (data) => {
        console.log("server side:");
        console.log(data);
       socket.broadcast.emit('message-sent', (data));
    });

    socket.on('typing', (data) => {
       socket.broadcast.emit('typing', data);
    });

    socket.on('stopped-typing', () => {
       socket.broadcast.emit('stopped-typing');
    });

    socket.on('user-joined', (data) => {
       socket.broadcast.emit('user-joined', data);
    });

    socket.on('user-left', (data) => {
       socket.broadcast.emit('user-left', data);
    });

});