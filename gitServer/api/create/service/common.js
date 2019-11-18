const os = require("os");
module.exports =  {
     /**
      * @description 根据指定字段名「checkTag」对比checkobj是否在arr中有所重复
      * @param {Array} paddingArr 
      * @param {Object} checkObj 
      * @param {String} checkTag 
      */
    // isExistItem(paddingArr,checkObj,checkTag){
    //     if(!this.isArr){
    //         console.log("paddingArr必须是一个array");
    //         return
    //     }
    //     if(!this.isObj(checkObj)){
    //         console.log("checkObj必须是一个object");
    //         return 
    //     }
    //     if(!checkTag || checkTag == ""){
    //         console.log("checkTag不能为空");
    //         return 
    //     }
    //     return this.isRepeatByItem(paddingArr,checkTag,checkObj[checkTag])
    // },
   /**
    * @description 将一维数组根据指定的数字切分成二维数组
    * @param {Array} paddingArr 
    * @param {Number} limitNum 
    */
    groupBy(paddingArr,limitNum){
        if(!paddingArr instanceof Array){
            return paddingArr
        }
        let _len = paddingArr.length;
        let _limit = _len % limitNum === 0 ? _len / limitNum : Math.floor( (_len / limitNum) + 1 );
        let _resultArray = [];
        for (let i = 0; i < _limit; i++) {
            let temp = paddingArr.slice(i*limitNum, i*limitNum+limitNum);
            _resultArray.push(JSON.parse(JSON.stringify(temp)));
        }
        return _resultArray;
    },
    /**
     * @description 一个字符串首字母大写，其余小写
     * @param {String} str 
     */
    titleCase(str){
        var temp=[];
        str=str.toLowerCase();//全部转换为小写
        return str.substring(0,1).toUpperCase() + str.substring(1);
    },
    /**
     * @description 合并两个数组(并且去掉重复)；
     * @param {Array} arr 
     * @param {Array} pushArr 
     */
    concatArr(arr,pushArr){
        let newArr = [...arr,...pushArr];
        let resultArr = [];
        newArr.forEach((item) => {
           if(this.isObj(item)){
               let __tag = false;
               //遍历所有resultArr，当前的item要和result所有的item进行逐一对比；如果有重复了  则直接跳过并且不添加
               resultArr.forEach((resultArrItem) => {
                    if(!__tag){
                        __tag = this.checkObjIsExist(item,resultArrItem);
                    }
               })
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
    checkObjIsExist(item,checkItem){
        let itemLength = this.propertyLength(item);
        let checkItemLength = this.propertyLength(checkItem);
        // 判断两个json属性长度是否一致，如果不一致则直接算作不一致
        if(itemLength == checkItemLength){
            for(var key in item){
                if(item.hasOwnProperty(key) && checkItem.hasOwnProperty(key)){     
                    if(item[key]!==checkItem[key]){
                        return false;
                    };
                }else{
                   return false;
                }
            }
        }else{
            return false;
        }
        return true;
    },
    /**
     * @description 获取obj的长度
     * @param {Object} obj 
     */
    propertyLength(obj){
        var count=0;
        if( obj && typeof obj==="object") {
            for(var ooo in obj) {
                if(obj.hasOwnProperty(ooo)) {
                    count++;
                }
            }
            return count;
        }else {
            throw new Error("argunment can not be null;");
        }
    },
    /**
     * @description 用于判断传入的值是否是一个对象
     * @param {*} obj 
     */
    isObj(item) {
        return item && typeof (item) == 'object' && Object.prototype.toString.call(item).toLowerCase() == "[object object]";
    },
    /**
     * @description 用于判断传入的值是否是一个数组
     * @param {*} item
     */
    isArr(item) {
        return item && typeof (item) == 'object' && Object.prototype.toString.call(item).toLowerCase() == "[object array]";
    },
    /**
     * @description 克隆obj
     * @param { Object } source 
     */
    cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    },
    /**
     * @description 获取当前运行环境
     */
    getRunningEnv(){
        let __Env = os.type();
        if(__Env === "Windows_NT"){
            return "Windows"
        }else{
            return "Mac"
        }
    },
    /**
     * @description 判断一个json数组中是否包含指定的值
     * @param {Array}} paddingArr 
     * @param {String} checkTag 
     * @param {String} checkValue 
     * @returns Boolean
     */
    isExistItem(paddingArr,checkTag,checkValue){
        if(!this.isArr(paddingArr)){
            console.log("paddingArr应该是一个数组");
            return;
        }
        if(!checkTag || checkTag == ""){
            console.log("checkTag不能为空");
            return ;
        }
        if(!checkValue || checkValue == ""){
            console.log("checkValue不能为空");
            return ;
        }
        return paddingArr.some(item => {
            return item[checkTag] == checkValue;
        })
    }
    
}