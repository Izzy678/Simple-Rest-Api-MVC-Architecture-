import { HttpError } from "./http.error";
import { Response } from "express";

export class ConflictException extends HttpError {
  constructor(message:string){
      super(message,409);
}
}

export class BadRequestException extends HttpError {
  constructor(message:string){
      super(message,400);
}
}

export class NotFoundException extends HttpError {
  constructor(message:string){
      super(message,404);
}

}

export class UnAuthorizedException extends HttpError {
  constructor(message:string){
      super(message,401);
}

}