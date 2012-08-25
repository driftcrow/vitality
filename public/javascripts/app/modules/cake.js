define([
    "app",
    "backbone"
    // "modules/cake"
],
       function(app, Backbone){

           var Cake = app.module ();
           Cake.Collection = Backbone.Collection.extend ({
               url:"/api/showcases",
               cache: true,

               initialize: function(){

               }
           });

           Cake.Views.List = Backbone.View.extend({
               template: "showcase/list",

               beforeRender: function(){
                   // this.collection.add({ name: "Ginger Kid"});

                   // this.collection.each(function(showcase){
                   //     this.inserView("ul", new Cake.View.Item({
                   //         model: Cake
                   //     }));
                   // },this);
               },

               events: {

               }

           });

           return Cake;
       });
