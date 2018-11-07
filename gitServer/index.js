
const express = require("express");
const app = express();
const path = require('path');

const fs = require('./api/fs/fsapi.js');

//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./routes.js')(app);

/**
 * @description 启动nodejs服务，分为2种情况:
 * @description 1:项目第一次启动，down项目-->启动服务(带projectPath),并且把路径写入临时文件
 * @description 2:直接启动服务(不带projectPath),会检查该项目是否初始化过,如果初始化过,则启动服务,如果没有初始化过,服务启动失败
 * @param {projectPath} projectPath 
 * @returns 
 */
const init = (projectPath)=>{
    app.listen(3000,d=>{
        const _path = path.join(__dirname,"./projectPath.txt");
        const _clientPath = fs.readFile(_path);
        if(!projectPath){
            console.log(_clientPath);
            if(_clientPath == ""){
                console.log("项目没有创建,直接启动服务失败!");
                process.exit();
            }else{
                console.log("项目已经成功创建,直接启动,path:"+_clientPath);
                console.log("server is running in 3000 port");
            }
        }else{
            fs.writeFile(_path,projectPath);
            console.log(_path,"写入客户端绝对路径成功!");
            console.log("server is running in 3000 port");
        }
    })
}

init();

module.exports = init;