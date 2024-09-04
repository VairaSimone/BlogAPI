import Author from "../models/Author.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    const author = await Author.findOne({ email: req.body.email})
    if(!author)
        return res.status(401).send("Credenziali sbagliate")
    if(!await bcrypt.compare(req.body.password, author.password))
        return res.status(401).send("Credenziali sbagliate")

    jwt.sign({userid: author.id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    }, (err, jwtToken) => {
        if(err) 
            return res.status(500).send()

        return res.send({
            token: jwtToken
        })

    })
}

export const callbackGoogle = (req, res) => {
    const token = req.user.jwtToken;

    if (!token) {
        console.error("Missing token from Google OAuth callback");
        return res.status(401).send("Authentication failed");
    }

    res.redirect(`http://localhost:3000/login-google-callback?token=${token}`);
};
