
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");
const path = require("path");
const business = require("./business.js");
const createTool = {
    createListView(projectPath, moduleName, data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + "/" + data.path + "/" + data.fileName + ".vue";
        let listEjsPath = path.resolve(__dirname, _config.viewPath.listEjs);
        fsTool.createFile(viewPath);
        console.log(viewPath);
        let ejsStr = fsTool.readFile(listEjsPath);
        let ejsData = {
            data:{
                //CommonUtil注入
                commonUtil:{name:"commonUtil",filePath:business.getRelativeCompPath(projectPath,moduleName)},
                btn:data.searchOpts.search.btn,
                cols:business.groupBy(data.searchOpts.search.cols,data.searchOpts.search.colsCount),
                colsCount:data.searchOpts.search.colsCount,
                tableOptions:data.searchOpts.tableOptions,
                tableOptionsName:data.fileName.split('.')[0] + "_table_options",
                hasDialog:data.dialog.hasDialog ? data.dialog.hasDialog : "0",
                form:data.dialog.form ? data.dialog.form : [],
                viewFolderPath: path.resolve(__dirname, _config.viewPath.viewFolderPath),
                tableTitle:data.searchOpts.tableTitle,
                pageName : business.getCompName(data.path,data.fileName.split('.')[0])
            },
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
        fsTool.writeFile(viewPath,_data);
        console.log("写入listView成功");
    },
    createSaveView(projectPath, moduleName, data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + "/" + data.path + "/" + data.fileName + ".vue";
        let saveEjsPath = path.resolve(__dirname, _config.viewPath.saveEjs);
        fsTool.createFile(viewPath);
        let ejsStr = fsTool.readFile(saveEjsPath);
        let ejsData = {
            data:{
                //CommonUtil注入
                commonUtil:{name:"commonUtil",filePath:business.getRelativeCompPath(projectPath,moduleName)},
                form:data.form ? data.form : [],
                viewFolderPath: path.resolve(__dirname, _config.viewPath.viewFolderPath),
            },
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
        fsTool.writeFile(viewPath,_data);
        console.log("写入saveView成功");
    },
    createRouter(projectPath, data){
        let routerPath = projectPath + "/" + _config.routerPath.router;
        let routerEjsPath = path.resolve(__dirname, _config.routerPath.ejs);
        fsTool.createFile(routerPath);
        let ejsStr = fsTool.readFile(routerEjsPath);
        let _data = ejsTool.renderEjsTemplate(ejsStr,{
            data:data
        });
        fsTool.writeFile(routerPath,_data);
        console.log("写入router成功");
    },
    createApi(projectPath,moduleName,data){
        let apiPath = projectPath + "/" + _config.apiPath.api + "/" + moduleName+".js";
        let apiEjsPath =  path.resolve(__dirname, _config.apiPath.ejs);
        fsTool.createFile(apiPath);
        let ejsStr = fsTool.readFile(apiEjsPath);
        let ejsData = {
            data:data
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
        fsTool.writeFile(apiPath,_data);
        console.log("写入api成功");
    },
    /* 创建store index */
    createStore(projectPath,data){
        let storePath = projectPath + "/" + _config.storePath.store + "/index.js";
        let ejsPath = path.resolve(__dirname,_config.storePath.ejs + "index.ejs");
        fsTool.createFile(storePath);
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:data
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData)
        fsTool.writeFile(storePath,_data);
        console.log("写入store index成功");
    },
    // 创建store module
    createStoreModule(projectPath,moduleName,data){
        let storePath = projectPath + "/" + _config.storePath.store + "modules/"+moduleName+".js";
        let ejsPath = path.resolve(__dirname,_config.storePath.ejs + "module.ejs");
        fsTool.createFile(storePath);
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:data,
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData)
        fsTool.writeFile(storePath,_data);
        console.log("写入storeModule成功")
    },
    createService(projectPath,moduleName,data){
        let servicePath = projectPath + "/" + _config.servicePath.service + "/"+moduleName+".js";
        let ejsPath = path.resolve(__dirname,_config.servicePath.ejs);
        fsTool.createFile(servicePath);
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:data,
            moduleName
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(servicePath,_data);
        console.log("写入service成功")
    }
}

const api = {
    createModuleFolder:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        let isExist = fsTool.exists(projectPath + "/src/pages/" + moduleName);
        if(!isExist){
            fsTool.createFolder(projectPath + "/src/pages/" + moduleName);
            // fsTool.createFolder(projectPath + "/src/api/" + moduleName);
            // fsTool.createFolder(projectPath + "/src/store/" + moduleName);
            // fsTool.createFolder(projectPath + "/src/service/" + moduleName);
            return resEntity.setEneity({res:res});
        }else{
            return resEntity.setEneity({
                res,
                status:1,
                msg:"该模块已经存在",
                data:null,
            });
        }
        
    },
    createGlobalFile(req,res){
        let projectPath = req.body.projectPath;
        let globalPath = path.resolve(__dirname,"./global.json")
        let str = fsTool.readFile(globalPath);
        let _data = JSON.parse((str && str!="") ? str : "{router:[],moduleList:[]}");
        console.log(_data);
        // 创建router
        createTool.createRouter(projectPath,_data.router);
        // 创建store的index
        createTool.createStore(projectPath,_data.moduleList);
        fsTool.writeFile(globalPath,"");

        return resEntity.setEneity({res:res});


    },
    createModuleFile:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        let _data = business.dealJsonData(fsTool.readFile(path.resolve(__dirname,"./data.json")));
        // let data = req.body.data;
        _data.pageOption.forEach(item => {
            if(item.type == "1"){
                createTool.createListView(projectPath,moduleName,item);
            }else{
                createTool.createSaveView(projectPath,moduleName,item);
            }
        })
        createTool.createStoreModule(projectPath,moduleName,_data.storeData);
        createTool.createService(projectPath,moduleName,_data.APIData);
        createTool.createApi(projectPath,moduleName,_data.APIData);
        let jsonDataPath = path.resolve(__dirname,"./global.json");
        let dataPath = path.resolve(__dirname,"./data.json");

        let jsonStr = fsTool.readFile(jsonDataPath);
        // 
        let jsonData = JSON.parse(jsonStr!= "" ? jsonStr : "{}");
        
        let _json = {
            router:jsonData.router ? jsonData.router : [],
            moduleList:jsonData.moduleList ? jsonData.moduleList : [],
        }
        _json.router = business.concatArr(_json.router,_data.routerData);
        _json.moduleList = business.concatArr(_json.moduleList,_data.storeModuleNameList);
        fsTool.writeFile(jsonDataPath,JSON.stringify(_json,null,"\t"));       
        fsTool.writeFile(dataPath,"");
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
            "pageName":_data.page.fileName + ".vue",
            "pageOption":_data.page,
            "pageType":_data.page.type,
            "compName":business.getCompName(_data.page.path,_data.page.fileName),
            "routerData":{
                "routerName":_data.moduleName + business.titleCase(_data.page.fileName),
                "routerPath":_data.moduleName + "/" + _data.page.path + "/" + _data.page.fileName,
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
                "API":[],
            }
        }
        if(_dataJson.pageType == "1"){
            _data.page.searchOpts.search.cols && _data.page.searchOpts.search.cols.map(item => {
                // 有datasource就必须要有url否则不添加
                if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                    _dataJson.serverData.store.state.dataSource.push(item.dataSource)
                    _dataJson.serverData.store.action.push("get" + business.titleCase(item.dataSource))
                    _dataJson.serverData.store.mutation.push("set" + business.titleCase(item.dataSource));
                    _dataJson.serverData.API.push({
                        url:item.url,
                        compName: business.getCompName(item.url.split(".")[0]),
                        servicesName : "get" + business.titleCase(item.dataSource)
                    });
                }
            })
            if(business.isHasDialog(_data.page.dialog.hasDialog)){
                _data.page.dialog.form.cols && _data.page.dialog.form.cols.map(item => {
                    if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                        _dataJson.serverData.store.state.dataSource.push(item.dataSource)
                        _dataJson.serverData.store.action.push("get" + business.titleCase(item.dataSource))
                        _dataJson.serverData.store.mutation.push("set" + business.titleCase(item.dataSource));
                        _dataJson.serverData.API.push({
                            url:item.url,
                            compName:business.getCompName(item.url.split(".")[0]),
                            servicesName : "get" + business.titleCase(item.dataSource)
                        });
                        _dataJson.serverData.store.state.entity.push(item.key);
                    }
                })
            }
        }
        if(_dataJson.pageType == "2"){
            _data.page.form.cols && _data.page.form.cols.map(item => {
                if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                    _dataJson.serverData.store.state.dataSource.push(item.dataSource)
                    _dataJson.serverData.store.action.push("get" + business.titleCase(item.dataSource))
                    _dataJson.serverData.store.mutation.push("set" + business.titleCase(item.dataSource));
                    _dataJson.serverData.API.push({
                        url:item.url,
                        compName:business.getCompName(item.url.split(".")[0]),
                        servicesName : "get" + business.titleCase(item.dataSource)
                    });
                    _dataJson.serverData.store.state.entity.push(item.key);
                }
            })
            _dataJson.serverData.API.push({
                url:_data.page.savePageInterface.save,
                compName:business.getCompName(_data.page.savePageInterface.save.split(".")[0]),
                servicesName:"doCreate",
            })
            _dataJson.serverData.API.push({
                url:_data.page.savePageInterface.detail,
                compName:business.getCompName(_data.page.savePageInterface.detail.split(".")[0]),
                servicesName:"getInfo",
            })
            _dataJson.serverData.API.push({
                url:_data.page.savePageInterface.update,
                compName:business.getCompName(_data.page.savePageInterface.update.split(".")[0]),
                servicesName:"doUpdate",
            })
        }
        let jsonStr = fsTool.readFile(jsonDataPath);
        let jsonData = JSON.parse(jsonStr!= "" ? jsonStr : "[]");
        let isRepeat = false;
        jsonData.forEach(item => {
                console.log(item["compName"]);
                console.log(_dataJson["compName"]);
            if(item["compName"] == _dataJson["compName"]){
                isRepeat = true;
            }
        })
        if(isRepeat){
            return resEntity.setEneity({
                res,
                status:1,
                msg:"该页面已经存在",
                data:null,
            });
        }
        jsonData.push(_dataJson)
        fsTool.writeFile(jsonDataPath,JSON.stringify(jsonData,null,"\t"));
        return resEntity.setEneity({res:res});
    }
}

module.exports = api;