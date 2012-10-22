define([
    "jquery",
    "app",
    "backbone",
    "./cake",
    "ckeditor-jquery"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.menu"
    ,"plugins/chosen.jquery.min"
],
       function($,app, Backbone, Cake){

           var Topic = app.module ();

           Topic.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       console.log(attrs);
                       return "标题不能为空！";
                   }
               },
               idAttribute: "_id",
               urlRoot:"/api/topics",

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
                   console.log(this.model);

                   this.model.save({
                       title: this.$('[name=title]').val(),
                       content: CKEDITOR.instances["vtTopic"].getData(),
                       // content: this.$('[name=content]').getCode(),
                       cakes: this.$('#chose-cakes').val(),
                       update_at: Date.now()
                   }, {
                       success:function(model, resp){
                           console.log('good');
                           app.router.navigate("admin/topics",{trigger:true});
                       },
                       error: function(model,error){
                           if(error.status === 403){
                               window.location = '/login';
                           }
                       }
                   });

               },

               beforeRender: function(){
                   console.log('topic edit beforerender');
                   this.setView("#select-cake", this.views.selectcake);
               },
               afterRender: function(){
                   console.log('topic edit afterrender');
                   $('.chzn-select').chosen();

                   $("#chose-cakes").val(this.model.get("cakes")).trigger("liszt:updated");

                   var instance = CKEDITOR.instances["vtTopic"];
                   if(instance)
                   {
                       CKEDITOR.remove(instance);
                   }
                   $('#vtTopic').ckeditor(function(){

                      },{
                       toolbar: 'MyToolbar',
                          skin: 'v2',
                          height:'280px',
                          language: 'zh-cn',
                          toolbar_MyToolbar:[
                              ['NewPage','Preview'],
                              ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Scayt'],
                              ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
                              ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
                              '/',
                              ['Styles','Format'],
                              ['Bold','Italic','Strike'],
                              ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
                              ['Link','Unlink','Anchor'],
                              ['Maximize','-']
                          ],
                          filebrowserImageUploadUrl:'/upload/image',
                          filebrowserWindowWidth: 500,
                          filebrowserWindowHeight:  650
                   });

               },

               initialize:function(){
                   this.views.selectcake = new Cake.Views.SelectList();
                   this.model.on('change',this.render,this);
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
