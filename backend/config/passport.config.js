import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import Author from "../models/Author.js";
import mongoose from 'mongoose'; // Importa mongoose per generare manualmente l'ObjectId

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
}, async function(accessToken, refreshToken, profile, passportNext) {
    const { given_name: firstName, family_name: lastName, email, sub: googleId } = profile._json;

    try {
        let user = await Author.findOne({ googleId });

        if (!user) {
            // Se l'utente non esiste, crealo con un _id generato manualmente
            user = new Author({
                _id: new mongoose.Types.ObjectId(), // Genera manualmente l'_id
                googleId,
                nome: firstName,
                cognome: lastName,
                email,
            });

            user = await user.save();
        }

        const jwtToken = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1w"
        });

        return passportNext(null, { jwtToken });
    } catch (err) {
        console.error("Error in Google Strategy:", err);
        return passportNext(err, null);
    }
});

export default googleStrategy;
