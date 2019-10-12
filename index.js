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
    socket.on('created', (data) => {
        console.log(data);
       socket.broadcast.emit('created', (data));
    });

});