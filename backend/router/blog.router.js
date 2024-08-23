import express from 'express';
import { GetAllBlog, GetIDBlog, GetAllBlogByTitle, PostBlog, PutBlog, DeleteBlog, UpdateBlogPostCover } from '../controllers/BlogRoute_controller.js';

const blogRouter = express.Router();

blogRouter.get('/blogPosts', GetAllBlogByTitle );

blogRouter.get('/', GetAllBlog);

blogRouter.get('/:blogId', GetIDBlog);

blogRouter.post('/', PostBlog);

blogRouter.put('/:blogId', PutBlog);

blogRouter.delete('/:blogId', DeleteBlog);

blogRouter.patch('/:blogPostId/cover', UpdateBlogPostCover);

export default blogRouter;
