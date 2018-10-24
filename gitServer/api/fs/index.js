

var express = require('express');
var controller = require('./fsapi.js');

var router = express.Router();

router.get("/deleteFolder",controller.deleteFolder);
router.get("/createFolder",controller.mkdirsSync);

module.exports = router;