import mongoose, { Schema, model } from 'mongoose';

const authorSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        googleId: String,
        nome: {
            type: String,
            minLength: 3,
            maxLength: 20,
            required: true,
        },
        cognome: {
            type: String,
            minLength: 3,
            maxLength: 20,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        dataNascita: {
            type: Date,
        },
        avatar: {
            type: String,
        },
    },
    {
        collection: 'author',
    }
);

const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);
export default Author;
