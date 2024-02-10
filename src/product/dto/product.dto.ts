export class CreateProductDto {
    user: string
    title: string
    description: string
    price: number
    image: string
}

export class ProductParams {
    productId:string
}

export class ProductQuery {
    user?: string
    title?: string
    description?: string
    price?: number
}