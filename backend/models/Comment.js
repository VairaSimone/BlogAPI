import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },
        author: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'comments',
    }
);

const Comment = model('Comment', commentSchema);
export default Comment;
