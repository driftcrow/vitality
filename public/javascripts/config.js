// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ["main"],

    paths: {
        packages:["admin"],
        // JavaScript folders.
        libs: "../libs",

        // My app folders
        modules: "app/modules",
        models: "app/models",
        collections: "app/collections",
        views: "app/views",
        templates: "app/templates",

        // Libraries.
        jquery: "libs/jquery-1.8.2.min",
        lodash: "libs/lodash",
        backbone: "libs/backbone",
        handlebars: "libs/handlebars-1.0.0.beta.6"
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ["lodash", "jquery"],
            exports: "Backbone"
        },

        handlebars: {
            exports: 'Handlebars'
        },
        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager": ["backbone"],
        "plugins/jquerypp.custom": ["jquery"]
    }

});
