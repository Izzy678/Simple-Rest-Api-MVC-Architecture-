import { Request, Response, NextFunction } from 'express'
import zod from 'zod'
import { throwBadRequestException } from '../utils/customerror'
import joi, { func } from 'joi'
import { BadRequestException } from '../utils/error/notFound.error'


export const validate = (schema:zod.AnyZodObject)=>(req:Request, res:Response, next:NextFunction) => {
    try{
        schema.parse ({
            body:req.body,
            params:req.params,
            query:req.query
          })
    }catch(error:any){
      return throwBadRequestException(error.message);
    }
}

export const joiValidateMiddleware = (schema:joi.Schema)=>(req:Request, res:Response, next:NextFunction)=>{
  try{
  console.log("testing")
  const {error} = schema.validate(req.body);
   if(error){
    console.log("error info", error);
    throw new BadRequestException(error.message);
   }
   next();
  }
  catch(error){
    next(error);
  }

}

