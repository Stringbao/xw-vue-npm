

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.get("/deleteFolder",controller.deleteFolder);
router.post("/createFolder",controller.createFolder);
router.post("/createFile",controller.createFile);
router.post("/createModule",controller.createModule);

module.exports = router;