var fs = require('fs');
var path = require('path');
var ndir = require('ndir');

var config = require('../config').config;
var djz =require('./djz');

module.exports = function(app){
    app.post('/api/login',function(req,res){
        var username = req.param('username')
        ,passwd = req.param('passwd');
        console.log(req.body);
        console.log(username);
        djz.login(username, passwd,function(error,cookie){
            if(!error){
                res.send({'username':username,'session':cookie});
            }else {
                res.send('',406);
            }
        }); // FIXME:asyc mode
    });

    app.post('/upload/image', function(req, res, next){
        // var file = req.files && req.files.userfile;
        var file = req.files['file'] ;

        if (!file) {
            res.send({ status: 'failed', message: 'no file' });
            return;
        }
        var uid = req.cookies.username;
        var userDir = path.join(config.upload_dir, uid);
        ndir.mkdir(userDir, function (err) {
            if (err) {
                return next(err);
            }
            var filename = Date.now() + '_' + file.name;
            var savepath = path.resolve(path.join(userDir, filename));
            if (savepath.indexOf(path.resolve(userDir)) !== 0) {
                return res.send({status: 'forbidden'});
            }

            fs.rename(file.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }
                var url = '/upload/' + uid + '/' + encodeURIComponent(filename);
                res.send(JSON.stringify({ filelink : url }));
            });
        });
    });
};
