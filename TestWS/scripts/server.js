const { Board, Led, Sensor } = require('johnny-five');
const EtherPortClient = require('etherport-client').EtherPortClient;
const express = require('express');
const app = express();
const expPort = 3000;
const espPort = 3030;
let boards = new Map();

process.on('uncaughtException', (err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    console.log('Got a request');
    res.send('Hello World!');
});

app.get('/connect', (req, res) => {
    const ip = req.query['ip'];
    const board = new Board({
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
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    const value = req.query['value'] == 'true' || req.query['value'] == '1' ? 1 : 0;
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
        led = new Led({ pin, board });
        board.repl.inject({ led });
        if (value == 0) {
            led.on();
        } else {
            led.off();
        }
        console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
        res.sendStatus(200);
    }
});

app.get('/analogread', (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    const board = boards.get(ip);
    if (!board) {
        res.send('Board not connected');
        res.sendStatus(400);
    } else if (pin != 'A0') {
        res.send('Unavailable pin');
        res.sendStatus(400);
    } else {
        const potentiometer = new Sensor({ pin, board, freq: 250, type: 'analog' });
        potentiometer.on('data', () => {
            const { value, raw } = potentiometer;
            console.log('Sensor: ');
            console.log('  value  : ', value);
            console.log('  raw    : ', raw);
            console.log('-----------------');
            if (value != null) {
                potentiometer.disable();
                res.send(value.toString());
            }
        });

        // res.send(potentiometer.value);
        // res.sendStatus(200);
    }
});

app.listen(expPort, () => {
    console.log(`Server listening at http://localhost:${expPort}`);
});
