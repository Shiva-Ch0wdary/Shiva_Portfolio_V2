const { Schema, models, model } = require('mongoose');

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: [{ type: String }],
    title: { type: String },
    contentpera: { type: String },
    maincomment: [{ type: Boolean }],
    createdAt: { type: Date, default: Date.now },
    experience: { type: Schema.Types.ObjectId, ref: 'Experience', required: true},
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    parentName: { type: String },
});

export const Comment = models.comment || model('comment', CommentSchema);

export default Comment;
