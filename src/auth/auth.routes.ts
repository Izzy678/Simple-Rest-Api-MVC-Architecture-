import { Router } from "express";
import { AuthController } from "./auth.controller";
import { joiValidateMiddleware } from '../middleware/validateResource';
import { signInValidator } from "./auth.validator";

export const AuthRouter = Router();
export const AuthRouterBasePath = '/api/auth/'
export const authController = new AuthController();

AuthRouter.get('/signIn',joiValidateMiddleware(signInValidator), authController.signIn())