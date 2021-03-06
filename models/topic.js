var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: String },
    cakes: [ObjectId],
    top: { type: Boolean, default: false },
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    order:{type: Number, default: Date.now.valueOf()},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    last_reply: { type: ObjectId },
    last_reply_at: { type: Date, default: Date.now },
});

var Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;
