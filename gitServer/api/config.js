

const fs = require('./fs/fsapi.js');
const path = require('path');

let ConfigClass = function(){
    this.rootPath = fs.getClientPath();

    this.viewPath = this.rootPath + "/src/pages";

    this.apiPath = this.rootPath + "/src/api";

    this.storePath = this.rootPath + "/src/store";
}

module.exports = ConfigClass;