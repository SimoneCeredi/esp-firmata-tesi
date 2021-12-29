/*
 * Update line 18 below to the ESP8266 board address
 *
 * Enable Serial debugging by uncommenting //#defin SERIAL_DEBUG in StandardFirmataWiFi
 * (save a copy of StandardFirmataWiFi first)
 *
 * On startup (you may have to reset the ESP board because it starts up really fast
 * view the Serial output to see the assigned IP address (if using DHCP)
 * Or if you want to give the board a static IP (not use DHCP) then uncomment the
 * following lines in wifiConfig.h and update to your chosen IP address:
 * #define STATIC_IP_ADDRESS  10,0,0,17
 * #define SUBNET_MASK        255,255,255,0 // REQUIRED for ESP8266_WIFI, ignored for others
 * #define GATEWAY_IP_ADDRESS 0,0,0,0       // REQUIRED for ESP8266_WIFI, ignored for others
 */
const boards = ['192.168.1.12', '192.168.1.13'];
const port = 3030;

let Firmata = require('firmata').Board;
let EtherPortClient = require('etherport-client').EtherPortClient;
let board1 = new Firmata(
    new EtherPortClient({
        host: boards[0],
        port: port,
    })
);
let board2 = new Firmata(
    new EtherPortClient({
        host: boards[1],
        port: port,
    })
);
let start = Date.now();

board1.on('ready', function () {
    let connectionTime = Date.now() - start;
    console.log('READY!, connection to ' + boards[0] + ' took: ' + connectionTime + 'ms');

    let state = 1;
    let lastVal = 0;

    this.pinMode(16, this.MODES.OUTPUT);

    setInterval(
        function () {
            // blinks the blue LED on a HUZZAH ESP8266 board
            // for other boards, wire an LED to pin 2 or change
            // the pin number below
            this.digitalWrite(16, (state ^= 1));
        }.bind(this),
        100
    );

    setInterval(
        function () {
            this.analogRead(0, (value) => console.log('Read A0 from ' + boards[0] + ', value -> ' + value));
        }.bind(this),
        100
    );
});

board2.on('ready', function () {
    let connectionTime = Date.now() - start;
    console.log('READY!, connection to ' + boards[1] + ' took: ' + connectionTime + 'ms');

    let state = 1;
    let lastVal = 0;

    this.pinMode(16, this.MODES.OUTPUT);

    setInterval(
        function () {
            // blinks the blue LED on a HUZZAH ESP8266 board
            // for other boards, wire an LED to pin 2 or change
            // the pin number below
            this.digitalWrite(16, (state ^= 1));
        }.bind(this),
        200
    );

    console.log(board2.analog);
});
