define([
    "jquery",
    "app",
    "backbone",
    "redactor"
    ,"plugins/jquerypp.custom"
    ,"plugins/redactor.zh_cn"
],
       function($,app, Backbone){

           var Topic = app.module ();

           Topic.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       console.log(attrs);
                       return "标题不能为空！";
                   }
               },
               idAttribute: "_id",
               url:"/api/topics",

               defaults:{
                   "author_id": $.cookie('username')

               },

               initialize:function(){
                   // if (!this.isNew()) this.url = "/api/topics/"+this.get("_id");
               }
           });

           Topic.Collection = Backbone.Collection.extend ({
               url:"/api/topics",
               // cache: true,

               initialize: function(){
                   // this.model = model;
               }
           });

           Topic.Views.Item = Backbone.View.extend({
               template: "topic/item",
               tagName:"tr",

              initialize: function(){
                   this.model.on("change",this.render,this);

               },


               serialize: function(){
                   return {model: this.model };
               },
               hoverin:function(){
                   app.model = this.model;

               },

               hoverout:function(){
                   app.model = null;

               },

               events: {
                   // "click ": "edit",
                   "hoverenter": "hoverin"
                   ,"hoverleave": "hoverout"

               },

               edit: function(){
                   app.model = this.model;
                   app.router.navigate("admin/topics/"+this.model.get("_id")+"/edit",true);
               },

               delete: function(){
                   if (confirm("确认删除！")){
                       app.model = this.model;
                       this.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/topics",true);
                           }
                       });
                   }
               }

           });

           Topic.Views.Edit = Backbone.View.extend({
               template: "topic/edit",

               events:{
                   "submit form": "save"
               },

               serialize: function(){
                   return {model: this.model };
               },

               save: function(e){
                   e.preventDefault();

                   if (!this.model.isNew()) this.model.url = "/api/topics/"+this.model.get("_id");
                   console.log('save url:'+this.model.url);
                   this.model.save({
                       title: this.$('[name=title]').val(),
                       content: this.$('[name=content]').val(),
                       update_at: Date.now()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                           app.router.navigate("admin/topics",{trigger:true});
                       },
                       error: function(err){
                           console.log(err);
                       }

                   },this);

               },

               cleanup: function() {
                   // this.model.off(null, null, this);
               },

               afterRender: function(){
                   $('.wysiwyg').redactor({
                       lang: 'zh_cn',
                       buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|', 'image', 'table', 'link', '|', 'fontcolor', 'backcolor', '|', 'alignleft', 'aligncenter', 'alignright', 'justify', '|', 'horizontalrule'],
                       imageUpload: '/upload/image'
                   });
               },

               initialize:function(){
               }
           });


           Topic.Views.List = Backbone.View.extend({
               template: "topic/list",
               tagName: "table",
               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(topic){
                       topic.id = topic.get("_id");
                       this.insertView( new Topic.Views.Item({
                           model: topic
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

           return Topic;
       });
