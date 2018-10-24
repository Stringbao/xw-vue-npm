

var express = require('express');
var controller = require('./ejsapi.js');

var router = express.Router();

router.post("/renderEjs",controller.renderEjsTemplate);

module.exports = router;