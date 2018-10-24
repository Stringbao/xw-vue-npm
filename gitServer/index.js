
const express = require("express");
const app = express();
const ejsapi  = require("./ejsapi.js");
const fsapi = require("./fsapi.js");

// ejsapi.renderEjsTemplate("a.ejs");


fsapi.mkdirsSync("a/b/c");

const init = ()=>{
    app.listen(3000,d=>{
        console.log("server is running in 3000 port");
    })
}

init();