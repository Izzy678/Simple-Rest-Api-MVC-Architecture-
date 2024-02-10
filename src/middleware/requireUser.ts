import { Request, Response, NextFunction } from 'express'
import { TokenService } from "../token/service/token.service";
import { UnAuthorizedException } from '../utils/error/notFound.error';


export function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    try {
        if (!user) {
            throw new UnAuthorizedException("you are not authorized to access this endpoint");
        }
        next();
    } catch (error) {
        next(error)
    }
}