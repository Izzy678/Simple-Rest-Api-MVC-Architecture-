import { Router } from "express";
import { UserController } from "../controller/user.contoller";
import { joiValidateMiddleware } from "../../middleware/validateResource";
import { createUserValidator, updateUserValidator } from "../validator/user.validator";
import { requireUser } from "../../middleware/requireUser";

export const UserRouter = Router();
export const userRouterBasePath = '/api/users/';
const userController = new UserController();

UserRouter.post('/create-user',joiValidateMiddleware(createUserValidator),userController.createUser());
UserRouter.patch('/update-profile',requireUser(),joiValidateMiddleware(updateUserValidator),userController.updateUserProfile());