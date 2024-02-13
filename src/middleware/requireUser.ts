import { Request, Response, NextFunction } from 'express'
import { UnAuthorizedException } from '../utils/error/httpException.error';


export const requireUser = () => (req: Request, res: Response, next: NextFunction) => {
    const tokenData = res.locals.tokenData;
    try {
        if (!tokenData) {
            throw new UnAuthorizedException("you are not authorized to access this endpoint");
        }
        next();
    } catch (error) {
        next(error)
    }
}