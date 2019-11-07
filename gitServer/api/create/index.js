

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.post("/createModuleFolder",controller.createModuleFolder);
router.post("/createModuleFile",controller.createModuleFile);
router.get("/getProjects",controller.getProjectsPath);
router.post("/savePage",controller.savePage);

module.exports = router;