var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var router = express.Router();

var uuid = require('uuid');
app.use(express.static('public'));

var clients = [];
io.sockets.on('connect', function(client) {
    clients.push(client);
    console.log('New User' + client.id);
    for (var i = clients.length - 1; i >= 0; i--) {
        if (typeof clients[i] !== "undefined") {
            clients[i].emit('users-online', clients.length);
        }
    }

    client.on('user-ready-blue', function() {
        clients[clients.indexOf(client)].ready = true;
        clients[clients.indexOf(client)].hasPair = false;
        clients[clients.indexOf(client)].color = 'blue';
    });
    
	client.on('user-ready-red', function() {
        clients[clients.indexOf(client)].ready = true;
        clients[clients.indexOf(client)].hasPair = false;
        clients[clients.indexOf(client)].color = 'red';
    });

    client.on('not-ready', function() {
        clients[clients.indexOf(client)].ready = false;
        clients[clients.indexOf(client)].hasPair = true;
    });

    client.on('disconnect', function() {
        clients.splice(clients.indexOf(client), 1);
        console.log('disconnect: ' + client.id);
        console.log('\n ----  Current Clients ---');
        for (var i = clients.length - 1; i >= 0; i--) {
            if (typeof clients[i] !== "undefined") {
                clients[i].emit('users-online', clients.length);
                console.log('Client ' + i + ' :' + clients[i].id);
            } else {
                console.log('Undef');
            }
        }
        console.log('---- End --- \n');
    });
});

//poll to match users
function pollFunc(fn, interval) {
    interval = interval || 1000;
    (function p() {
        fn();
        setTimeout(p, interval);
    })();
}

pollFunc(function() {
    var pairs = [];
    for (var i = clients.length - 1; i >= 0; i--) {
        var currUser;
		// check if user is ready and not in a conversation already
        if (clients[i].ready && !clients[i].hasPair) {
            currUser = clients[i];
            for (var c = clients.length - 1; c >= 0; c--) {
                if (clients[c].ready && !clients[c].hasPair && currUser !== clients[c] && currUser.color !== clients[c].color) {
                    pairs.push({
                        a: currUser,
                        b: clients[c]
                    });
                    currUser.hasPair = true;
                    clients[c].hasPair = true;
                }
            }
        }
    }
    //
    for (var b = pairs.length - 1; b >= 0; b--) {
        var id = uuid.v4();
        console.log('Pair Made Between: "' + pairs[b].a.id + '"" and "' + pairs[b].b.id + '"" to join room ' + id);
        pairs[b].a.emit('id', id);
        pairs[b].b.emit('id', id);
    }
}, 1000);


router.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/home.html');
});

router.get('/chat/:id', function(req, res) {
    res.sendfile(__dirname + '/views/chat.html');
});

app.set('port', process.env.PORT || 3000);
console.log('Listening on port 3000')
app.use('/', router);
server.listen(app.get('port'));
