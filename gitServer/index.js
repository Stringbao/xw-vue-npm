
const express = require("express");
const app = express();

//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./routes.js')(app);

const init = ()=>{
    app.listen(3000,d=>{ 
        console.log("server is running in 3000 port");
    })
}

init();