import Author from '../models/Author.js';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';
import transporter from '../config/nodemailer.js';
import bcrypt from "bcrypt"

const GetAllAuthor = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 3;

        const authors = await Author.find({})
            .sort({ nome: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalResults = await Author.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: authors,
            totalPages,
            totalResults,
            page,
        });
    } catch (err) {
        res.status(500).send();
    }
};

const GetIDAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;

        const author = await Author.findById(id);
        if (!author) res.status(404).send();
        else res.send(author);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Not Found' });
    }
};

const GetAllBlogByAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId;

        const blogPosts = await Blog.find({ author: authorId });

        if (!blogPosts || blogPosts.length === 0) {
            return res.status(404).send({ message: 'Nessun post trovato per questo autore' });
        }

        res.send(blogPosts);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore del server' });
    }
};

const GetMe = async (req, res) => {
    try {
        // Usare l'ID dell'utente autenticato dal middleware
        const user = await Author.findById(req.authAuthor._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: 'Server error' });
    }
}


const PostAuthor = async (req, res) => {
    try {
        // Controlla se l'email è già in uso
        const author = await Author.findOne({ email: req.body.email });
        if (author) return res.status(500).send("Mail in uso");

        // Crea una nuova istanza di Author con un nuovo _id
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAuthor = new Author({
            _id: new mongoose.Types.ObjectId(), // Generazione manuale di un nuovo ObjectId
            nome: req.body.nome,
            cognome: req.body.cognome,
            email: req.body.email,
            password: hashedPassword,
            dataNascita: req.body.dataNascita,
            avatar: req.body.avatar
        });

        // Salva l'autore nel database
        const createdAuthor = await newAuthor.save();

        // Invia un'email di benvenuto
        await transporter.sendMail({
            from: '"La tua piattaforma" <no-reply@tuaptaform.com>',
            to: createdAuthor.email,
            subject: 'Benvenuto su La tua piattaforma!',
            text: `Ciao ${createdAuthor.nome},\n\nGrazie per esserti registrato su La tua piattaforma. Siamo felici di averti con noi!`,
            html: `<p>Ciao ${createdAuthor.nome},</p><p>Grazie per esserti registrato su La tua piattaforma. Siamo felici di averti con noi!</p>`,
        });

        // Risposta di successo
        res.status(201).send(createdAuthor);
    } catch (error) {
        console.log("Errore:", error);
        res.status(400).send({ message: 'Qualcosa è andato storto' });
    }
};


const PutAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        const authorData = req.body;

        const author = await Author.findByIdAndUpdate(id, authorData, { new: true });
        res.send(author);
    } catch (err) {
        res.status(500).send();
    }
};

const DeleteAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        await Author.findByIdAndDelete(id);
        res.send({ message: 'utente eliminato' });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

const UpdateAuthorAvatar = async (req, res) => {
    try {
        const { authorId } = req.params;
        const file = req.files.avatar;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'authors',
        });

        const updatedAuthor = await Author.findByIdAndUpdate(
            authorId,
            { avatar: result.secure_url },
            { new: true }
        );

        if (!updatedAuthor) return res.status(404).send({ message: 'Autore non trovato' });

        res.send(updatedAuthor);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Errore durante il caricamento dell\'avatar' });
    }
};

export { GetAllAuthor, GetIDAuthor, GetAllBlogByAuthor, GetMe, PostAuthor, PutAuthor, DeleteAuthor, UpdateAuthorAvatar};

