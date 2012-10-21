define([
    "app"
    ,"backbone"
    ,"./topic"
    ,"plugins/jquerypp.custom"
],
       function(app, Backbone, Topic){
           var Site = app.module();

           Site.Views.Login = Backbone.View.extend({
               template: "site/login",

               events:{
                   "submit form": "login"
               },

               login: function(e){
                   e.preventDefault();
                   console.log(document.body);
                   $.ajax({
                       url: '/api/login'
                       ,type:"POST"
                       ,data:$("#loginForm").serialize()
                       ,success: function(data){
                           console.log(data.toString());
                           if(data){
                               $.cookie("username",data["username"]); // TODO:cookie session
                               window.location = 'admin/showcases';
                           }else{
                               $.cookie('username', null,{path: '/'});
                               // $.removeCookie("username");
                               return false;
                           }}
                   });
               }
           });

           Site.Views.Topic = Backbone.View.extend({
               template: "site/topic" ,

               serialize: function(){
                   return {modle: this.model};
               },

               initialize:function(){
                   this.model = new Topic.Model({_id:this.options.id});
                   this.model.fetch();
                   this.model.on('change',this.render,this);
               }
           });



           return Site;
       });
