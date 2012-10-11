define([
    "app"
    ,"backbone"
    ,"./showcase"
    ,"plugins/jquerypp.custom"
    ,"plugins/jquery.tmpl.min"
    ,"plugins/jquery.history"
    ,"plugins/core.string"
    ,"plugins/jquerypp.touchSwipe"
    ,"plugins/jquery.flips"
],
       function(app, Backbone, Showcase){
           var Flipboard = app.module();

           Flipboard.Views.Showcase = Backbone.View.extend({
               template: "flipboard/showcase",
               // id:'main',

               events:{

               },

               serialize: function(){
                   return {model: this.model };
               },


               afterRender:function(){
                   console.log('flip showcase afterrender');
                   // move node to body for clean structure(limit by layoutmanager)
                   $('#flip').detach().appendTo('body'); // FIXME:need better method

                   $("#flip").flips();
               },

               beforeRender: function(){
                   //insert cakepage views,manual paginating
                   // var nCakes = this.model.get('cakes').length();
                   console.log('flip showcase beforerender');
                   console.log(this.model);
                   console.log(this.model.get('cakes'));
                   // for(var i=0;i<nCakes;i++){

                   //     var model = new Showcase.Model({_id: this.model.get('cakes')[i]});
                   //     model.fetch();

                   //     console.log(model.url());
                   //     this.views.flipshowcase = new Flipboard.Views.Showcase({model: model});
                   //     app.layout.setView(".main", this.views.flipshowcase);


                   // }


                   for (var i =0 ; i<2 ;i++){
                       this.insertView('#flip', new Flipboard.Views.TopicPage());
                   }

                   //insert cover back
                   var view = new Backbone.View;
                   view.el = view.make('div',{class: "f-page f-cover-back"});
                   this.insertView('#flip', view);
               },



               initialize: function(){
                   console.log(this.model);
                   // this.model.on("change",this.beforeRender,this);
                   this.model.on("change",this.render,this);
                   // this.model.on("change",this.afterRender,this);
                   console.log(this.model.get('cover'));
                   var self = this;
                   this.model.fetch({
                           success:function(model,response){
                               console.log('fetch success');
                               console.log(model);
                               // self.beforeRender();
                               self.render();
                               // model.trigger('change');
                               console.log(model.get('cover'));

                           },
                       error:function(model,response){
                           console.log('fetch');
                           console.log(model.get('cover'));
                           console.log(response);

                       },

                   });
                   console.log(this.model.hasChanged());

               }

           });

           Flipboard.Views.CakePage = Backbone.View.extend({
               template: "flipboard/cakepage",
               className: 'f-page',
               idName: 'f-cakes',

               events:{

               },

               afterRender:function(){

               }

           });


           Flipboard.Views.TopicPage = Backbone.View.extend({
               // template: "flipboard/topicpage"+(Math.floor(Math.random()* (5))+1),
               template: "flipboard/topicpage",
               className: 'f-page',

               serialize: function(){
                   return {collection: this.collection};
               },

               events:{

               },

               afterRender:function(){

               }

           });

           Flipboard.Views.Topic = Backbone.View.extend({
               template: "flipboard/topic",

               events:{

               },

               afterRender:function(){

               }

           });

           Flipboard.Views.Topic = Backbone.View.extend({
               template: "flipboard/topic",

               events:{

               },

               afterRender:function(){

               }

           });

           return Flipboard;
       });
