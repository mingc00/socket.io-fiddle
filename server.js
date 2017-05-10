
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connect', onConnect);

var AUTH_DELAY = 500;

function mockAuth(callback) {
	setTimeout(function() {
		callback(true);
	}, AUTH_DELAY);
}

io.use(function(socket, next) {
	mockAuth(function(success) {
		next();
	});
});

server.listen(port, () => console.log('server listening on port ' + port));

function onConnect(socket){
	console.log('connect ' + socket.id);

	socket.on('test', (data) => console.log(data));
	socket.on('disconnect', () => console.log('disconnect ' + socket.id));
}
