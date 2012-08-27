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
                   "admin/showcases": 'showcases'
               },

               index: function() {
                   // this.reset();
                   // app.useLayout("main").render;
               },

               showcases: function (){
                   // this.reset();
                   // app.useLayout("main");
                   app.layout.setViews({
                       ".showcase": new Showcase.Views.List()
                   });
                   app.useLayout("main").render();
               },

               initialize: function(){
                   this.showcases = new Showcase.Collection();
                   this.showcases.add({ name: "Ginger Kid"});

                   app.useLayout("main");
                   app.layout.setViews({
                       ".showcases": new Showcase.Views.List({
                           collection: this.showcase
                       })
                   });
               }
           });

           return Router;

       });
