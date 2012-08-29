define([
    "app",
    "backbone",
    "modules/cake"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();

           Showcase.Model = Backbone.Model.extend({
               url:"/api/showcases",
               // validate: function(attrs){

               // },
               defaults:{
                   "title": "",
                   "description": "",
                   "author_id": "",
                   "cover": "images/cover/default.jpg"
               }
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
               el:"form",

               events:{
                   "click .save": "save",
                   "submit form": "save"
               },

               save: function(){
                   console.log('save');
                   this.model.save({
                       title: this.$('[name=title]').val()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                       },
                       error: function(err){
                           console.log(err);
                       }

                   },this);
                   return false;
               },

               beforeRender: function(){
                   var showcase = new Showcase.Model();
                   this.model = showcase;
               }
           });


           Showcase.Views.List = Backbone.View.extend({
               template: "showcase/list",
               tagName: "div",

               beforeRender: function(){
                   this.collection = new Showcase.Collection();
                   console.log(this.collection);

                   var self = this;
                   this.collection.fetch({
                       success: function(collection){
                           collection.each(function(showcase){
                               console.log(showcase);

                               console.log('this: '+ this);
                               self.insertView( new Showcase.Views.Item({
                                   serialize: {model: showcase}
                               }));
                           });
                       }
                   });

               },

               events: {

               },

               initialize: function(){

               }

           });

           return Showcase;
       });
