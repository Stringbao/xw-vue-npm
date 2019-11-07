
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
        let _data = business.dealJsonData(fsTool.readFile(path.resolve(__dirname,"./data.json")));
        console.log(_data);
        // let data = req.body.data;

        // createTool.createView(projectPath,moduleName,data);
        // createTool.createApi(projectPath,moduleName,{});
        // createTool.createStore(projectPath,moduleName,{});

        return resEntity.setEneity({res:res});
    },
    getProjectsPath:(req,res)=>{
        return resEntity.setEneity({res:res,data:fsTool.getProjectsPath()});
    },
    savePage:(req,res) => { 
        let _data = req.body;
        let jsonDataPath = path.resolve(__dirname,"./data.json");
        let _dataJson = {
            "subName":_data.moduleName,
            "pagePath":_data.page.path,
            "pageName":_data.page.fileName,
            "pageOption":_data.page,
            "routerData":{
                "routerName":_data.moduleName + _data.page.fileName,
                "routerPath":_data.page.path
            },
            "serverData":{
                "store":{
                    "state":{
                        "dataSource":[],
                        "entity":[]
                    },
                    "action":[],
                    "mutation":[]
                },
                "API":{
                    "url":[]
                },
                "services":[]
            }
        }
        _data.page.searchOpts.search.cols && _data.page.searchOpts.search.cols.map(item => {
            // 有datasource就必须要有url否则不添加
            if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {

                _dataJson.serverData.store.state.dataSource.push(item.dataSource)
                _dataJson.serverData.store.action.push("get" + business.titleCase(item.dataSource))
                _dataJson.serverData.store.mutation.push("set" + business.titleCase(item.dataSource));
                _dataJson.serverData.API.url.push(item.url);
                _dataJson.serverData.services.push("get" + business.titleCase(item.dataSource))
            }
        })
        if(business.isHasDialog(_data.page.dialog.hasDialog)){
            _data.page.dialog.form.cols && _data.page.dialog.form.cols.map(item => {
                if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                    _dataJson.serverData.store.state.dataSource.push(item.dataSource)
                    _dataJson.serverData.store.action.push("get" + business.titleCase(item.dataSource))
                    _dataJson.serverData.store.mutation.push("set" + business.titleCase(item.dataSource));
                    _dataJson.serverData.API.url.push(item.url);
                    _dataJson.serverData.store.state.entity.push(item.key);
                    _dataJson.serverData.services.push("get" + business.titleCase(item.dataSource))
                }
            })
        }
        let jsonStr = fsTool.readFile(jsonDataPath);
        let jsonData = JSON.parse(jsonStr!= "" ? jsonStr : "[]");
        jsonData.push(_dataJson)
        fsTool.writeFile(jsonDataPath,JSON.stringify(jsonData,null,"\t"));
        return resEntity.setEneity({res:res});
    }
}

module.exports = api;