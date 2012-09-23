define([
    // Application.
    "app"

    // Module
    ,"modules/site"
    ,"modules/showcase"
    // "modules/menu"

],

       function(app,Site, Showcase, Menu) {

           // Defining the application router, you can attach sub routers here.
           var Router = Backbone.Router.extend({
               routes: {
                   "": "index",
                   "admin/showcases": 'listshowcase',
                   "admin/showcases/add": 'addshowcase',
                   "admin/showcases/:id/edit": 'editshowcase',
                   "admin/showcases/:id/delete": 'deleteshowcase'
                   ,"login": 'login'
                   ,"logout": 'logout'
                   ,"showcases": 'showcases'
               },

               views: {},

               index: function() {
                   app.useLayout("site").render();

               },

               //login
               login: function(){
                   app.useLayout("site");
                   app.layout.setView(".main", this.views.login);
                   this.views.login.render();

               },

               logout: function(){
                   // $.removeCookie('username',{path: '/'});
                   $.cookie('username', null,{path: '/'});
                   window.location = '/login';
               },

               showcases: function(){
                   app.useLayout("site");
                   app.layout.setView(".main", this.views.showcasespv);
                   this.showcases.fetch();
                   this.views.showcasespv.render();
               },

               // showchase
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

               deleteshowcase: function (){
                   if (confirm("确认删除！")){
                       app.model.url = "/api/showcases/"+app.model.get("_id");
                       app.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/showcases",true);
                           }
                       });
                   }
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

                   this.views.login = new Site.Views.Login();

                   this.showcases = new Showcase.Collection();
                   this.views.showcases = new Showcase.Views.List({
                       collection: this.showcases
                   });
                   this.views.showcasespv = new Showcase.Views.ListPv({
                       collection: this.showcases
                   });

                   this.views.editshowcases = new Showcase.Views.Edit({

                   });


                   app.useLayout("main");
               }
           });

           return Router;

       });
