

const express = require('express');
const controller = require('./api.js');
const os = require('os');
const router = express.Router();

router.post("/createModuleFolder",controller.createModuleFolder);
router.post("/createModuleFile",controller.createModuleFile);
router.get("/getProjects",controller.getProjectsPath);
router.post("/savePage",controller.savePage);
router.post("/createGlobalFile",controller.createGlobalFile);
router.post("/resetConfig",controller.resetConfig);
console.log(os.type());

module.exports = router;