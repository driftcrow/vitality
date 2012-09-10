
var sign = require ('./sign');
var site = require ('./site');
var showcase = require ('./showcase');
var cake = require ('./cake');
var topic = require ('./topic');
var static = require ('./static');
var Models = require('../models');
var djz = require('./djz');

module.exports = function (app){
    app.get ('/', site.index);

    // API routing
    app.get('/api',function(req,res){
        res.send('API is running');
    });

    app.get('/api/showcases', function(req, res){
        return Models.Showcase.find(function( err, showcases){
            if(!err){
                return res.send(showcases);
            } else {
                return console.log(err);
            }
        });
    });

    app.post('/api/showcases', function(req, res){
        var showcase;
        console.log("POST: ");
        console.log(req.body);
        showcase = new Models.Showcase({
            title: req.body.title,
            description: req.body.description,
            cover: req.body.cover

        });
        showcase.save(function( err){
            if(!err){

                return res.send('created');
            } else {
                return console.log(err);
            }
        });
        return res.send(showcase);
    });
    app.get('/api/showcases/:id', function(req,res){
        return Models.Showcase.findById( req.params.id, function(err, showcase){
            if(!err){
                return res.send(showcase);
            } else {
                return console.log(err);
            }
        });
    });
    app.put('/api/showcases/:id', function(req, res){
        console.log(req.params.id);
        console.log(req.params);
        return Models.Showcase.findById(req.params.id, function(err, showcase){
            showcase.title = req.body.title;
            showcase.description = req.body.description;
            showcase.cover = req.body.cover;

            return showcase.save(function(err){
                if (!err){
                    console.log('updated');
                } else {
                    console.log(err);
                }
                return res.send(showcase);
            });
        });
    });

    // admin use module
    app.get('/admin*', function(req, res){
        res.render('admin', {title: 'Admin' });
    });

    // app.get ('/admin/login', sign.login);
    // app.post ('/admin/login', sign.login);


    // DJZ module
    app.post('/api/djz/login', function(req, res){

    });
    // // cakes
    // app.get ('/admin/cake/:id', cake.list_topic);
    // app.get ('/admin/cake/:id/edit', cake.edit);
    // app.get ('/admin/cake/:id/delete', cake.delete);
    // app.get ('/admin/cake/add', cake.add);

    // // topics
    // app.get ('/admin/topic/:id', topic.show);
    // app.get ('/admin/topic/:id/edit', topic.edit);
    // app.get ('/admin/topic/:id/delete', topic.delete);
    // app.get ('/admin/topic/add', topic.add);

    // static
    app.get ('/about', static.about);
    app.get ('/faq', static.faq);
};