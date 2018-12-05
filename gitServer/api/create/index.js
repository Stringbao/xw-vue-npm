

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.post("/createModule",controller.createModule);
router.get("/getProjects",controller.getProjectsPath);

module.exports = router;