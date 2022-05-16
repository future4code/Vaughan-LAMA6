import { BaseError } from "./BaseError";

export class CustomError extends BaseError {
    constructor(statusCode: number, message: string) {
      super(message, statusCode);
    }
  }