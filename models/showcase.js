var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ShowcaseSchema = new Schema({
    title: { type: String },
    order: { type: Number, default: 1 },
    description: { type: String },
    images: [],
    author_id: { type: ObjectId },
    cake_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now }
});

var Showcase = mongoose.model('showcase', ShowcaseSchema);

module.exports = Showcase;