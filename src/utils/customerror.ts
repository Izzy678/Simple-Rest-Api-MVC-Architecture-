import { Response, response } from "express";

export const throwBadRequestException = (res:Response, errorMsg?: string, statusCode?: number) => {
    res.send({
        status:res.sendStatus(400),
        errorMessage: errorMsg || "Bad Request Exception",
        statusCode: statusCode || 400,
    })
};

export const throwNotFoundException =(errorMsg?: string, statusCode?: number) => {
    return {
        errorMessage: errorMsg || "Not Found",
        statusCode: statusCode || 404,
    };
}

export const throwConflictException = (errorMsg?: string, statusCode: number = 403)=>{
    response:Response ;
    console.log("error")
    response.status(statusCode).send({
        message: errorMsg || "Conflict occurred"
    });
};      



