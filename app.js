var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 8080);

var spaces = {};

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/view.html');
});

app.get('/:spaceid', function (req, res) {
  res.sendfile(__dirname + '/control.html');
});

io.sockets.on('connection', function (socket) {

  socket.on('serve', function(data) {
    spaces[data.spaceId] = socket;
  });

  socket.on('control', function (data) {
    var spaceSocket = spaces[data.spaceId];
    if (spaceSocket) {
      spaceSocket.emit('control', data);
    }
  });

});
