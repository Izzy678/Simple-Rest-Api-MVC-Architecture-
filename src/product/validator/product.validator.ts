import joi from 'joi'
import { BadRequestException } from '../../utils/error/httpException.error';
import mongoose from 'mongoose';

export const createProductValidator = joi.object({
    title:joi.string().required(),
    description:joi.string().required().custom((value:String)=>{
        const wordCount = value.split(' ').length;
        if(wordCount>120) throw new BadRequestException("description should not be more than 120");
        return value;
    }),
    price:joi.number().required(),
    image:joi.string().required(),
})

const id = joi.object().required().custom((objectId:string)=>{
    try {
       console.log("objectId",objectId)
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
    price:joi.number(),
    image:joi.string(),
})

export const deleteProductValidator = id;

export const getProductValidator = joi.object({

  id:joi.custom((objectId:string)=>{
    try {
       console.log("objectId",objectId)
        const newValue = new mongoose.Types.ObjectId(objectId);
        return newValue;
      } catch (error) {
        throw new BadRequestException("Invalid ObjectId Parsed")
      }
})
});















export const objectIdValidator = (objectId:string)=>{
    try {
        const newValue = new mongoose.Types.ObjectId(objectId);
        return newValue;
      } catch (error) {
        throw new BadRequestException("Invalid ObjectId Parsed")
      }
}

typeof createProductValidator 