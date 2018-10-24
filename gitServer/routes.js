

module.exports = (app)=>{
    app.use('/fs',require('./api/fs/index.js'));
    // app.use('/ejs',require('./api/ejs/index.js'));
}