
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const _path = path.join(__dirname,'../ejstemplates/');

const api = {
    readEjsTemplate:fileName=>{
        //需要验证文件是否存在, 待完善
        let str =  fs.readFileSync(_path + fileName ,"utf8");
        return str;
    },
    renderEjsTemplate:fileName=>{
        let str = api.readEjsTemplate(fileName);

        let data = {
            data:{name:"1111",items:[{age:1},{age:2}]}
        };
        let res = ejs.compile(str)(data);
        console.log(res);
    }
}


module.exports = api;