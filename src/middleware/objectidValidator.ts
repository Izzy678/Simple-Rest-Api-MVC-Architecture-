
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestException } from '../utils/error/httpException.error';


export const validateObjectId = (idField: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params[idField] || !mongoose.Types.ObjectId.isValid(req.params[idField])) {
            throw new BadRequestException("Invalid ObjectId");
        }
        next();
    } catch (error) {
        next(error);
    }
};
