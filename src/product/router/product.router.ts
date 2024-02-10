import { Request, NextFunction, Response, Router } from "express";
import { ProductController } from "../controller/producct.controller";


export const productRouterBasePath = '/api/products'
export const ProductRouter = Router();
const productController = new ProductController()

ProductRouter.post('/create-product',async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await productController.createProduct(req,res,next);
    } catch (error) {
        next(error);
    }
});

//export default ProductRouter;