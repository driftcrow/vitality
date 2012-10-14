define([
    "app"
    ,"backbone"
    ,"./showcase"
    ,"./cake"
    ,"./topic"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.tmpl.min"
    ,"plugins/jquery.history"
    ,"plugins/core.string"
    ,"plugins/jquerypp.touchSwipe"
    ,"plugins/jquery.flips"
],
       function(app, Backbone, Showcase, Cake, Topic){
           var Flipboard = app.module();

           Flipboard.Views.Showcase = Backbone.View.extend({
               template: "flipboard/showcase",
               // id:'main',

               events:{
                   "click .cake": 'changecake'
               },

               serialize: function(){
                   return {model: this.model };
               },

               changecake: function(){
                   console.log('showcase view changecake');
               },

               afterRender:function(){
                   console.log('flip showcase afterrender');
                   // move node to body for clean structure(limit by layoutmanager)
                   $('.f-cakes').unwrap();
                   $('.f-topics').unwrap();
                   $('.f-topics').appendTo('#flip');
                   $('.f-cover-back').appendTo('#flip');
                   $('#flip').unwrap().unwrap().unwrap().unwrap();
                   // $('#flip').detach().appendTo('body'); // FIXME:need better method

                   $("#flip").flips();
               },

               beforeRender: function(){

                   // insert cakes view
                   this.insertView('#flip',this.views.cakes);


                   // for (var i =0 ; i<10 ;i++){
                       // this.insertView('#flip', new Flipboard.Views.TopicPage());
                   // }

                   this.insertView('#flip',this.views.topics);

                   //insert cover back
                   var view = new Backbone.View;
                   view.el = view.make('div',{class: "f-page f-cover-back"});
                   this.insertView('#flip', view);

               },



               initialize: function(){
                   console.log(this.model);
                   // this.model.on("change",this.beforeRender,this);
                   // this.model.on("change",this.render,this);
                   // this.model.on("change",this.afterRender,this);
                   console.log(this.model.get('cover'));
                   console.log('flip showcase beforerender');

                   this.cakes = new Cake.Collection();


                   var self = this;
                   this.model.fetch({
                       success:function(model,response){
                           //constructor cakes
                           var nCakes = model.get('cakes').length;
                           for(var i=0;i<nCakes;i++){
                               var cake = new Cake.Model({_id:model.get('cakes')[i]});
                               cake.fetch({
                                   success:function(model,response){
                                       self.cakes.add(model);
                                   },
                                   async:false
                               });

                           }


                           },
                       error:function(model,response){
                           console.log('fetch error');
                       },
                       async:false // for app.cake
                   });
                   app.cake = this.cakes.first();
                   console.log(app.cake.get('_id'));
                   this.views.cakes = new Flipboard.Views.Cakes({collection:this.cakes});
                   this.views.topics = new Flipboard.Views.Topics();
               }

           });

           Flipboard.Views.Cakes = Backbone.View.extend({
               template: "flipboard/cakes",

               events:{
                   "click .cake": "changecake"
               },
               serialize: function(){
                   return {collection: this.collection };
               },

               afterRender:function(){

               },

               changecake: function(){
                   // app.cake = this.cakes.first();
                   console.log('change cake');
               },
               initialize: function(){
                   this.collection.on('reset',this.render,this);
                   $('.cake').bind('click','changecake');
               }

           });

           Flipboard.Views.CakePage = Backbone.View.extend({
               template: "flipboard/cakepage",
               className: 'f-page',
               idName: 'f-cakes',

               events:{

               },
               serialize: function(){
                   return {collection: this.collection };
               },

               afterRender:function(){

               },

               initialize: function(){
                   this.collection.on('reset',this.render,this);
               }

           });


           Flipboard.Views.TopicPage = Backbone.View.extend({
               // template: "flipboard/topicpage"+(Math.floor(Math.random()* (5))+1),
               template: "flipboard/topicpage",
               className: 'f-page',

               serialize: function(){
                   return {collection: this.collection};
               },

               events:{

               },

               afterRender:function(){

               }

           });

           Flipboard.Views.Topics = Backbone.View.extend({
               template: "flipboard/topics",

               serialize: function(){
                   return {collection: this.collection,
                          cake: app.cake};
               },

               events:{

               },

               afterRender:function(){
                   console.log('afterrender topics:::');
                   console.log(this.$el);

               },

               beforeRender:function(){
                   console.log('beforerender topics:::');

               },

               updateTopics:function(){
                   console.log('updateTopics');
                   this.collection.url= '/api/cakes/'+app.cake.get('_id')+"/topics";
                   console.log(this.collection);
                   this.collection.fetch({
                       success:function(collection,response){
                           console.log('topic fetch success');
                       },
                       error:function(collection,response){
                           console.log('topic fetch error');
                           console.log('response');
                       }
                   })

               },

               initialize:function(){
                   this.collection = new Topic.Collection();
                   this.updateTopics();
                   app.cake.on('all',this.updateTopics,this); // not working???
                   this.collection.on('reset',this.render,this);
               }

           });

           return Flipboard;
       });
