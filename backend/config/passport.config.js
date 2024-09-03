import GoogleStrategy from "passport-google-oauth20"
import jwt from "jsonwebtoken"
import Author from "../models/Author.js"
const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.port}${process.env.GOOGLE_CALLBACK}`

},

async function(accessToken, refreshToken, profile, passportNext){
    const {given_name: firstName, family_name: lastName, email, sub: googleId} = profile._json

    let user = await Author.find ({googleId })

    if(!user){
        const newUser = new Author({
           googleId, nome:firstName, cognome:lastName, email,
        })

        user = await newUser.save()
    }

    jwt.sign({userid: user.id}, process.env.JWT_SECRET, {
        expiresIn: "1w"
    }, (err, jwtToken) => {
        if(err) return res.status(500).send()

        return passportNext(null, {jwtToken})
    
    })

}
)

export default googleStrategy