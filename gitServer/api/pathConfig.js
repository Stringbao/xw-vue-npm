

const fs = require('./fs/fsapi.js');

let ConfigClass = {
    viewPath:{
        view:"/src/pages",
        listEjs:"../../../ejstemplates/view/list.ejs",
        saveEjs:"../../../ejstemplates/view/save.ejs",
        viewFolderPath:"../../../ejstemplates/view/"
    },
    routerPath:{
        router:"/src/router/index.js",
        ejs:"../../../ejstemplates/router/router.ejs"
    },
    apiPath:{
        api:"/src/api",
        ejs:"../../../ejstemplates/api/api.ejs",
    },
    servicePath:{
        service:"/src/service",
        ejs:"../../../ejstemplates/service/service.ejs",
    },
    storePath:{
        store:"/src/store/",
        ejs:"../../../ejstemplates/store/",

    }
}

module.exports = ConfigClass;