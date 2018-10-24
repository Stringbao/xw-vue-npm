
const fs = require("fs");
const path = require("path");

const api = {
    /**
     * @method fsapi
     * @param {pathName} 文件夹路径:/a/b/c
     * @return 相对路径
     */
    getRelativePath:pathName=>{
        return path.join(__dirname,"../");
    },
    /**
     * @method fsapi
     * @param {path} 文件夹路径:/a/b/c
     * @return success
     */
    deleteFolder:path=>{
        console.log(1111,path);
        if(fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file) {
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    //deleteFolderRecursive(curPath);
                } else { // delete file
                    //fs.unlinkSync(curPath);
                }
            });
            //fs.rmdirSync(path);
        }
    },
    /**
     * @method fsapi
     * @param {dirname} 文件夹名称:/a/b/c
     * @return 如果存在那么覆盖，如果不存在则创建
     */
    mkdirsSync:dirname=>{
        console.log(dirname,22222);
        if(fs.existsSync(dirname)){
            api.deleteFolder(dirname);
            return true;
        }else{
            if(api.mkdirsSync(path.dirname(dirname))) {
                let _dirname = api.getRelativePath(dirname) + dirname;
                fs.mkdirSync(_dirname);
                return true;
            }
        }
    }
}

module.exports = api;