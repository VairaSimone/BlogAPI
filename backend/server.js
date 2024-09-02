import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';

import authorRouter from './router/author.router.js';
import blogRouter from './router/blog.router.js';
import authRouter from './router/auth.router.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(helmet())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

mongoose
    .connect(process.env.MONGO_STRING)
    .then(() => console.log('Database connesso!'))
    .catch((err) => console.log(err));

app.use("/api/v1/", authRouter)
app.use('/authors', authorRouter);
app.use('/blogs', blogRouter);

app.listen(port, () => {
    console.log(`Server avviato su ${process.env.HOST}:${port}`);
});
