
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");
const path = require("path");
const business = require("./business.js");

const createTool = {
    createView(projectPath, moduleName, data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + "/" + data.btn.subModulePath + "/" + data.btn.pageName;
        let listEjsPath = path.resolve(__dirname, _config.viewPath.listEjs);
        fsTool.createFile(viewPath);
        console.log("模块"+moduleName + "->View->list路径:",viewPath);
        console.log("ejs view 模块路径：",listEjsPath);
        let ejsStr = fsTool.readFile(listEjsPath);
        let ejsData = {
            data:{
                //CommonUtil注入
                commonUtil:{name:"commonUtil",filePath:business.getRelativeCompPath(projectPath,moduleName)},
                btn:data.btn,
                cols:business.groupBy(data.cols.cols,data.btn.colsCount),
                tableOptions:data.tableOptions,
                tableOptionsName:data.btn.pageName.split('.')[0] + "_table_options",
                hasDialog:data.hasDialog ? data.hasDialog : "0",
                form:data.form ? data.form : [],
                viewFolderPath: path.resolve(__dirname, _config.viewPath.viewFolderPath)
            }
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
    createModuleFolder:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        fsTool.createFolder(projectPath + "/src/pages/" + moduleName);
        fsTool.createFolder(projectPath + "/src/api/" + moduleName);
        fsTool.createFolder(projectPath + "/src/store/" + moduleName);
        fsTool.createFolder(projectPath + "/src/service/" + moduleName);
        return resEntity.setEneity({res:res});
    },
    createModuleFile:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        let data = req.body.data;
        createTool.createView(projectPath,moduleName,data);
        // createTool.createApi(projectPath,moduleName,{});
        // createTool.createStore(projectPath,moduleName,{});

        return resEntity.setEneity({res:res});
    },
    getProjectsPath:(req,res)=>{
        return resEntity.setEneity({res:res,data:fsTool.getProjectsPath()});
    }
}

module.exports = api;