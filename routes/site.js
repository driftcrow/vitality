var fs = require('fs-extra');
var path = require('path');
var ndir = require('ndir');
var Models = require('../models');
var requireAdmin = require('./help').requireAdmin;

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
    // for ckeditor upload
    app.post('/upload/files', function(req, res, next){
        // var file = req.files && req.files.userfile;
        var file = req.files['upload'] ;
        var callBack = req.param('CKEditorFuncNum');

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
                // res.set('Content-Type', 'text/html');
                var html = "<html> <body><script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction("+callBack+",'"+url+"'"+"); </script></body></html>"
                res.send(html);
            });
        });
    });

    app.post('/api/transfer',requireAdmin, function(req,res,next){
        var source = req.param('source'),
        target = req.param('target');

        Models.Showcase.update({author_id:source},{author_id:target},function(err,numberAffected,raw){
            if(err){ console.log(err);
                     res.send(500,{error:'数据更新错误'});
                   };
            Models.Cake.update({author_id:source},{author_id:target},function(err,numberAffected,raw){
                if(err){ console.log(err);
                         res.send(500,{error:'数据更新错误'});
                       };
                Models.Topic.update({author_id:source},{author_id:target},function(err,numberAffected,raw){
                    if(err){ console.log(err);
                             res.send(500,{error:'数据更新错误'});
                           };
                    res.send('数据转移成功');
                });

            });

        });

    });
};
