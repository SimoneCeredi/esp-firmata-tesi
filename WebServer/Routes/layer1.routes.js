const express = require('express');
const router = express.Router();
const controller = require('../Controllers/layer1.controller');

router.get('/buttonevent', controller.buttonEvent);

module.exports = router;
