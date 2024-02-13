import { Request, Response, NextFunction } from 'express'
import joi from 'joi'
import { BadRequestException } from '../utils/error/httpException.error'


export const joiValidateMiddleware = (schema: joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequestException(error.message);
    }
    next();
  }
  catch (error) {
    next(error);
  }

}

