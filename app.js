var io = require('socket.io').listen(8080);
var spaceSocket = null;
var clients = {};

io.sockets.on('connection', function (socket) {

  socket.on('serve', function(data) {
    spaceSocket = socket;
  });

  socket.on('control', function (data) {
    if (spaceSocket) {
      spaceSocket.emit('control', data);
    }
    clients[data.id] = socket;
    console.log(data);
  });

  socket.on('score', function(data) {
    var client = clients[data.id];
    if (client) {
      client.emit('score', data);
    }
  });
});
