export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const throwBadRequestException = (errorMsg?: string, statusCode?: number) => {
    throw new CustomError(errorMsg || "Bad Request Exception", statusCode || 400);
};

export const notFoundException = (errorMsg?: string, statusCode?: number) => {
    throw new CustomError(errorMsg || "Not Found", statusCode || 404);
};
