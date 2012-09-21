
/*
 * DJZ system API
 */
var http = require('http');
var options = {
    host: '149.16.16.61',
    port: 8001,
    path: '/WebRoot/login.jsp',
    method: 'POST',
    headers: {

    }
};


exports.login = function(name, passwd){
    // var body = 'userName='+name+'&password='+passwd+';';
    // var req = http.request(options, function(res){
    //     res.setEncoding('utf8');
    //     res.on('data',function(chunk){
    //         console.log(chunk);
    //     });
    // });
 //   req.end(body);
    return("login");
};
