import jwt from 'jsonwebtoken';
import Author from '../models/Author.js';

export default async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send("Token missing");
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).send("Authorization format is incorrect");
    }

    const [scheme, token] = parts;
    if (scheme !== "Bearer") {
        return res.status(401).send("Authorization scheme is incorrect");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const authAuthor = await Author.findById(payload.userid);

        if (!authAuthor) {
            console.error("User not found with id:", payload.userid);
            return res.status(401).send("User not found");
        }

        req.authAuthor = authAuthor;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).send("Invalid token");
    }
};
