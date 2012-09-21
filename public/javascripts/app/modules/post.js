define([
    "app",
    "backbone"
    // ,"modules/post"
],
       function(app, Backbone){

           var Post = app.module ();

           Post.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       return "标题不能为空！";
                   }
                   if(!attrs.description){
                       return "can't be empty!";
                   }
               },
               idAttribute: "_id",
               url:"/api/posts",

               defaults:{
                   "author_id": "",
                   "cover": "images/cover/default.jpg"
               },

               initialize:function(){
                   // if (!this.isNew()) this.url = "/api/posts/"+this.get("_id");

               }
           });

           Post.Collection = Backbone.Collection.extend ({
               url:"/api/posts",
               // cache: true,

               initialize: function(){
                   // this.model = model;
               }
           });

           Post.Views.Item = Backbone.View.extend({
               template: "post/item",
               className:"thumbnail-wrap",

               hoverin:function(){
                   app.model = this.model;

                   this.$el.animate({
                      "margin-top": "-=10px"
                   },'fast');
                   // this.$('img.thumbnail-shadow').css("visibility", "hidden");

                   this.$('div.sections-overlay').css("visibility", "visible");

                   this.$('div.sections-overlay').animate({
                       opacity: 1
                       ,'background-position-x': "0px"
                       , 'background-position-y': "-33px"
                       , 'background-size': "300px"
                   },1000);

               },

               hoverout:function(){
                   app.model = null;
                   this.$el.animate({
                      "margin-top": "+=10px"
                   },'fast');

                   this.$('div.sections-overlay').animate({
                       opacity: 1
                       ,'background-position-x': "-40px"
                       , 'background-position-y': "-300px"
                       , 'background-size': "0px"
                   },1000);
                   this.$('div.sections-overlay').css("visibility", "hidden");
               },

               initialize: function(){
                   console.log(this.model);
                   this.model.on("change",this.render,this);

               },


               serialize: function(){
                   return {model: this.model };
               },

               events: {
                   // "click ": "edit",
                   "mouseenter": "hoverin",
                   "mouseleave": "hoverout"
               },

               edit: function(){
                   app.model = this.model;
                   app.router.navigate("admin/posts/"+this.model.get("_id")+"/edit",true);
               },

               delete: function(){
                   if (confirm("确认删除！")){
                       app.model = this.model;
                       this.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/posts",true);
                           }
                       });
                   }
               }

           });

           Post.Views.Edit = Backbone.View.extend({
               template: "post/edit",

               events:{
                   "click .save": "save",
                   "submit form": "save"
               },

               serialize: function(){
                   return {model: this.model };
               },

               save: function(e){
                   e.preventDefault();

                   if (!this.model.isNew()) this.model.url = "/api/posts/"+this.model.get("_id");
                   console.log('save url:'+this.model.url);
                   this.model.save({
                       title: this.$('[name=title]').val(),
                       description: this.$('[name=description]').val(),
                       cover: this.$('[name=cover]').val()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                           app.router.navigate("admin/posts",{trigger:true});
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


           Post.Views.List = Backbone.View.extend({
               template: "post/list",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(post){
                       post.id = post.get("_id");
                       this.insertView( new Post.Views.Item({
                           model: post
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

           return Post;
       });
