var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var CakeSchema = new Schema({
    title: { type: String },
    order: { type: Number, default: 1 },
    description: { type: String },
    cover: { type: String },
    author_id: { type: String },
    showcases_id: [ObjectId],
    publiced:{type: Boolean, default: false},
    topic_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now }
});

var Cake = mongoose.model('cake', CakeSchema);

module.exports = Cake;
