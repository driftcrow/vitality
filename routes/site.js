var fs = require('fs-extra');
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
            // console.log(file.size);
            if(file.size >3000000){
                return res.send({status: 'forbidden',message:'file too large'});
            }
            var savepath = path.resolve(path.join(userDir, filename));
            if (savepath.indexOf(path.resolve(userDir)) !== 0) {
                return res.send({status: 'forbidden'});
            }
            // difference disk bug ,use fs-extra cp & rm instead
            // fs.rename(file.path, savepath, function (err) {
            //     if (err) {
            //         return next(err);
            //     }
            //     var url = '/upload/' + uid + '/' + encodeURIComponent(filename);
            //     res.send(JSON.stringify({ filelink : url }));
            // });
            fs.copy(file.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }
                fs.remove(file.path);
                var url = '/upload/' + uid + '/' + encodeURIComponent(filename);
                res.send(JSON.stringify({ filelink : url }));
            });
        });
    });
};
