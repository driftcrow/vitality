var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ShowcaseSchema = new Schema({
    title: { type: String },
    order: { type: Number, default: 1 },
    description: { type: String },
    cover: { type: String },
    author_id: { type: String },
    cakes: [ObjectId],
    share_with: [ObjectId],
    cooperator: [ObjectId],
    publiced:{type: Boolean, default: false},
    cake_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now }
});

var Showcase = mongoose.model('showcase', ShowcaseSchema);

module.exports = Showcase;
