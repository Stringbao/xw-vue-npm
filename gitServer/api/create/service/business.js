const commonUtil = require("./common.js");
const fsTool = require("../../fs/fsapi");
const path = require("path");

module.exports = {
    isHasDialogTag : "1",//1包含 ，2不包含
    /**
     * @description 是否包含dialog判断
     * @param {String} tag 
     */
    isHasDialog(tag){
        return tag == this.isHasDialogTag;
    },
    /**
     * @description 处理datajson里面的数据 进行组装
     * @param {String} str
     */
    dealJsonData(str){
        let data =commonUtil.cloneObj(JSON.parse((str && str!="") ? str : "[]"));
        let storeData = {
            state:{
                dataSource:[],
                entity:[],
            },
            action:[],
            mutation:[],
            extendField:[]
        }
        let APIData =[]
        let routerData = [];
        let pageOption = [];
        let storeModuleNameList = [];
        data.map(item => {
            storeModuleNameList = commonUtil.concatArr(storeModuleNameList,[item.subName]);
            storeData.state.dataSource = commonUtil.concatArr(storeData.state.dataSource,item.serverData.store.state.dataSource);
            storeData.state.entity = commonUtil.concatArr(storeData.state.entity,item.serverData.store.state.entity);
            storeData.action = commonUtil.concatArr(storeData.action,item.serverData.store.action);
            storeData.mutation = commonUtil.concatArr(storeData.mutation,item.serverData.store.mutation);
            item.routerData.type = item.pageType;
            routerData = commonUtil.concatArr(routerData,[item.routerData]);
            APIData = commonUtil.concatArr(APIData,item.serverData.API);
            pageOption = commonUtil.concatArr(pageOption,[item.pageOption]);
        })
        storeData.state.dataSource.forEach(item => {
            storeData.extendField.push(commonUtil.titleCase(item));
        })
        
        return {
            storeData,routerData,APIData,pageOption,storeModuleNameList

        }

    },
    /**
     * @description 组合两个名字或者一个名字
     * @param {String} path 
     * @param {String} name 
     * @example 
     * path = a/a name = b/b => a_a_b_b
     * path = a/a name = null => a_a
     */
    getCompName(path,name){
        if(name){
            path = path.split("/").join("_");
            return path + "_" + name;
        }else{
            path = path.split("/").join("_");
            return path;
        }
    },
    /**
     * @description 截取window绝对路径 转换为 ejs可用路径
     * @param {String} winPath 
     */
    getWindowsPath(winPath){
        let str = winPath.split(":");
        let resultStr = "";
        str.forEach((item,index) => {
            if(index != 0){
                resultStr += ":"+item;
            } 
        })
        return resultStr.substring(1);
    },
     /**
     * @description 编写datajson的history
     * @param {String} dataStr 
     */
    writeDataHistory(moduleName,dataStr){
        let tempFolderPath = path.resolve(__dirname,"../../../tempFolder/"+moduleName + "/data.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        let _dataJsonHistoryStr = fsTool.readFile(tempFolderPath);
        let _dataJsonHistoryJson = JSON.parse(_dataJsonHistoryStr != "" ? _dataJsonHistoryStr : "[]");
        let __dataJson = JSON.parse((dataStr && dataStr!="") ? dataStr : "[]");
        _dataJsonHistoryJson.push(__dataJson);
        fsTool.writeFile(tempFolderPath,JSON.stringify(_dataJsonHistoryJson,null,"\t"))
    },
    /**
     * @description 编写global的history
     * @param {String} dataStr 
     */
    writeGlobalHistory(moduleName,dataStr){
        let tempFolderPath = path.resolve(__dirname,"../../../tempFolder/"+moduleName + "/global.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        fsTool.writeFile(tempFolderPath,dataStr)
    },
    
}