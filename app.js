var io = require('socket.io').listen(8080);
var spaceSocket = null;

io.sockets.on('connection', function (socket) {

  socket.on('serve', function(data) {
    spaceSocket = socket;
  });

  socket.on('control', function (data) {
    if (spaceSocket) {
      spaceSocket.emit('control', data);
    }
    console.log(data);
  });
});
