import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import Author from '../models/Author.js';
import cloudinary from '../config/cloudinary.js';
import transporter from '../config/nodemailer.js';

const GetAllBlog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 3;

        const blogs = await Blog.find({})
            .sort({ title: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalResults = await Blog.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: blogs,
            totalPages,
            totalResults,
            page,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
}

const GetIDBlog = async (req, res) => {
    try {
        const id = req.params.blogId;

        const blog = await Blog.findById(id);
        if (!blog) res.status(404).send({ message: 'Blog non trovato' });
        else res.send(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
}

const GetAllBlogByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).send({ message: 'Titolo non fornito' });
        }

        const blogPost = await Blog.findOne({ title: title });

        if (!blogPost) {
            return res.status(404).send({ message: 'Nessun post trovato con questo titolo' });
        }

        res.send(blogPost);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
}

// controllers/BlogRoute_controller.js
const PostBlog = async (req, res) => {
    try {
        const blogData = req.body;

        // Assicurati che `comments` sia un array di ObjectId valido o un array vuoto
        if (blogData.comments && !Array.isArray(blogData.comments)) {
            return res.status(400).send({ message: 'Il campo comments deve essere un array.' });
        }

        blogData.comments = blogData.comments || [];

        blogData._id = new mongoose.Types.ObjectId();
        const newBlog = new Blog(blogData);

        const createdBlog = await newBlog.save();

        // Trova l'autore associato al blog post
        const author = await Author.findById(blogData.author);

        if (author) {
            // Inviare email di notifica
            await transporter.sendMail({
                from: '"La tua piattaforma" <no-reply@tuaptaform.com>',
                to: author.email,
                subject: 'Hai pubblicato un nuovo post!',
                text: `Ciao ${author.nome},\n\nHai appena pubblicato un nuovo post intitolato "${createdBlog.title}".`,
                html: `<p>Ciao ${author.nome},</p><p>Hai appena pubblicato un nuovo post intitolato "<strong>${createdBlog.title}</strong>".</p>`,
            });
        }

        res.status(201).send(createdBlog);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'Errore nella creazione del blog' });
    }
};


const PutBlog = async (req, res) => {
    try {
        const id = req.params.blogId;
        const blogData = req.body;

        const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        if (!blog) res.status(404).send({ message: 'Blog non trovato' });
        else res.send(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
}

const DeleteBlog = async (req, res) => {
    try {
        const id = req.params.blogId;
        await Blog.findByIdAndDelete(id);
        res.send({ message: 'Blog eliminato' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
}

const UpdateBlogPostCover = async (req, res) => {
    try {
        const { blogPostId } = req.params;
        const file = req.files.cover;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'blogPosts',
        });

        const updatedBlogPost = await Blog.findByIdAndUpdate(
            blogPostId,
            { cover: result.secure_url },
            { new: true }
        );

        if (!updatedBlogPost) return res.status(404).send({ message: 'Blog Post non trovato' });

        res.send(updatedBlogPost);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore durante il caricamento della copertina' });
    }
};

export { GetAllBlog, GetIDBlog, GetAllBlogByTitle, PostBlog, PutBlog, DeleteBlog, UpdateBlogPostCover};
