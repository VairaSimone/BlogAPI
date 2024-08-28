// router/blog.router.js
import express from 'express';
import { GetAllBlog, GetIDBlog, GetAllBlogByTitle, PostBlog, PutBlog, DeleteBlog, UpdateBlogPostCover } from '../controllers/BlogRoute_controller.js';
import { GetAllComments, GetCommentById, PostComment, PutComment, DeleteComment } from '../controllers/CommentRoute_controller.js';

const blogRouter = express.Router();

blogRouter.get('/blogPosts', GetAllBlogByTitle );

blogRouter.get('/', GetAllBlog);

blogRouter.get('/:blogId', GetIDBlog);

blogRouter.post('/', PostBlog);

blogRouter.put('/:blogId', PutBlog);

blogRouter.delete('/:blogId', DeleteBlog);

blogRouter.patch('/:blogPostId/cover', UpdateBlogPostCover);

// Routes per i commenti
blogRouter.get('/:id/comments', GetAllComments);

blogRouter.get('/:id/comments/:commentId', GetCommentById);

blogRouter.post('/:id/comments', PostComment);

blogRouter.put('/:id/comments/:commentId', PutComment);

blogRouter.delete('/:id/comments/:commentId', DeleteComment);

export default blogRouter;
