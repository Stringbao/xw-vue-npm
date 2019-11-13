module.exports =  {
    isExistItem(arr,checkObj,checkTag){
        if(!this.isArr){
            console.log("arr必须是一个array");
            return
        }
        if(!this.isObj(checkObj)){
            console.log("checkObj必须是一个object");
            return 
        }
        if(!checkTag || checkTag == ""){
            console.log("checkTag不能为空");
            return 
        }
        let isRepeat = false;
        arr.forEach(item => {
            if(item[checkTag] == checkObj[checkTag]){
                isRepeat = true;
            }
        })
        return isRepeat;
    },
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
    /**
     * @description 一个字符串首字母大写
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
}