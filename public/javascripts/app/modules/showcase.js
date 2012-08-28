define([
    "app",
    "backbone",
    "modules/cake"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();

           Showcase.Model = Backbone.Model.extend({
               // validate: function(attrs){

               // },
               // defaults:{
               //     "name": "",
               //     "descript": "",
               //     "pic": ""
               // }
           });

           Showcase.Collection = Backbone.Collection.extend ({
               url:"/api/showcases",
               // cache: true,

               initialize: function(){

               }
           });

           Showcase.Views.Item = Backbone.View.extend({
               template: "showcase/item",
               tagName: "p",

               initialize: function(){
                   // this.model.off(null, null, this);
               }
           });

           Showcase.Views.Edit = Backbone.View.extend({
               template: "showcase/edit",
               tagName: "div",

               beforeRender: function(){

               }
           });


           Showcase.Views.List = Backbone.View.extend({
               template: "showcase/list",
               tagName: "div",

               beforeRender: function(){
                   this.collection = new Showcase.Collection();
                   console.log(this.collection);
                   this.collection.push({ name: "liubin"});

                   // console.log(this.collection);
                   this.collection.each(function(showcase){
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
