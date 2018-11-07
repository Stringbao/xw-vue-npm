
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const _config = require("../config");
const ejsTool = require("../ejs/ejsapi");

const api = {
    writeFile:(path,data)=>{
        fsTool.writeFile(path,data);
    },
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

        fsTool.writeFile(viewPath,data);

        return resEntity.setEneity({res:res});
    }
}

module.exports = api;