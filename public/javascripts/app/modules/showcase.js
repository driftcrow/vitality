define([
    "app",
    "backbone",
    "./cake",
    "redactor"
    ,"plugins/jquerypp.custom"
    ,"plugins/chosen.jquery.min"
    ,"plugins/redactor.zh_cn"
],
       function(app, Backbone, Cake){

           var Showcase = app.module ();

           Showcase.Model = Backbone.Model.extend({
               validate: function(attrs){
                   if(!attrs.title){
                       return "标题不能为空！";
                   }
               },
               idAttribute: "_id",
               // url:"/api/showcases",
               urlRoot: "/api/showcases",

               defaults:{
                   "author_id":$.cookie('username'),
                   "cover": "images/cover/default.jpg"
               },

               initialize:function(){
                   // if (!this.isNew()) this.url = "/api/showcases/"+this.get("_id");

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
                   },800);

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
                   this.model.on("change",this.render,this);

               },

               beforeRender: function(){
                   console.log('showcase item: before render');
               },
               afterRender: function(){
                   console.log('showcase item:  after render');
                   // $('.chzn-select').chosen();
               },

               serialize: function(){
                   return {model: this.model };
               },

               events: {
                   // "click ": "edit",
                   // "mouseenter": "hoverin",
                   // "mouseleave": "hoverout"
                   "hoverenter": "hoverin"
                   ,"hoverleave": "hoverout"

               },

               Edit: function(){
                   app.model = this.model;
                   app.router.navigate("admin/showcases/"+this.model.get("_id")+"/edit",true);
               },

               delete: function(){
                   if (confirm("确认删除！")){
                       app.model = this.model;
                       this.model.destroy({
                           success: function(model,response){
                               app.router.navigate("admin/showcases",true);
                           }
                       });
                   }
               }

           });
           // just for preview
           Showcase.Views.ItemPv = Backbone.View.extend({
               template: "showcase/item",
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
                   },800);

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
                   this.model.on("change",this.render,this);

               },


               serialize: function(){
                   return {model: this.model };
               },

               events: {
                   "click ": "preview"

               },

               preview: function(){
                   app.model = this.model;
                   window.location ="/showcases/"+this.model.get("_id");
               },


           });

           Showcase.Views.Edit = Backbone.View.extend({
               template: "showcase/edit",

               events:{
                   "click .save": "save",
                   "submit form": "save",
                   "click #cover-image": "coverimage"
               },

               serialize: function(){
                   return {model: this.model };
               },

               coverimage: function(){
                   $('.redactor_btn_image').click();
               },

               save: function(e){
                   e.preventDefault();

                   if (!this.model.isNew()) this.model.url = "/api/showcases/"+this.model.get("_id");
                   console.log('save url:'+this.model.url);
                   var self = this;

                   this.model.save({
                       title: this.$('[name=title]').val(),
                       description: this.$('[name=description]').val(),
                       cover: this.$('[name=cover]').val(),
                       cakes: this.$('#chose-cakes').val(),
                       publiced: this.$('[name=publiced]').is(':checked')
                   }, {
                       success:function(model, resp){
                           console.log('resp');

                           app.router.navigate("admin/showcases",{trigger:true});
                       },
                       error: function(err){
                           console.log(err);
                       }
                   });

               },

               cleanup: function() {
                   // this.model.off(null, null, this);
               },

               beforeRender: function(){
                   this.setView("#select-cake", this.views.selectcake);
               },
               afterRender: function(){
                   $('.chzn-select').chosen();

                   $("#chose-cakes").val(this.model.get("cakes")).trigger("liszt:updated");

                   // cover image input
                   $('#cover-image').redactor({
                       lang: 'zh_cn',
                       airButtons: ['image'],
                       air:true,
                       imageUpload: '/upload/image',
                       imageUploadCallback: function(obj,json){
                           $('#cover-image').val(json.filelink);
                       }

                   });

               },

               initialize:function(){
                   this.views.selectcake = new Cake.Views.SelectList();
                   // this.model.on('change',this.render(),this);
                   this.model.bind('change',this.render(),this);
               }
           });


           Showcase.Views.List = Backbone.View.extend({
               template: "showcase/list",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){
                   console.log('showcase list: beforerender');
                   this.collection.each(function(showcase){
                       showcase.id = showcase.get("_id");
                       this.insertView( new Showcase.Views.Item({
                           model: showcase
                       }));
                   },this);
                   var view = new Backbone.View;
                   view.el = view.make('div',{'style':'clear:both;'});
                   this.insertView(view);
               },

               events: {

               },

               initialize: function(){
                   this.collection.on("reset", this.beforeRender ,this);
                   this.collection.on("reset", this.render ,this);
                   this.collection.on("reset", this.afterRender ,this);

                   // this.collection.on("fetch",function(){
                   //     this.$("ul").parent().html("<img src='images/spinner.gif'");
                   // },this);
               }


           });

           Showcase.Views.ListPv = Backbone.View.extend({
               template: "showcase/list",

               serialize: function(){
                   return {collection: this.collection};
               },

               beforeRender: function(){

                   this.collection.each(function(showcase){
                       showcase.id = showcase.get("_id");
                       this.insertView( new Showcase.Views.ItemPv({
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
