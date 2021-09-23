const WebSocket = require('ws');

const createChatSever = server => {
    const wsServer = new WebSocket.Server({server});
    const map = new Map();

    wsServer.on('connection', (ws, req) => {
        console.log('Connects: ', wsServer.clients.size);
        console.log('ip: ', req.connection.remoteAddress);

        ws.on('message', (message, isBinary) =>{
            console.log('isBinary: ', isBinary); //ws ver.8以後多了的參數
            ws.send(message.toString()); //從sever發送給client訊息
        });

        ws.send('已連線!');
    });
};


module.exports = createChatSever;