import { Express } from 'express';
import {productRouterBasePath,ProductRouter} from './product/product.router';
import { UserRouter, userRouterBasePath } from './user/user.routes';
import { AuthRouter, AuthRouterBasePath } from './auth/auth.routes';


// Define routes
export async function routes(app: Express) {
    app.use(userRouterBasePath,UserRouter);
    app.use(AuthRouterBasePath,AuthRouter);
    app.use(productRouterBasePath,ProductRouter);
}
