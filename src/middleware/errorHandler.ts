import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/error/http.error";
import { error } from "console";

export function errorHandler(err:HttpError, req:Request, res:Response, next:NextFunction) {
    if(err)
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
    return next();
}