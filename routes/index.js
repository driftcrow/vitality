
var sign = require ('./sign');
var site = require ('./site');
var showcase = require ('./showcase');
var cake = require ('./cake');
var topic = require ('./topic');
var static = require ('./static');


module.exports = function (app){
    app.get ('/', site.index);

    // admin use module

    // app.get ('/admin/login', sign.login);
    // app.post ('/admin/login', sign.login);


    // //showcase
    // app.get ('/admin/showcases', showcase.index);
    // app.get ('/admin/showcase/:id', showcase.list_cake);
    // app.get ('/admin/showcase/:id/edit', showcase.edit);
    // app.get ('/admin/showcase/:id/delete', showcase.delete);
    // app.get ('/admin/showcase/add', showcase.add);

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
}