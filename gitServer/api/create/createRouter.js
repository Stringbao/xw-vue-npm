const _config = require("../pathConfig");
const ejsTool = require("../ejs/ejsapi");
const path = require("path");
module.export = (projectPath, data) => {
    let routerPath = projectPath + "/" + _config.routerPath.router;
    let routerEjsPath = path.resolve(__dirname, _config.routerPath.ejs);
    fsTool.createFile(routerPath);
    let ejsStr = fsTool.readFile(routerEjsPath);
    let _data = ejsTool.renderEjsTemplate(ejsStr,{
        data:data
    });
    fsTool.writeFile(routerPath,_data);
    console.log("写入router成功");
}
