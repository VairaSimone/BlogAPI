import express from 'express';
import * as authController from '../controllers/AuthRoute_controller.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

export default authRouter;
