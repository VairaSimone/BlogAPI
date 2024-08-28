// controllers/CommentRoute_controller.js
import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Blog from '../models/Blog.js';

const GetAllComments = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ blog: blogId });

        if (!comments || comments.length === 0) {
            return res.status(404).send({ message: 'Nessun commento trovato per questo post' });
        }

        res.send(comments);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
};

const GetCommentById = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const comment = await Comment.findOne({ _id: commentId, blog: id });

        if (!comment) return res.status(404).send({ message: 'Commento non trovato' });

        res.send(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
};

const PostComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { author, content } = req.body;

        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            blog: blogId,
            author,
            content
        });

        const savedComment = await newComment.save();

        await Blog.findByIdAndUpdate(blogId, { $push: { comments: savedComment._id } });

        res.status(201).send(savedComment);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore durante la creazione del commento' });
    }
};

const PutComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { content } = req.body;

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, blog: id },
            { content },
            { new: true }
        );

        if (!updatedComment) return res.status(404).send({ message: 'Commento non trovato' });

        res.send(updatedComment);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore durante l\'aggiornamento del commento' });
    }
};

const DeleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;

        const deletedComment = await Comment.findOneAndDelete({ _id: commentId, blog: id });

        if (!deletedComment) return res.status(404).send({ message: 'Commento non trovato' });

        await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });

        res.send({ message: 'Commento eliminato' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore durante l\'eliminazione del commento' });
    }
};

export { GetAllComments, GetCommentById, PostComment, PutComment, DeleteComment };
