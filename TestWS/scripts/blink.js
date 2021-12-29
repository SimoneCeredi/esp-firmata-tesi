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
let Firmata = require("firmata").Board;
let EtherPortClient = require("etherport-client").EtherPortClient;
let board = new Firmata(new EtherPortClient({
    host: "192.168.1.12",
    port: 3030
}));
let start = Date.now();

board.on("ready", function () {
    let connectionTime = Date.now() - start;
    console.log("READY!, connection took: " + connectionTime + 'ms');
    console.log(
        board.firmware.name + "-" +
        board.firmware.version.major + "." +
        board.firmware.version.minor
    );

    let state = 1;
    let lastVal = 0;

    this.pinMode(16, this.MODES.OUTPUT);

    setInterval(function () {
        // blinks the blue LED on a HUZZAH ESP8266 board
        // for other boards, wire an LED to pin 2 or change
        // the pin number below
        this.digitalWrite(16, (state ^= 1));
    }.bind(this), 500);


});