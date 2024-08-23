import express from 'express';
import { GetAllAuthor, GetIDAuthor, GetAllBlogByAuthor, PostAuthor, PutAuthor, DeleteAuthor, UpdateAuthorAvatar} from '../controllers/AuthorRoute_controller.js';

const authorRouter = express.Router();

authorRouter.get('/', GetAllAuthor);

authorRouter.get('/:authorId', GetIDAuthor);

authorRouter.get('/:authorId/blogPosts', GetAllBlogByAuthor);

authorRouter.post('/', PostAuthor);

authorRouter.put('/:authorId', PutAuthor);

authorRouter.delete('/:authorId', DeleteAuthor);

authorRouter.patch('/:authorId/avatar', UpdateAuthorAvatar);

export default authorRouter;
