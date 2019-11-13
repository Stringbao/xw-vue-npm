const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");
const path = require("path");
const business = require("./business.js");
const fsTool = require("../fs/fsapi");
const CommonUtil = require("./common");
module.exports = {
    createListView(projectPath, moduleName, data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + "/" + data.path + "/" + data.fileName + ".vue";
        let listEjsPath = path.resolve(__dirname, _config.viewPath.listEjs);
        fsTool.createFile(viewPath);
        console.log(viewPath);
        let ejsStr = fsTool.readFile(listEjsPath);
        let ejsData = {
            data:{
                
                btn:data.searchOpts.search.btn,
                cols:CommonUtil.groupBy(data.searchOpts.search.cols,data.searchOpts.search.colsCount),
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
                form:data.form ? data.form : [],
                viewFolderPath: path.resolve(__dirname, _config.viewPath.viewFolderPath),
            },
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(viewPath,_data);
        console.log("写入saveView成功");
    },
}