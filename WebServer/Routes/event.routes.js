const express = require('express');
const router = express.Router();
const controller = require('../Controllers/event.controller');

router.get('/get-event', controller.getEvent);

module.exports = router;
