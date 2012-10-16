// some help functions
exports.requireLogin = function requireLogin(req,res,next){
    if(req.cookies.username){
        next();
    } else {
        res.send("未登陆",403);
    }
}
