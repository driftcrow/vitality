var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CakeSchema = new Schema({
  name: { type: String },
  order: { type: Number, default: 1 },
  description: { type: String },
  author_id: { type: ObjectId },
  topic_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('cake', CakeSchema);