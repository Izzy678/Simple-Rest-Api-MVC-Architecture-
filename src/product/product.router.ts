import { Router } from "express";
import { ProductController } from "../controller/product.controller";
import { joiValidateMiddleware } from "../../middleware/validateResource";
import { createProductValidator, updateProductValidator } from "../validator/product.validator";
import { requireUser } from "../../middleware/requireUser";
import { validateObjectId } from "../../middleware/objectidValidator";


export const productRouterBasePath = '/api/products'
export const ProductRouter = Router();
const productController = new ProductController();

ProductRouter.post('/create-product',[requireUser(), joiValidateMiddleware(createProductValidator)], productController.createProduct());

ProductRouter.get('/get-products',productController.getProducts());

ProductRouter.get('/get-a-product/:productId', validateObjectId("productId"),productController.findOneProduct());

ProductRouter.patch('/update-product/:productId',[requireUser(), validateObjectId("productId"),joiValidateMiddleware(updateProductValidator)],productController.findAndUpdateProduct());

ProductRouter.delete('/delete-product/:productId',[requireUser(),validateObjectId("productId"),joiValidateMiddleware(updateProductValidator)],productController.deleteProduct());

