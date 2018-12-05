

const fs = require('./fs/fsapi.js');

let ConfigClass = {
    viewPath:{
        view:"/src/pages",
        listEjs:"/src/ejs/view/list.ejs",
        saveEjs:"/src/ejs/view/save.ejs",
    },
    apiPath:{
        api:"/src/api",
        ejs:"/src/ejs/api/api.ejs",
    },
    storePath:{
        store:"/src/store",
        ejs:"/src/ejs/store/store.ejs",
    }
}

module.exports = ConfigClass;