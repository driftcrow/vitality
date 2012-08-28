define([
    // Application.
    "app",

    // Module
    "modules/showcase"
],

       function(app, Showcase) {

           // Defining the application router, you can attach sub routers here.
           var Router = Backbone.Router.extend({
               routes: {
                   "": "index",
                   "admin/showcase": 'showcase',
                   "admin/showcase/:id/edit": 'editshowcase'
               },

               index: function() {
                   // this.reset();
                   // app.useLayout("main").render;
               },

               editshowcase: function (){
                   // this.layout.reset();
                   // app.useLayout("main");
                   app.layout.setViews({
                       ".content-box-content": new Showcase.Views.Edit()
                   });
                   // app.useLayout("main").render();
               },
               showcase: function(){
                   app.layout.setViews({
                       ".content-box-content": new Showcase.Views.List()
                   });
               },

               initialize: function(){

                   app.useLayout("main");
               }
           });

           return Router;

       });
