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