const boardsSpecs = {
    esp8266: {
        name: 'esp8266',
        minDigitalPin: 0,
        maxDigitalPin: 16,
        minAnalogPin: 0,
        maxAnalogPin: 0,
        isPwm: (pin) => pin == 9 || pin == 10 || pin == 13 || pin == 16,
    },
};

module.exports = boardsSpecs;
