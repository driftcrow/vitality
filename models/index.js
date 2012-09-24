var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
// require('./cake');
// require('./topic');
// require('./showcase');

exports.Showcase = require('./showcase');
exports.Cake  = require('./cake');
exports.Topic  = require('./topic');

// exports.Topic = mongoose.model('topic');
