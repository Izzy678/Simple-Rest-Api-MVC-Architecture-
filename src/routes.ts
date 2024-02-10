import { Router, Express } from 'express';
import { UserService } from './user/service/user.service';
import { joiValidateMiddleware } from './middleware/validateResource';
import { createUserValidator } from './user/validator/user.validator';
import { UserController } from './user/controller/user.contoller';
import { errorHandler } from './middleware/errorHandler';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { TokenService } from './token/service/token.service';
import { signInValidator } from './auth/validator/auth.validator';
import {productRouterBasePath,ProductRouter} from './product/router/product.router';

const route = Router();

// Create an instance of UserService
const userService = new UserService();
const authService = new AuthService(userService, new TokenService());
// Pass userService to UserController
const userController = new UserController(userService);
const authController = new AuthController(authService );

// Define routes
export async function routes(app: Express) {
 
    app.post('/api/users/create-user', joiValidateMiddleware(createUserValidator),userController.router);
    app.use(AuthController.basePath,authController.router);
    app.use(productRouterBasePath,ProductRouter)


    app.use(errorHandler);
}
