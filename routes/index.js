var config = require('../config').config;
var sign = require ('./sign');
var site = require ('./site');
var showcase = require ('./showcase');
var cake = require ('./cake');
var topic = require ('./topic');
var static = require ('./static');
var Models = require('../models');


module.exports = function (app){
    app.get ('/', function(req, res){
        res.render('site',{title:config.sitename}) ;
    });
    app.get ('/login', function(req, res){
        res.render('site',{title:config.sitename}) ;
    });
    app.get ('/showcases', function(req, res){
        res.render('site',{title:config.sitename}) ;
    });
    // app.get ('/', site.index);
    // app.get ('/login', site.login);
    // app.post ('/login', site.login);
    // app.get ('/logout', site.logout);
    // API routing
    app.get('/api',function(req,res){
        res.send('API is running');
    });

    site(app);
    showcase(app);
    cake(app);
    topic(app);


   // static
    app.get ('/about', static.about);
    app.get ('/faq', static.faq);

    // default route by backbone
    app.get('/admin/*', function(req, res){
        res.render('admin', {title: config.sitename });
    });
    // app.get('/*', function(req, res){
    //     res.render('admin', {title: config.sitename });
    // });
};
