define([
    // Application.
    "app"

    // Module
    ,"modules/site"
    ,"modules/showcase"
    ,"modules/cake"
    ,"modules/topic"
    ,"modules/flipboard"

],

       function(app,Site, Showcase, Cake, Topic, Flipboard) {

           // Defining the application router, you can attach sub routers here.
           var Router = Backbone.Router.extend({
               routes: {
                   "": "index",
                   "admin/showcases": 'listshowcase',
                   "admin/showcases/add": 'addshowcase',
                   "admin/showcases/:id/edit": 'editshowcase',
                   "admin/showcases/:id/delete": 'deleteshowcase',
                   "admin/cakes": 'listcake',
                   "admin/cakes/add": 'addcake',
                   "admin/cakes/:id/edit": 'editcake',
                   "admin/cakes/:id/delete": 'deletecake',
                   "admin/topics": 'listtopic',
                   "admin/topics/add": 'addtopic',
                   "admin/topics/:id/edit": 'edittopic',
                   "admin/topics/:id/delete": 'deletetopic'
                   ,"login": 'login'
                   ,"logout": 'logout'
                   ,"showcases": 'showcases'

                   ,"showcases/:id": "flipshowcase"
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

               // showcase
               addshowcase: function (){
                   this.views.editshowcases.model = new Showcase.Model();
                   app.layout.setView(".content-box-content", this.views.editshowcases);

                   this.views.editshowcases.render();

               },
               editshowcase: function (){
                   // this.reset();
                   this.views.editshowcases.model = app.model;
                   app.layout.setView(".content-box-content", this.views.editshowcases);
                   // app.layout.setView("#select-cake", this.views.selectcake);
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

               // cake
               addcake: function (){
                   this.views.editcakes.model = new Cake.Model();
                   app.layout.setView(".content-box-content", this.views.editcakes);
                   this.views.editcakes.render();

               },
               editcake: function (){
                   // this.reset();
                   this.views.editcakes.model = app.model;
                   app.layout.setView(".content-box-content", this.views.editcakes);
                   this.views.editcakes.render();
               },

               deletecake: function (){
                   if (confirm("确认删除！")){
                       app.model.url = "/api/cakes/"+app.model.get("_id");
                       app.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/cakes",true);
                           }
                       });
                   }
               },

               listcake: function(e){
                   app.layout.setView(".content-box-content", this.views.cakes);
                   // this.reset();
                   this.cakes.fetch();
                   this.views.cakes.render();


               },
               // topic
               addtopic: function (){
                   this.views.edittopics.model = new Topic.Model();
                   app.layout.setView(".content-box-content", this.views.edittopics);
                   this.views.edittopics.render();

               },
               edittopic: function (){
                   // this.reset();
                   this.views.edittopics.model = app.model;
                   app.layout.setView(".content-box-content", this.views.edittopics);
                   this.views.edittopics.render();
               },

               deletetopic: function (){
                   if (confirm("确认删除！")){
                       app.model.url = "/api/topics/"+app.model.get("_id");
                       app.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/topics",true);
                           }
                       });
                   }
               },

               listtopic: function(e){
                   app.layout.setView(".content-box-content", this.views.topics);
                   // this.reset();
                   this.topics.fetch();
                   this.views.topics.render();


               },

               // flipboard preview
               flipshowcase: function(id){
                   // app.useLayout("site");
                   var model = new Showcase.Model({url:"/api/showcases/"+id});
                   model.fetch();
                   console.log(model);
                   this.views.flipshowcase = new Flipboard.Views.Showcase({model: model});

                   app.layout.setView(".main", this.views.flipshowcase);
                   // app.layout.setView(".main", this.views.flipshowcase);

                   this.views.flipshowcase.render();
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

                   // cake
                   this.cakes = new Cake.Collection();
                   this.views.cakes = new Cake.Views.List({
                       collection: this.cakes
                   });
                   // this.views.cakespv = new Cake.Views.ListPv({
                   //     collection: this.cakes
                   // });

                   this.views.editcakes = new Cake.Views.Edit({

                   });

                   this.views.selectcake = new Cake.Views.SelectList({
                       collection: this.cakes
                   });
                   // topic
                   this.topics = new Topic.Collection();
                   this.views.topics = new Topic.Views.List({
                       collection: this.topics
                   });
                   // this.views.topicspv = new Topic.Views.ListPv({
                   //     collection: this.topics
                   // });

                   this.views.edittopics = new Topic.Views.Edit({


                   });

                   // flipboard
                   // this.views.flipshowcase = new Flipboard.Views.Showcase({

                   // });

                   app.useLayout("main");
               }
           });

           return Router;

       });
