let WebSocket = require('ws');
let pako = require('pako');

const logger = require("./tools/mylogger");

const Currency = process.argv[2];
const Id = 'kline ' + new Date();

if(!Currency){
	console.log("need currency, like btcusdt; ethusdt");
	return;
}

const CMD = "market." + Currency + ".trade.detail"

let queryData = {
  "sub": "market.btcusdt.trade.detail",
  "id": "id1"
}

function klineHandler(currency){
	const cur = currency;
	const self = this;

	var curM = 0;
	var amount = 0.0;


	this.append = (data) => {
		data.data.forEach(el => {
			console.log(el);
		});
	}
}

var kHandler = new klineHandler(Currency);

const socket = new WebSocket('wss://api.huobi.pro/ws');

socket.binaryType = 'arraybuffer';

socket.onopen = function (event) {
    logger.debug('WebSocket connect at time: ' + new Date());
    socket.send(JSON.stringify(queryData));
};

socket.onmessage = function (event) {
    let raw_data = event.data;
    let json = pako.inflate(new Uint8Array(raw_data), {to: 'string'});
    let data = JSON.parse(json);

    if (data['ping']) {
        socket.send(JSON.stringify({'pong': data['ping']}));
		return;
    }

	if(data.id == Id && data.status != "ok"){
		logger.error(data);
		return process.exit();
	}

	switch(data.ch){
	case CMD:
			kHandler.append(data.tick);
			break;
	default:
			break;
	}
};

socket.onclose = function(event) {
    logger.debug('WebSocket close at time: ' + new Date());
};
