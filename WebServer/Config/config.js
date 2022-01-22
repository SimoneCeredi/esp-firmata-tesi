const boardsSpecs = {
    esp8266: {
        name: 'esp8266',
        isDigital: (pin) => (pin >= 0 && pin <= 5) || (pin >= 12 && pin <= 16),
        isAnalog: (pin) => pin == 'A0',
        minAnalogValue: 0,
        maxAnalogValue: 255,
    },
};

module.exports = boardsSpecs;
