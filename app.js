var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

var spaceSocket = null;
var clients = {};

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/view.html');
});

app.get('/control', function (req, res) {
  res.sendfile(__dirname + '/control.html');
});

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
