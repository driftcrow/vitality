define([
    "jquery",
    "app",
    "backbone",
    "./cake",
    "ckeditor-jquery"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.menu"
    ,"plugins/chosen.jquery.min"
    ,"plugins/jquery.tablednd.min"
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

               beforeRender: function(){
                   $(this.el).attr('data-order',this.model.get('order'));
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

                   this.setView("#select-cake", this.views.selectcake);
               },
               afterRender: function(){

                   var instance = CKEDITOR.instances["vtTopic"];
                   if(instance)
                   {
                       CKEDITOR.remove(instance);
                   }
                   $('#vtTopic').ckeditor(function(){

                   },{
                       toolbar: 'MyToolbar',
                       skin: 'v2',
                       height:'400px',
                       language: 'zh-cn',
                       toolbar_MyToolbar:[
                           ['NewPage','Preview'],
                           ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Scayt'],
                           ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
                           ['Image','Table','HorizontalRule','SpecialChar','PageBreak'],
                           // '/',
                           ['Styles','Format'],
                           ['Bold','Italic','Strike'],
                           ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
                           [ 'JustifyLeft' , 'JustifyCenter' , 'JustifyRight' , 'JustifyBlock' ],
                           ['Link','Unlink','Anchor'],
                           ['Maximize','-']
                       ],
                       filebrowserImageUploadUrl:'/upload/files',
                       // filebrowserImageBrowseUrl : '/browser/files',
                       // filebrowserUploadUrl : '/uploader/upload.php',
                       filebrowserWindowWidth: 500,
                       filebrowserWindowHeight:  650
                   });


                   $('.chzn-select').chosen();

                   $("#chose-cakes").val(this.model.get("cakes")).trigger("liszt:updated");


               },

               initialize:function(){
                   this.views.selectcake = new Cake.Views.SelectList();
                   this.model.on('change',this.render,this);
               }
           });


           Topic.Views.List = Backbone.View.extend({
               template: "topic/list",
               tagName: "table",
               id: "Topics",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(topic){
                       topic.id = topic.get("_id");
                       this.insertView( new Topic.Views.Item({
                           model: topic,
                           id: topic.id
                       }));
                   },this);
               },

               events: {

               },

               afterRender: function(){
                   var _self = this;
                   $("#Topics").tableDnD({
                       onDragClass: "myDragClass",
                       onDrop:function(table,row){
                           var now = new Date(),
                           preOrder = parseInt($(row).prev().attr('data-order'))? parseInt($(row).prev().attr('data-order')):now.valueOf(),
                           nextOrder = parseInt($(row).next().attr('data-order'))? parseInt($(row).next().attr('data-order')):0;

                           var norder = (preOrder + nextOrder)/2;
                           console.log(norder);

                           $.ajax({
                               url:'/api/topics/'+row.id+'/update-order',
                               type: 'PUT',
                               data:{id:row.id,order:norder}
                           }).done(function(msg){
                               $(row).attr('data-order',norder);
                           });
                       }
                   });
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
