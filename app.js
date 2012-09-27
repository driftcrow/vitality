
/**
 * Module dependencies.
 */

var express = require('express'),
    router = require('./routes'),
    http = require('http'),
    path = require('path'),
    ndir = require('ndir'),
    config = require('./config').config ;

config.upload_dir = config.upload_dir || path.join(__dirname,'public','user_data','images');
// ensure the upload dir exists
ndir.mkdir(config.upload_dir, function(err){
    if(err){
        throw err;
    }
});

var app = express();

var maxAge = 3600000 * 24 * 30;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/upload', express.static(config.upload_dir, { maxAge: maxAge }));
    app.use('/user_data', express.static(path.join(__dirname,'public','user_data'), { maxAge: maxAge}));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// routers
router(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
