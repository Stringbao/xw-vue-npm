const business = {
    /**
     * 将数组根据指定的长度进行切割
     * @param {array} cols 
     * @param {number} limitNum 
     */
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
}
module.exports = business;