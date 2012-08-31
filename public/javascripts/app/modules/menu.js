define([
    "app",
    "backbone"
],
       function(App, Backbone){

           MenuView  = Backbone.View.extend({
               events: {
                   "click #btn-showcase":   "showcases"
               },


               initialize: function(){
                   _.bindAll(this, 'showcase');
               },

               home: function(e){
                   e.preventDefault();
                   App.router.navigate("",{trigger: true});
               },
               showcases: function(e){
                   e.preventDefault();
                   App.router.navigate("admin/showcases", {trigger: true, replace: true});
               }

           });

           return MenuView;
       });
