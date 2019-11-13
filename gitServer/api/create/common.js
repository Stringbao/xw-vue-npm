module.export =  {
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