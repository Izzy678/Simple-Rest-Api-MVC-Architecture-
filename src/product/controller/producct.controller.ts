import { NextFunction, Request, Router, Response } from "express";
import { CreateProductDto, ProductParams, ProductQuery } from "../dto/product.dto";
import { ProductService } from "../service/product.service";
import { Product } from "../model/product.model";

export class ProductController {
    
    async createProduct(req: Request<{}, {}, CreateProductDto, {}>, res: Response, next: NextFunction) {
        const createdProduct = await new ProductService().createProduct(req.body, res.locals.tokenData);
        res.send(createdProduct);
    }

    async getProduct(req: Request<{}, {}, {}, {}, ProductQuery>, res: Response) {
        return await new ProductService().getProduct(req.query);
    }

    // async findOneProduct(){

    // }

    async findAndUpdateProduct(
        req: Request<{}, {}, CreateProductDto, ProductQuery>,
        res: Response,
    ) {
        const updatedProduct = await new ProductService().findAndUpdateProduct(req.query, req.body);
        res.send(updatedProduct);
    }

    async deleteProduct(
        req: Request<{}, {}, {}, ProductQuery>,
        res: Response,
    ) {
        const deletedProduct = await new ProductService().deleteProduct(req.query);
        res.send(deletedProduct);
    }
    

}