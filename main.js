const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SIG = require('src/signal');
const CODE = require('src/code');
const GM = require('src/gamemanager').getInstance();

server.listen(3000, () => {
    console.log("server is listening on 3000");
});

io.on('connection', (socket) => {
    console.log(`client connected. client id: ${socket.id}`);
    let curUser = null;

    socket.on('disconnect', () => {
       console.log(`client disconnected from client id: ${socket.id}`);
    });

    socket.on(SIG.REQUEST_MATCH, (req, res) => {
        curUser = req.uid;
        GM.addPlayer(curUser, res);
    });

    socket.on(SIG.JOIN_ROOM, (req, res) => {

    });

    socket.on(SIG.START_GAME, (req, res) => {
        GM.startGame(res);
    });
});
