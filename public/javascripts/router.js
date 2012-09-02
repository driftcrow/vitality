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
                   "admin/showcases": 'listshowcase',
                   "admin/showcases/add": 'addshowcase',
                   "admin/showcases/:id/edit": 'editshowcase'
               },

               views: {},

               index: function() {
                   // this.reset();
                   // app.useLayout("main").render;
               },

               addshowcase: function (){
                   this.views.editshowcases.model = new Showcase.Model();
                   app.layout.setView(".content-box-content", this.views.editshowcases);
                   this.views.editshowcases.render();

               },
               editshowcase: function (){
                   // this.reset();
                   this.views.editshowcases.model = app.model;
                   app.layout.setView(".content-box-content", this.views.editshowcases);
                   this.views.editshowcases.render();

               },

               listshowcase: function(e){

                   app.layout.setView(".content-box-content", this.views.showcases);
                   // this.reset();
                   this.showcases.fetch();
                   this.views.showcases.render();


               },

               reset: function(){
                   if(this.showcases.length){
                       this.showcases.reset();
                   }

               },

               initialize: function(){
                   _.bindAll(this, 'showcases');


                   this.showcases = new Showcase.Collection();
                   this.views.showcases = new Showcase.Views.List({
                       collection: this.showcases
                   });

                   this.views.editshowcases = new Showcase.Views.Edit({

                   });


                   app.useLayout("main");
               }
           });

           return Router;

       });
