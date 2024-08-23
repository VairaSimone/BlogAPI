import mongoose, { Schema, model } from 'mongoose';

const authorSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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

const Author = model('Author', authorSchema);
export default Author;
