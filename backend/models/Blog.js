// models/Blog.js
import mongoose, { Schema, model } from 'mongoose';

const blogSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        category: {
            type: String,
            minLength: 3,
            maxLength: 20,
        },
        title: {
            type: String,
            minLength: 3,
            maxLength: 50,
            required: true
        },
        cover: {
            type: String,
        },
        readTime: {
            value: {
                type: String,
            },
            unit: {
                type: String,
            },
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        content: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    },
    {
        collection: 'blog',
    }
);

const Blog = model('Blog', blogSchema);
export default Blog;
