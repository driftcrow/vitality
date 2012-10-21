var config = require('../config').config;

// some help functions
exports.requireLogin = function requireLogin(req,res,next){
    if(req.cookies.username){
        next();
    } else {
        res.send("未登陆",403);
    }
};
exports.requireAdmin = function requireAdmin(req,res,next){
    if(config.admins.indexOf(req.cookies.username)>=0){
        next();
    } else {
        res.send("不是管理员",403);
    }
};

exports.isAdmin =function(req,res){
    console.log(req.cookies.username);
    return (config.admins.indexOf(req.cookies.username)>=0)?true:false;
};
