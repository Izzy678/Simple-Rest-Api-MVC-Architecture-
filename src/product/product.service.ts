import { NotFoundException } from '../utils/error/httpException.error';
import { CreateProductDto as CreateProductDto, updateProductDto } from './product.dto';
import { Product, ProductModel } from './product.model'
export class ProductService {

    async createProduct(createProductDto: CreateProductDto,user:string): Promise<Product> {
        const product = await ProductModel.create({ ...createProductDto, user});
        return product;
    }

    async getProducts(): Promise<Product[]> {
        const product = await ProductModel.find();
        if (product.length === 0) throw new NotFoundException("no product found");
        return product;
    }

    async findOneProduct(productId: string): Promise<Product> {
        const product = await ProductModel.findOne({ _id: productId });
        if (!product) throw new NotFoundException("product not found");
        return product;
    }

    async findAndUpdateProduct(
        productId: string,
        userId:string,
        updateProduct: updateProductDto
    ): Promise<Product> {
        const product = await ProductModel.findOneAndUpdate({ _id: productId,user:userId }, updateProduct, { new: true });
        if (!product) throw new NotFoundException("product to be updated not found");
        return product;
    }

    async deleteProduct(
        productId: string,
        user:string
    ) {
        return await ProductModel.deleteOne({ _id: productId ,user});
    }
  
}