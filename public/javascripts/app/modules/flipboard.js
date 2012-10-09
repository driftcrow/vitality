define([
    "app"
    ,"backbone"
    ,"./showcase"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.tmpl.min"
    ,"plugins/jquery.history"
    ,"plugins/core.string"
    ,"plugins/jquerypp.touchSwipe"
    ,"plugins/jquery.flips"
],
       function(app, Backbone, Showcase){
           var Flipboard = app.module();

           Flipboard.Views.Showcase = Backbone.View.extend({
               template: "flipboard/showcase",
               // id:'main',

               events:{

               },

               afterRender:function(){
                   // move node to body for clean structure(limit by layoutmanager)
                   $('#flip').detach().appendTo('body'); // FIXME:need better method
                   $("#flip").flips();
               },

               beforeRender: function(){
                   for (var i =0 ; i<5 ;i++){
                       this.insertView('#flip', new Flipboard.Views.TopicPage());
                   }
               },

               initialize: function(){
                   this.model.fetch();
                   this.model.on("change",this.render,this);
               }

           });

           Flipboard.Views.Cake = Backbone.View.extend({
               template: "flipboard/cake",

               events:{

               },

               afterRender:function(){

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

           Flipboard.Views.Topic = Backbone.View.extend({
               template: "flipboard/topic",

               events:{

               },

               afterRender:function(){

               }

           });

           Flipboard.Views.Topic = Backbone.View.extend({
               template: "flipboard/topic",

               events:{

               },

               afterRender:function(){

               }

           });

           return Flipboard;
       });
