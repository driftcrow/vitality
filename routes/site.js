
/*
 * GET home page.
 */
var config = require('../config').config;
var djz =require('./djz');

exports.index = function(req, res){
    res.render('index', {title: config.sitename });
};

exports.login = function(req,res){

    if(req.method=="GET"){
        res.render('login',{title: config.sitename, layout: false });
    } else{
        var username = req.param('username')
        ,passwd = req.param('passwd');
        console.log(username);
        var cookie=djz.login(username, passwd);
        console.log(cookie);
        if(cookie){
            res.cookie('username',username);
            // res.cookie(cookie);
            res.redirect('/admin/showcases');
        } else {
            res.redirect('/login');
        }
    };
};
