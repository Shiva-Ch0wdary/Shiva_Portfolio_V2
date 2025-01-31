const { Schema, models, model } = require('mongoose');

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: [{ type: String }],
    title: { type: String },
    contentpera: { type: String },
    maincomment: [{ type: Boolean }],
    createdAt: {type: DataTransfer, default: Date.now },
    experience: { type: Schema.Types.ObjectId, ref: 'Experience', required: true},
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    childern: { type: Schema.Types.ObjectId, ref: 'Comment' },
    parentName: {type: String },
});

export const Comment = models.Comment || model('comment', CommentSchema);

export default Comment;