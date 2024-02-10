import joi from 'joi'
import { BadRequestException } from '../../utils/error/notFound.error';
import mongoose from 'mongoose';
import { TypeOf } from 'zod';

const createProductValidator = joi.object({
    title:joi.string().required(),
    description:joi.string().required().custom((value:String)=>{
        const wordCount = value.split(' ').length;
        if(wordCount>120) throw new BadRequestException("description should not be more than 120");
        return value;
    }),
    price:joi.string().required(),
    image:joi.string().required(),
})

const params = joi.string().required().custom((objectId:string)=>{
    try {
        const newValue = new mongoose.Types.ObjectId(objectId);
        return newValue;
      } catch (error) {
        throw new BadRequestException("Invalid ObjectId Parsed")
      }
})


export const updateProductValidator = joi.object({
    title:joi.string(),
    description:joi.string().custom((value:String)=>{
        const wordCount = value.split(' ').length;
        if(wordCount>120) throw new BadRequestException("description should not be more than 120");
        return value;
    }),
    price:joi.string(),
    image:joi.string(),
    productId:params
})

export const deleteProductValidator = params;

export const getProductValidator = params;

















export const objectIdValidator = (objectId:string)=>{
    try {
        const newValue = new mongoose.Types.ObjectId(objectId);
        return newValue;
      } catch (error) {
        throw new BadRequestException("Invalid ObjectId Parsed")
      }
}

typeof createProductValidator 