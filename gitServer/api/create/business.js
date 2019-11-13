const commonUtil = require("./common.js");
const business = {
    /**
     * @description 将数组根据指定的长度进行切割
     * @param {array} cols 
     * @param {number} limitNum 
     */
    isHasDialogTag : "1",
    getRelativeCompPath(projectPath,name){
        let commonUtilPath = "/core/tool/commonUtil.js";
        let fullPath = "src/pages/"+name;
        let length = fullPath.split('/').length - 1;
        let res = [];
        for(let i=0;i<length;i++){
            res.push("..");
        }
        let path = res.join('/') + commonUtilPath;
        return path;
    },
    isHasDialog(tag){
        return tag == this.isHasDialogTag;
    },
    /**
     * @description 处理datajson里面的数据 进行组装
     * @param {String} str
     */
    dealJsonData(str){
        let data =JSON.parse((str && str!="") ? str : "[]");
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
    }
}
module.exports = business;