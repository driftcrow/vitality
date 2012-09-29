define([
    "app",
    "backbone",
    "redactor",
    // ,"modules/post"
    ,"plugins/jquerypp.custom"

    ,"plugins/redactor.zh_cn"
],
       function(app, Backbone){

           var Cake = app.module ();

           Cake.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       return "标题不能为空！";
                   }
                   if(!attrs.description){
                       return "can't be empty!";
                   }
               },
               idAttribute: "_id",
               url:"/api/cakes",

               defaults:{
                   "author_id": "",
                   "cover": "images/cover/default.jpg"
               },

               initialize:function(){
                   // if (!this.isNew()) this.url = "/api/cakes/"+this.get("_id");

               }
           });

           Cake.Collection = Backbone.Collection.extend ({
               url:"/api/cakes",
               // cache: true,

               initialize: function(){
                   // this.model = model;
               }
           });

           Cake.Views.Item = Backbone.View.extend({
               template: "cake/item",
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
                   "hoverenter": "hoverin"
                   ,"hoverleave": "hoverout"
                   // "click ": "edit",
               },

               edit: function(){
                   app.model = this.model;
                   app.router.navigate("admin/cakes/"+this.model.get("_id")+"/edit",true);
               },

               delete: function(){
                   if (confirm("确认删除！")){
                       app.model = this.model;
                       this.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/cakes",true);
                           }
                       });
                   }
               }

           });

           Cake.Views.Edit = Backbone.View.extend({
               template: "cake/edit",

               events:{
                   "click .save": "save",
                   "submit form": "save",
                   "click .upload-image": "uploadimage"
               },

               uploadimage: function(e){
                   $('.redactor_btn_image').click();
               },
               serialize: function(){
                   return {model: this.model };
               },

               save: function(e){
                   e.preventDefault();

                   if (!this.model.isNew()) this.model.url = "/api/cakes/"+this.model.get("_id");
                   console.log('save url:'+this.model.url);
                   this.model.save({
                       title: this.$('[name=title]').val(),
                       description: this.$('[name=description]').val(),
                       cover: this.$('[name=cover]').val()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                           app.router.navigate("admin/cakes",{trigger:true});
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
               },

               afterRender: function(){
                   $('.upload-image').redactor({
                       lang: 'zh_cn',
                       airButtons: ['image'],
                       air:true,
                       imageUpload: '/upload/image',
                       imageUploadCallback: function(obj,json){
                           $('.upload-image').val(json.filelink);
                       }

                   });

               },

               initialize:function(){

               }
           });

          Cake.Views.SelectList = Backbone.View.extend({
               template: "cake/selectlist",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){
                   console.log($(this.el));
               },

               initialize: function(){
                   this.collection = new Cake.Collection();
                   this.collection.on("reset", this.render ,this);
                   this.collection.fetch();
               }

           });

           Cake.Views.List = Backbone.View.extend({
               template: "cake/list",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(cake){
                       cake.id = cake.get("_id");
                       this.insertView( new Cake.Views.Item({
                           model: cake
                       }));
                   },this);
               },

               events: {

               },

               initialize: function(){
                   this.collection.on("reset", this.render ,this);

              }


           });

           return Cake;
       });
