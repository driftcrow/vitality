var config = require('../config').config;
var djz =require('./djz');

module.exports = function(app){
    app.post('/api/login',function(req,res){
        var username = req.param('username')
        ,passwd = req.param('passwd');
        console.log(req.body);
        console.log(username);
        var cookie=djz.login(username, passwd); // FIXME:asyc mode
        console.log(cookie);
        if(cookie){
            res.send({'username':username});
            // res.cookie(cookie);
            // res.redirect('admin/index');
        } else {
            // res.redirect('/login');
            res.send('');
        }
    });
};
