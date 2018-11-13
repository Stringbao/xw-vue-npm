
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");

const createTool = {
    createView(name,data){
        let viewPath = _config.viewPath.view + "/"+name + "/list.vue";
        let listEjsPath = _config.viewPath.listEjs;

        fsTool.createFile(viewPath);

        let ejsStr = fsTool.readFile(listEjsPath);
        let ejsData = {
            data:{name:"abccccccc",items:[{age:1},{age:2}]}
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(viewPath,_data);
    },
    createApi(name,data){
        let apiPath = _config.apiPath.api + "/"+ name + "/api.js";
        let apiEjsPath = _config.apiPath.ejs;

        fsTool.createFile(apiPath);

        let ejsStr = fsTool.readFile(apiEjsPath);
        let ejsData = {
            data:{name:"nnnnnnn",items:[{age:444444},{age:555555}]}
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(apiPath,_data);
    },
    createStore(name,data){
        let storePath = _config.storePath.store + "/"+ name + "/store.js";
        let ejsPath = _config.storePath.ejs;

        fsTool.createFile(storePath);

        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:{name:",,,,,lasljdaklsd",items:[{age:77777},{age:'dasdasdsad'}]}
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(storePath,_data);
    }
}

const api = {
    createModule:(req,res)=>{
        const moduleName = req.body.moduleName;
        createTool.createView(moduleName,{});
        createTool.createApi(moduleName,{});
        createTool.createStore(moduleName,{});

        return resEntity.setEneity({res:res});
    }
}

module.exports = api;