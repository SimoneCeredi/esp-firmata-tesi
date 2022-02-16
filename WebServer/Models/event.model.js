const prefix = 'event';
let suffix = 0;

let events = {};

const createEvent = () => {
    suffix++;
    const id = `${prefix}${suffix}`;
    events[id] = 0;
    return id;
};

const completeEvent = (id) => {
    events[id] = 1;
};

const getEventResult = (id) => {
    return events[id];
};

module.exports = {
    createEvent,
    completeEvent,
    getEventResult,
};
