import express from 'express';
import * as authController from '../controllers/AuthRoute_controller.js';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.get("/login-google", passport.authenticate("google", {scope:["profile", "email"]}))
authRouter.get("/callback-google", passport.authenticate("google", {session: false}), authController.callbackGoogle)

export default authRouter;
