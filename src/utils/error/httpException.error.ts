import { HttpException } from "./http.error";
import { Response } from "express";

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }

}

export class UnAuthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }

}