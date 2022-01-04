const { Board, Led } = require('johnny-five');
const EtherPortClient = require('etherport-client').EtherPortClient;
const express = require('express');
const app = express();
const expPort = 3000;
const espPort = 3030;
let boards = new Map();

app.get('/', (req, res) => {
    console.log('Got a request');
    res.send('Hello World!');
});

app.get('/connect', (req, res) => {
    ip = req.query['ip'];
    board = new Board({
        port: new EtherPortClient({
            host: ip,
            port: espPort,
        }),
        repl: true,
    });
    board.on('ready', () => {
        boards.set(ip, board);
        console.log('Connected to ' + ip);
        res.sendStatus(200);
    });
});

app.get('/setpinvalue', (req, res) => {
    ip = req.query['ip'];
    pin = req.query['pin'];
    value = parseInt(req.query['value']);
    let board = boards.get(ip);
    if (!board) {
        res.send('Board not connected');
        res.sendStatus(400);
    } else if (pin < 0 || pin > 16) {
        res.send('Unavailable pin');
        res.sendStatus(400);
    } else if (value !== 0 && value !== 1) {
        res.send('Wrong value');
        res.sendStatus(400);
    } else {
        led = new Led({ pin: pin, board: board });
        board.repl.inject({ led });
        if (value == 0) {
            led.on();
        } else {
            led.off();
        }
        console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
        res.sendStatus(200);

        // board.on('ready', () => {
        //     board.pinMode(pin, board.MODES.OUTPUT);
        //     board.digitalWrite(pin, value, true);
        //     board.flushDigitalPorts();
        //     res.sendStatus(200);
        // });
    }
});

app.listen(expPort, () => {
    console.log(`Example app listening at http://localhost:${expPort}`);
});
