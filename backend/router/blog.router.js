import express from 'express';
import * as blogController from '../controllers/BlogRoute_controller.js';
import * as commentController from '../controllers/CommentRoute_controller.js';
import authentification from '../middlewares/authentification.js';

const blogRouter = express.Router();
blogRouter.use(authentification)

blogRouter.get('/blogPosts', blogController.GetAllBlogByTitle );

blogRouter.get('/', blogController.GetAllBlog);

blogRouter.get('/:blogId', blogController.GetIDBlog);

blogRouter.post('/', blogController.PostBlog);

blogRouter.put('/:blogId', blogController.PutBlog);

blogRouter.delete('/:blogId', blogController.DeleteBlog);

blogRouter.patch('/:blogPostId/cover', blogController.UpdateBlogPostCover);

blogRouter.get('/:id/comments', commentController.GetAllComments);

blogRouter.get('/:id/comments/:commentId', commentController.GetCommentById);

blogRouter.post('/:id/comments', commentController.PostComment);

blogRouter.put('/:id/comments/:commentId', commentController.PutComment);

blogRouter.delete('/:id/comments/:commentId', commentController.DeleteComment);

export default blogRouter;
