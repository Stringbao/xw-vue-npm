
const fs = require("fs-extra");
const path = require("path");
const resEntity = require("../responseEntity");
const _global = require("../globals");
const ejsTool = require("../ejs/ejsapi");

const fsTool = {
    /**
     * @method fsapi
     * @param {path} 文件夹路径:/a/b/c
     * @return success
     */
    deleteFolder:path=>{
        if(fs.existsSync(path)) {
            fs.removeSync(path);
            return true;
        }else{
            return false;
        }
    },
    /**
     * @method fsapi
     * @param {dirname} 文件夹名称:/a/b/c
     * @return 存在：不改变，不存在：创建
     */
    createFolder:dirname=>{
        fs.ensureDirSync(dirname);
    },
    /**
     * @method fsapi
     * @param {path} a/b/c.vue
     * @param {name} 文件名称
     * @return sucess
     */
    createFile:(path)=>{
        fs.ensureFileSync(path);
    },
    /**
     * @method fsapi
     * @param {path} 文件路径 a/b.vue
     * @return 读取文件后的字符串
     */
    readFile:(path)=>{
        let str =  fs.readFileSync(path ,"utf8");
        return str;
    },
    /**
     * @method fsapi
     * @param {path} 文件路径 a/b.vue
     * @param {data} 内容 字符串
     * @return 每次写入都会覆盖掉原有的内容
     */
    writeFile:(path,data)=>{
        fs.outputFileSync(path, data);
    }
}

const api = {
    deleteFolder:(req,res)=>{
        let filepath = req.query.path;
        let options = {res:res};
        if(!filepath){
            options.status = "201";
            options.msg = "不允许直接删除根目录!";
        }
        fsTool.deleteFolder(filepath);
        return resEntity.setEneity(options);
    },
    createFolder:(req,res)=>{
        const filepath = req.body.path;
        fsTool.createFolder(filepath);
        return resEntity.setEneity({res:res});
    },
    createFile:(req,res)=>{
        const filepath = _global.viewPath + req.body.path;
        fsTool.createFile(filepath);
        return resEntity.setEneity({res:res});
    },
    createModule:(req,res)=>{
        const moduleName = req.body.moduleName;
        let viewPath = _global.viewPath + moduleName;
        let storePath = _global.storePath + moduleName;
        let apiPath = _global.apiPath + moduleName;
        
        fsTool.createFile(viewPath);
        fsTool.createFile(storePath);
        fsTool.createFile(apiPath);

        //ejs模板写入创建好的文件
        //读取模板文件
        let ejsPath = _global.rootPath + "/ejs/test.ejs";
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:{name:"1111",items:[{age:1},{age:2}]}
        };
        let data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        console.log(1111,data);
        fsTool.writeFile(viewPath,data);

        return resEntity.setEneity({res:res});
    }
}

module.exports = api;