import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import Author from "../models/Author.js";
import mongoose from 'mongoose'; 

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
}, async function(accessToken, refreshToken, profile, passportNext) {
    const { given_name: firstName, family_name: lastName, email, sub: googleId } = profile._json;

    try {
        let user = await Author.findOne({ googleId });

        if (!user) {
            user = new Author({
                _id: new mongoose.Types.ObjectId(), 
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
        console.error("Errore nell'accesso", err);
        return passportNext(err, null);
    }
});

export default googleStrategy;
