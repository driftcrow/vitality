define([
    "app",
    "backbone",
    "modules/cake"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();
           Showcase.Collection = Backbone.Collection.extend ({
               url:"/api/showcases",
               cache: true,

               initialize: function(){

               }
           });

           Showcase.Views.Item = Backbone.View.extend({
               template: "showcase/item",
               tagName: "li",

               initialize: function(){
                   // this.model.off(null, null, this);
               }
           });

           Showcase.Views.List = Backbone.View.extend({
               template: "showcase/list",
               tagName: "ul",

               beforeRender: function(){
                   this.collection = new Showcase.Collection();
                   this.collection.add({ name: "Ginger Kid"});

                   this.collection.each(function(showcase){
                       console.log(showcase);
                       this.insertView( new Showcase.Views.Item({
                           serialize: {model: showcase}
                       }));
                   },this);
               },

               events: {

               }

           });

           return Showcase;
       });
