define([
    "app",
    "backbone",
    "./cake",
    "redactor"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.menu"
    ,"plugins/chosen.jquery.min"
    ,"plugins/redactor.zh_cn"
],
       function(app, Backbone, Cake){

           var Admin = app.module ();

           Admin.Views.Transfer = Backbone.View.extend({
               template: "admin/transfer",

               events:{
                   "click .save": "transfer",
                   "submit form": "transfer"
               },

               serialize: function(){
                   return { };
               },

               transfer: function(e){
                   e.preventDefault();

                   var source = this.$('[name=dataout]').val();
                   var target = this.$('[name=datain]').val();
                   console.log(source=="");
                   console.log(target=="");
                   if ((source === target)||(source=="")||(target=="")){
                       this.render();
                       return false;
                   };

                   if (confirm("确认进行数据转移？")){
                       var self = this;
                       $.post('/api/transfer',{source:source,target:target},function(data){alert("数据成功转移");
                                                                                       self.render();})
                   }else{this.render()};
               },


               beforeRender: function(){

               },
               afterRender: function(){

               },

               initialize:function(){

               }
           });


           return Admin;
       });
