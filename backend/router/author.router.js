import express from 'express';
import * as authorController from '../controllers/AuthorRoute_controller.js';
import authentification from '../middlewares/authentification.js';


const authorRouter = express.Router();

authorRouter.get('/', authentification, authorController.GetAllAuthor);

authorRouter.get('/me', authentification, authorController.GetMe);

authorRouter.get('/:authorId', authentification, authorController.GetIDAuthor);

authorRouter.get('/:authorId/blogPosts', authentification, authorController.GetAllBlogByAuthor);

authorRouter.post('/', authorController.PostAuthor);

authorRouter.use(authentification);

authorRouter.put('/:authorId', authorController.PutAuthor);

authorRouter.delete('/:authorId', authorController.DeleteAuthor);

authorRouter.patch('/:authorId/avatar', authorController.UpdateAuthorAvatar);

export default authorRouter;
