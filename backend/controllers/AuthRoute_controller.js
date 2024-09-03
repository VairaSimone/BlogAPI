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
    console.log('Callback Google raggiunta, token:', req.user.jwtToken); // Log per verifica

    // Reindirizza al frontend con il token JWT
    res.redirect(`http://localhost:3000/login-google-callback?token=${req.user.jwtToken}`);
}
