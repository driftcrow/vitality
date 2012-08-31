define([
    // Application.
    "app",

    // Module
    "modules/showcase"
    // "modules/menu"

],

       function(app, Showcase, Menu) {

           // Defining the application router, you can attach sub routers here.
           var Router = Backbone.Router.extend({
               routes: {
                   "": "index",
                   "admin/showcases": 'showcases',
                   "admin/showcases/add": 'editshowcases'
               },

               index: function() {
                   // this.reset();
                   // app.useLayout("main").render;
               },

               editshowcases: function (){
                   // this.layout.reset();
                   // app.useLayout("main");
                   app.layout.setViews({
                       ".content-box-content": new Showcase.Views.Edit(

                       )
                   });
                   app.useLayout("main").render();
               },
               showcases: function(){
                   app.layout.setViews({
                       ".content-box-content": new Showcase.Views.List()
                   });
                   app.useLayout("main").render();

               },

               reset: function(){

                   app.active =false;
               },

               initialize: function(){
                   this.showcases = new Showcase.collection();

                   app.useLayout("main");
               }
           });

           return Router;

       });
