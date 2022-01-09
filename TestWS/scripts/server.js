const { Board, Led, Sensor } = require('johnny-five');
const EtherPortClient = require('etherport-client').EtherPortClient;
const express = require('express');
const cors = require('cors');
const app = express();
const expPort = 3000;
const espPort = 3030;
let boards = new Map();

app.use(cors());

process.on('uncaughtException', (err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    console.log('Got a request');
    res.status(200).send('Hello World!');
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
        res.status(200).send('Connected');
    });
});

app.get('/setpinvalue', (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    const value = req.query['value'] == 'true' || req.query['value'] == '1' ? 1 : 0;
    let board = boards.get(ip);
    if (!board) {
        res.status(400).send('Board not connected');
    } else if (pin < 0 || pin > 16) {
        res.status(400).send('Unavailable pin');
    } else if (value !== 0 && value !== 1) {
        res.status(400).send('Wrong value');
    } else {
        led = new Led({ pin, board });
        board.repl.inject({ led });
        if (value == 0) {
            led.on();
        } else {
            led.off();
        }
        console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
        res.status(200).send('Applied');
    }
});

app.get('/analogread', (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    const board = boards.get(ip);
    if (!board) {
        res.status(400).send('Board not connected');
    } else if (pin != 'A0') {
        res.status(400).send('Unavailable pin');
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
                res.status(200).send(value.toString());
            }
        });

        // res.send(potentiometer.value);
        // res.sendStatus(200);
    }
});

app.listen(expPort, () => {
    console.log(`Server listening at http://localhost:${expPort}`);
});
