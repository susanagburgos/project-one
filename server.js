// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {

		socket.on('dots', function(data) {
			console.log("black dots:" + data.x + "," + data.y);
			socket.broadcast.emit('eraseDot', data);
		}); 
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE

		socket.on('orientation', function(data){
			console.log('gamma: '+ data.gamma);
			socket.broadcast.emit('gamma', data);
		});
		socket.on('orientation', function(data){
			console.log('beta: '+ data.beta);
			socket.broadcast.emit('beta', data);
		});


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);