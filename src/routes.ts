import { Express } from 'express';
import { AuthController } from './auth/controller/auth.controller';
import {productRouterBasePath,ProductRouter} from './product/router/product.router';
import { UserRouter, userRouterBasePath } from './user/routes/user.routes';
import { AuthRouter, AuthRouterBasePath } from './auth/routes/auth.routes';


// Define routes
export async function routes(app: Express) {
    app.use(userRouterBasePath,UserRouter);
    app.use(AuthRouterBasePath,AuthRouter);
    app.use(productRouterBasePath,ProductRouter);
}
