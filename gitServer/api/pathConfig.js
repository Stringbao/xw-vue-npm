

const fs = require('./fs/fsapi.js');

let ConfigClass = {
    viewPath:{
        view:"/src/pages",
        listEjs:"../../ejstemplates/view/list.ejs",
        saveEjs:"../ejstemplates/view/save.ejs",
        viewFolderPath:"../../ejstemplates/view/"
    },
    apiPath:{
        api:"/src/api",
        ejs:"../ejstemplates/api/api.ejs",
    },
    storePath:{
        store:"/src/store",
        ejs:"../ejstemplates/store/store.ejs",
    }
}

module.exports = ConfigClass;