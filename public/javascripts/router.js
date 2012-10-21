define([
    // Application.
    "app"

    // Module
    ,"modules/site"
    ,"modules/showcase"
    ,"modules/cake"
    ,"modules/topic"
    ,"modules/flipboard"
    ,"modules/admin"

],

       function(app,Site, Showcase, Cake, Topic, Flipboard, Admin) {

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
                   "admin/topics/:id/delete": 'deletetopic',

                   "admin/transfer":'transfer'

                   ,"login": 'login'
                   ,"logout": 'logout'
                   ,"showcases": 'showcases'
                   ,"about": 'about'
                   ,"faq": 'faq'

                   ,"showcases/:id": "flipshowcase"
               },

               views: {},

               index: function() {
                   console.log('index');
                   app.useLayout("site").render();
                   app.layout.setView(".main", this.views.home);
                   this.views.home.render();

               },
               about: function() {
                   app.useLayout("site").render();
                   app.layout.setView(".main", this.views.about);
                   this.views.about.render();

               },
               faq: function() {
                   app.useLayout("site").render();
                   app.layout.setView(".main", this.views.faq);
                   this.views.faq.render();

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

               transfer:function(){

                   app.layout.setView(".content-box-content", this.views.transfer);

                   this.views.transfer.render();
               },

               showcases: function(){
                   app.useLayout("site");
                   app.layout.setView(".main", this.views.showcasespv);
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
                   var self= this;
                   this.showcases.fetch({
                       success: function(model,response){
                           self.views.showcases.render();
                       }}
                   );
                   // this.views.showcases.render();

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
                   var self= this;
                   this.cakes.fetch({
                       success: function(model,response){
                           self.views.cakes.render();
                       }});
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
                   var self= this;
                   this.topics.fetch({
                       success: function(model,response){
                           self.views.topics.render();
                       }});
               },

               // flipboard preview
               flipshowcase: function(id){
                   app.useLayout("site");
                   var model = new Showcase.Model({_id: id});
                   console.log(model.url());
                   // model.fetch({

                   //     success:function(model,response){
                   //         console.log(model.get('cover'));
                   //     }
                   // });
                   this.views.flipshowcase = new Flipboard.Views.Showcase({model: model});
                   app.layout.setView(".main", this.views.flipshowcase);

                   // this.views.flipshowcase.render();
               },

               reset: function(){
                   if(this.showcases.length){
                       this.showcases.reset();
                   }

               },

               initialize: function(){
                   _.bindAll(this, 'showcases', 'flipshowcase');

                   this.views.login = new Site.Views.Login();
                   this.views.home  = new Site.Views.Login({id:"50836aeb1e40021e53000038"});
                   // this.views.home  = new Site.Views.Topic({id:"507f57b83d89f7cc6b00000f"});
                   this.views.about  = new Site.Views.Topic({id:"50836af21e40021e53000039"});
                   this.views.faq = new Site.Views.Topic({id:"50836afa1e40021e5300003a"});

                   this.showcases = new Showcase.Collection();

                   this.views.showcases = new Showcase.Views.List({
                       collection: this.showcases
                   });
                   this.views.showcasespv = new Showcase.Views.ListPv({
                   });

                   this.views.editshowcases = new Showcase.Views.Edit({
                       model:new Showcase.Model()
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
                       model: new Topic.Model()
                   });

                   this.views.transfer = new Admin.Views.Transfer({

                   });

                   app.useLayout("main");
               }
           });

           return Router;

       });
