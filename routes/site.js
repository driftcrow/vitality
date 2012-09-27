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

    app.post('/upload/image', function(req, res, next){
        // var file = req.files && req.files.userfile;
        var file = req.files.file ;
        console.log(file);
        if (!file) {
            res.send({ status: 'failed', message: 'no file' });
            return;
        }
        var uid = req.cookies.username;
        var userDir = path.join(config.upload_dir, uid);
        console.log(userDir);
        ndir.mkdir(userDir, function (err) {
            if (err) {
                return next(err);
            }
            var filename = Date.now() + '_' + file.name;
            var savepath = path.resolve(path.join(userDir, filename));
            if (savepath.indexOf(path.resolve(userDir)) !== 0) {
                return res.send({status: 'forbidden'});
            }

            console.log(file.path);
            console.log(savepath);
            fs.rename(file.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }
                var url = '/upload/' + uid + '/' + encodeURIComponent(filename);
                res.send({ status: 'success', filelink: url });
            });
        });
    });
};
