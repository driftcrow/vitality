define([
    "app",
    "backbone",
    "modules/cake"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();

           Showcase.Model = Backbone.Model.extend({
               // validate: function(attrs){
               idAttribute: "_id",
               url:"/api/showcases",
               // },
               defaults:{
                   "title": "",
                   "description": "",
                   "author_id": "",
                   "cover": "images/cover/default.jpg"
               },

               initialize:function(){

               }
           });

           Showcase.Collection = Backbone.Collection.extend ({
               url:"/api/showcases",
               // cache: true,

               initialize: function(){
                   // this.model = model;
               }
           });

           Showcase.Views.Item = Backbone.View.extend({
               template: "showcase/item",
               tagName: "li",

               initialize: function(){
                   this.model.on("change",this.render,this);
                   // console.log(this.render());
               },

               serialize: function(){
                   return {model: this.model };
               },

               events: {
                   "click ": "edit"
               },

               edit: function(){
                   app.model = this.model;
                   app.router.navigate("admin/showcases/"+this.model.get("_id")+"/edit",true);
               }

           });

           Showcase.Views.Edit = Backbone.View.extend({
               template: "showcase/edit",

               events:{
                   "click .save": "save",
                   "submit form": "save"
               },

               serialize: function(){
                   return {model: this.model };
               },

               save: function(e){
                   e.preventDefault();

                   if (!this.model.isNew()) this.model.url = "/api/showcases/"+this.model.get("_id");
                   console.log('save url:'+this.model.get("url"));
                   this.model.save({
                       title: this.$('[name=title]').val(),
                       description: this.$('[name=description]').val(),
                       cover: this.$('[name=cover]').val()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                       },
                       error: function(err){
                           console.log(err);
                       }

                   },this);
                   app.router.navigate("admin/showcases",{trigger:true});
               },

               cleanup: function() {
                   this.model.off(null, null, this);
               },

               beforeRender: function(){
                   console.log("start render form");
               },

               initialize:function(){

               }
           });


           Showcase.Views.List = Backbone.View.extend({
               template: "showcase/list",
               tagName: "ul",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(showcase){
                       showcase.id = showcase.get("_id");
                       this.insertView( new Showcase.Views.Item({
                           model: showcase
                       }));
                   },this);
               },

               events: {

               },

               initialize: function(){
                   this.collection.on("reset", this.render ,this);

                   // this.collection.on("fetch",function(){
                   //     this.$("ul").parent().html("<img src='images/spinner.gif'");
                   // },this);
               }


           });

           return Showcase;
       });
