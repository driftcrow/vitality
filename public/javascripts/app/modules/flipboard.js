define([
    "app"
    ,"backbone"
    ,"plugins/jquerypp.custom"
],
       function(app, Backbone){
           var Flipboard = app.module();

           Flipboard.Views.Showcase = Backbone.View.extend({
               template: "flipboard/showcase",

               events:{

               },

               afterRender:function(){

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
               template: "flipboard/topicpage"+(Math.floor(Math.random()* (5))+1),

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
