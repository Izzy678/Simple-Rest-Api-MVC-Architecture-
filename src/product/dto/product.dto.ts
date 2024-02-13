import { Interface } from "readline"

export interface CreateProductDto {
    title: string
    description: string
    price: number
    image: string
}

export interface updateProductDto extends CreateProductDto {}

export interface ProductParams  {
    productId:string
}
