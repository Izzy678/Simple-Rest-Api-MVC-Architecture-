export class HttpException extends Error {
    public status:number;

    constructor(message:string,statusCode:number){
        super(message);
        this.status=statusCode;
    }
}