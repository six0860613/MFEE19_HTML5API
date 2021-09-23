const WebSocket = require('ws');

const createChatSever = server => {
    const wsServer = new WebSocket.Server({server});
    const map = new Map(); //用來存放對應名稱

    wsServer.on('connection', (ws, req) => {
        // console.log('Connects: ', wsServer.clients.size);
        map.set(ws, {name: ''}); //設定ws為key並把value給一個初始值''

        ws.on('message', (message, isBinary) =>{
            const mObj =  map.get(ws);
            let msg; //廣播用的訊息
            if(! mObj.name){ //要是傳入的ws沒有name(相當於初次訪問)
                mObj.name = message.toString(); 
                //未設定名字時，把發送來的首個訊息當作name(前端可設定必須先輸入name才進入聊天室，這樣首個訊息必為name)
                msg = `${mObj.name} 進入了聊天室，目前共 ${wsServer.clients.size} 人連線`;
            }else{
                msg = `${mObj.name}: ${message.toString()}`; //非初次就讓訊息送出
            }
            wsServer.clients.forEach(wsClient =>{
                if(wsClient.readyState === WebSocket.OPEN){
                    wsClient.send(msg);
                }
            });

            // console.log('isBinary: ', isBinary); //ws ver.8以後多了的參數
            // ws.send(message.toString()); //從sever發送給client訊息
        });

        ws.send('已連線!');
    });
};


module.exports = createChatSever;