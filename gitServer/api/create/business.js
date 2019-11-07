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
        console.log(path);
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
            mutation:[]
        }
        let APIData = {
            url:[],
        }
        let routerData = [];
        let servicesData = [];
        data.map(item => {
            storeData.state.dataSource = this.concatArr(storeData.state.dataSource,item.serverData.store.state.dataSource);
            storeData.state.entity = this.concatArr(storeData.state.entity,item.serverData.store.state.entity);
            storeData.action = this.concatArr(storeData.action,item.serverData.store.action);
            storeData.mutation = this.concatArr(storeData.mutation,item.serverData.store.mutation);
            routerData.push(item.routerData);
            servicesData = this.concatArr(servicesData,item.serverData.services);
            APIData.url = this.concatArr(APIData.url,item.serverData.API.url);
        })
        console.log("storeData" + JSON.stringify(storeData));
        console.log("routerData:" + JSON.stringify(routerData));
        console.log("APIData",APIData);
        console.log("servicesData",servicesData);


    },
    /**
     * @description 合并两个数组(并且去掉重复)；
     * @param {Array} arr 
     * @param {Array} pushArr 
     */
    concatArr(arr,pushArr){
        let newArr = [...arr,...pushArr];
        let resultArr = [];
        newArr.forEach(item => {
           if(!resultArr.includes(item)){
               resultArr.push(item);
           }
        })
        return resultArr;
    },
    
}
module.exports = business;