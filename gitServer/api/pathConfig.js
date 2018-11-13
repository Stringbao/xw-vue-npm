

const fs = require('./fs/fsapi.js');
const rootPath = fs.getClientPath();

let ConfigClass = {
    rootPath:fs.getClientPath(),
    viewPath:{
        view:rootPath + "/src/pages",
        listEjs:rootPath + "/src/ejs/view/list.ejs",
        saveEjs:rootPath + "/src/ejs/view/save.ejs",
    },
    apiPath:{
        api:rootPath + "/src/api",
        ejs:rootPath + "/src/ejs/api/api.ejs",
    },
    storePath:{
        store:rootPath + "/src/store",
        ejs:rootPath + "/src/ejs/store/store.ejs",
    }
}

module.exports = ConfigClass;