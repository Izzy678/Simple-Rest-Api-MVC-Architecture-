import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/error/http.error";

export function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
    if (err)
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error'
        });
    return next();
}