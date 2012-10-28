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
        handlebars: "libs/handlebars-1.0.rc.1",
        redactor: "libs/redactor.min",
        'ckeditor-core': "libs/ckeditor/ckeditor",
        'ckeditor-jquery': "libs/ckeditor/adapters/jquery"
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

        'ckeditor-core':{
            exports: "Ckeditor"
        },

        'ckeditor-jquery':{
            deps:['jquery','ckeditor-core']
        },
        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager": ["backbone"],
        "plugins/jquerypp.custom": ["jquery"],
        "plugins/handlebars.helper": ["handlebars"],
        "plugins/redactor.zh_cn": ["redactor"],
        "plugins/chosen.jquery.min": ["jquery"],
        "plugins/jquery.flips": ["jquery"],
        "plugins/jquery.menu": ["jquery"],
        "plugins/jquery.history": ["jquery"],
        "plugins/jquery.tmpl.min": ["jquery"],
        "plugins/jquerypp.touchSwipe": ["jquery"],
        "plugins/jquery.tablednd.min": ["jquery"],
        "plugins/core.string": ["jquery"]


        }

});
