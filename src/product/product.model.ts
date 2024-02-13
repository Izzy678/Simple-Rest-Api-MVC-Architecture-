import { string } from "joi"
import mongoose, { Schema } from "mongoose"

export interface Product extends mongoose.Document {
    user:string,
    title:string,
    description:string,
    price:number,
    image:string
}

export const ProductSchema = new Schema({
    user :{
     type: mongoose.Schema.Types.ObjectId,
     ref:'user'
    },
    title:String,
    description:String,
    price:Number,
    image:String
 },
 {
     timestamps: true
 }
)

export const ProductModel = mongoose.model<Product>('Product',ProductSchema);