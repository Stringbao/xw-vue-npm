
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");

const createTool = {
    createView(projectPath,name,data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+name + "/list.vue";
        let listEjsPath = projectPath + "/" + _config.viewPath.listEjs;

        fsTool.createFile(viewPath);

        let ejsStr = fsTool.readFile(listEjsPath);
        let ejsData = {
            data:{name:"abccccccc",items:[{age:1},{age:2}]}
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(viewPath,_data);
    },
    createApi(projectPath,name,data){
        let apiPath = projectPath + "/" + _config.apiPath.api + "/"+ name + "/api.js";
        let apiEjsPath = projectPath + "/" + _config.apiPath.ejs;

        fsTool.createFile(apiPath);

        let ejsStr = fsTool.readFile(apiEjsPath);
        let ejsData = {
            data:{name:"nnnnnnn",items:[{age:444444},{age:555555}]}
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(apiPath,_data);
    },
    createStore(projectPath,name,data){
        let storePath = projectPath + "/" + _config.storePath.store + "/"+ name + "/store.js";
        let ejsPath = projectPath + "/" + _config.storePath.ejs;

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
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        createTool.createView(projectPath,moduleName,{});
        createTool.createApi(projectPath,moduleName,{});
        createTool.createStore(projectPath,moduleName,{});

        return resEntity.setEneity({res:res});
    },
    getProjectsPath:(req,res)=>{
        return resEntity.setEneity({res:res,data:fsTool.getProjectsPath()});
    }
}

module.exports = api;