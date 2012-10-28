/*
 * DJZ system API
 */
var http = require('http');
var login_cookie="";
var options = {
    host: '149.16.16.61',
    port: 8001,
    path: '/WebRoot/login.jsp',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727)',
        'Cookie': login_cookie
        // 'Content-Length':require('buffer').Buffer.byteLength(body)
    }
};

exports.login = function(name, passwd, callback){
    var body = 'userName='+name+'&password='+passwd;

    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            if(res.statusCode == 302){
                console.log("login success with:"+name);
                login_cookies=res.headers["set-cookie"][0].split(';')[0];
                console.log(login_cookies);
                return callback('',login_cookies);
            }else {
                console.log("login error with:"+name);
                return callback('login error','');
            }
            console.log(res.statusCode);
            console.log("HEAD:"+JSON.stringify(res.headers));
            console.log("chunk:"+chunk);
            // console.log("res:"+JSON.stringify(res));
        });
    });
    req.end(body);
};

exports.getInfo = function(){

};
