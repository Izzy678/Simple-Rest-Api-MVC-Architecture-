import { NextFunction, Request, Response } from "express";
import { CreateProductDto, ProductParams, updateProductDto } from "../dto/product.dto";
import { ProductService } from "../service/product.service";
import { TokenDto } from "../../token/token.dto.ts/token.dto";
import { NotFoundException } from "../../utils/error/httpException.error";

export class ProductController {
    private readonly productService = new ProductService();

    createProduct = () => async (
        req: Request<{}, {}, CreateProductDto>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { user } = res.locals.tokenData as TokenDto
            const createdProduct = await this.productService.createProduct(req.body, user);
            res.send(createdProduct);
        } catch (error) {
            next(error);
        }
    }

    findOneProduct = () => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const productReq = req as unknown as Request<ProductParams>
            const products = await this.productService.findOneProduct(productReq.params.productId);
            res.send(products);
        } catch (error) {
            next(error);
        }
    }


    findAndUpdateProduct = () => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const productId = req.params.productId;
            const productUpdate: updateProductDto = req.body;
            const tokenData = res.locals.tokenData;
            const updatedProduct = await this.productService.findAndUpdateProduct(productId, tokenData.user, productUpdate);
            res.send(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    getProducts = () => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const products = await this.productService.getProducts();
            res.send(products)
        } catch (error) {
            next(error);
        }

    }

    deleteProduct = () => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { user } = res.locals.tokenData as TokenDto;
            const deletedProduct = await this.productService.deleteProduct(req.params.productId, user);
            if (deletedProduct.deletedCount === 0) throw new NotFoundException("product to be deleted not found");
            res.send({
                message: "product deleted successfully"
            });
        } catch (error) {
            next(error)
        }
    }
}

