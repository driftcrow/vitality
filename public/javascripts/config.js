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
        jquery: "libs/jquery",
        lodash: "libs/lodash",
        backbone: "libs/backbone"
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ["lodash", "jquery"],
            exports: "Backbone"
        },

        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager": ["backbone"]
    }

});
