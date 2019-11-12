const business = {
    /**
     * @description 将数组根据指定的长度进行切割
     * @param {array} cols 
     * @param {number} limitNum 
     */
    isHasDialogTag : "1",
    groupBy(cols,limitNum){
        if(!cols instanceof Array){
            return cols
        }
        let _len = cols.length;
        let _limit = _len % limitNum === 0 ? _len / limitNum : Math.floor( (_len / limitNum) + 1 );
        let _array = [];
        for (let i = 0; i < _limit; i++) {
            let temp = cols.slice(i*limitNum, i*limitNum+limitNum);
            _array.push(JSON.parse(JSON.stringify(temp)));
        }
        return _array;
    },
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
    /**
     * @description 一个字符串首字母大写
     * @param {String} str 
     */
    titleCase(str){
        var temp=[];
        str=str.toLowerCase();//全部转换为小写
        return str.substring(0,1).toUpperCase() + str.substring(1);
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
            storeModuleNameList = this.concatArr(storeModuleNameList,[item.subName]);
            storeData.state.dataSource = this.concatArr(storeData.state.dataSource,item.serverData.store.state.dataSource);
            storeData.state.entity = this.concatArr(storeData.state.entity,item.serverData.store.state.entity);
            storeData.action = this.concatArr(storeData.action,item.serverData.store.action);
            storeData.mutation = this.concatArr(storeData.mutation,item.serverData.store.mutation);
            item.routerData.type = item.pageType;
            routerData = this.concatArr(routerData,[item.routerData]);

            APIData = this.concatArr(APIData,item.serverData.API);
            pageOption = this.concatArr(pageOption,[item.pageOption]);
        })
        storeData.state.dataSource.forEach(item => {
            storeData.extendField.push(this.titleCase(item));
        })
        
        return {
            storeData,routerData,APIData,pageOption,storeModuleNameList

        }

    },
    /**
     * @description 合并两个数组(并且去掉重复)；
     * @param {Array} arr 
     * @param {Array} pushArr 
     */
    concatArr(arr,pushArr){
        let newArr = [...arr,...pushArr];
        let resultArr = [];
        newArr.forEach((item,index) => {
           if(this.isObj(item)){
            let __tag = false
            for(var key in item) {
                for(let i = 0 ; i < resultArr.length; i++){
                    if(resultArr[i][key] == item[key]){
                        __tag = true;
                        break;
                    }
                }
                if(__tag){
                    break;
                }
            }
            if(!__tag){
                resultArr.push(item);
            }
           }else{
                if(!resultArr.includes(item)){
                    resultArr.push(item);
                }
           }
        })
        return resultArr;
    },
   
    isObj(obj) {
        return obj && typeof (obj) == 'object' && Object.prototype.toString.call(obj).toLowerCase() == "[object object]";
    },
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