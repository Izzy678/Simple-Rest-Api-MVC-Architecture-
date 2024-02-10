import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { TokenDto } from '../../token/token.dto.ts/token.dto';
import { BadRequestException, NotFoundException } from '../../utils/error/notFound.error';
import { CreateProductDto as CreateProductDto } from '../dto/product.dto';
import { Product, ProductModel } from '../model/product.model'
export class ProductService {

    async createProduct(createProductDto: CreateProductDto, { user }: { user: string }): Promise<Product> {
        const product = await ProductModel.create({ createProductDto, user });
        return product;
    }

    async getProduct(query: FilterQuery<Product>): Promise<Product[]> {
        const product = await ProductModel.find(query);
        return product;
    }

    async findOneProduct(query: FilterQuery<Product>, options: QueryOptions): Promise<Product> {
        const product = await ProductModel.findOne(query, options);
        if (!product) throw new NotFoundException("product not found");
        return product;
    }

    async findAndUpdateProduct(
        query: FilterQuery<Product>,
        update: UpdateQuery<Product>,
        options: QueryOptions = {new:true}
    ): Promise<Product> {
        const product = await ProductModel.findOneAndUpdate(query, update, options);
        if (!product) throw new NotFoundException("product not found");
        return product;
    }

    async deleteProduct(
        query: FilterQuery<Product>,
    ) {
        return await ProductModel.deleteOne(query);
    }
    // async getUserProduct({ user }: { user: string }): Promise<Product[]> {
    //     const product = await ProductModel.find({ user });
    //     if (product.length <= 0) throw new NotFoundException("no products found for this user");
    //     return product;
    // }

    // async deleteProduct(productId: string) {
    //     const product = await ProductModel.deleteOne({ _id: productId });
    //     if (!product) throw new NotFoundException("product not found");
    //     return product;
    // }
}