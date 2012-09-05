define([
    "app",
    "backbone",
    "modules/cake"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();

           Showcase.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       return "标题不能为空！";
                   }
                   if(!attrs.description){
                       return "can't be empty!";
                   }
               },
               idAttribute: "_id",
               url:"/api/showcases",

               defaults:{
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
               className:"thumbnail-wrap",

               hoverin:function(){
                   console.log("on hover in");
                   console.log(this);
                   console.log(this.$('.sections-overlay'));

                   this.$el.animate({
                      "margin-top": "-=10px"
                   },'fast');

                   this.$('div.sections-overlay').css("visibility", "visible");

                   this.$('div.sections-overlay').animate({
                       opacity: 1
                       ,'background-position-x': "0px"
                       , 'background-position-y': "0px"
                       , 'background-size': "250px"
                   },1000);

               },

               hoverout:function(){
                   console.log("on hover out");
               },

               initialize: function(){
                   console.log(this.model);
                   this.model.on("change",this.render,this);
                   // console.log(this.render());

               },


               serialize: function(){
                   return {model: this.model };
               },

               events: {
                   "click ": "edit",
                   "mouseenter": "hoverin",
                   "mouseleave": "hoverout"
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
                   console.log('save url:'+this.model.url);
                   this.model.save({
                       title: this.$('[name=title]').val(),
                       description: this.$('[name=description]').val(),
                       cover: this.$('[name=cover]').val()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                           app.router.navigate("admin/showcases",{trigger:true});
                       },
                       error: function(err){
                           console.log(err);
                       }

                   },this);

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
