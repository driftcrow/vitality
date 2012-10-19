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

                   this.views.cakes = new Flipboard.Views.Cakes({collection:this.cakes,showcase:this.model});
                   this.views.topics = new Flipboard.Views.Topics();
               }

           });

          Flipboard.Views.Cakes = Backbone.View.extend({
               template: "flipboard/cakepage",

               events:{

               },
               serialize: function(){
                   return {cakes: this.collection.toJSON(),
                          showcase: this.options.showcase.toJSON()};
               },

               afterRender:function(){
                   console.log(this.$el);
               },

               changecake: function(){
                   // app.cake = this.cakes.first();

               },
               initialize: function(){
                   this.collection.on('reset',this.render,this);

               }

           });

           Flipboard.Views.Topics = Backbone.View.extend({
               template: "flipboard/topicpage",
               topic_tmpl : [["w-25 h-70","w-50 h-70 box-b-l box-b-r","w-25 h-70","w-50 h-30 box-b-r title-top","w-50 h-30 title-top"],
                                 ["w-30 h-60 box-b-r title-top","w-70 h-60 box-img-left title-top","w-40 h-40 box-img-left box-b-r title-top","w-30 h-40 box-b-r title-top","w-30 h-40 title-top"]
                                ],

               serialize: function(){
                   return {topics: this.collection.toJSON(),
                          cake: app.cake.get('title'),
                          tTmpl: topic_tmpl};
               },

               events:{

               },

               afterRender:function(){
                   console.log('afterrender topics:::');

               },

               beforeRender:function(){
                   console.log('beforerender topics:::');

               },

               updateTopics:function(){

                   this.collection.url= '/api/cakes/'+app.cake.get('_id')+"/topics";

                   this.collection.fetch({
                       success:function(collection,response){

                       },
                       error:function(collection,response){

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
