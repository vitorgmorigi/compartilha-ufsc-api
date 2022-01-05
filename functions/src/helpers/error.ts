import { HttpResponse } from "./http-response";
import { Status } from "./status-codes";

export class CustomError extends Error {
  constructor(
      public readonly code: string, 
      public readonly message: string, 
      public readonly data?: unknown, 
      public readonly body?: string
  ) {
    super();
    this.code = code;
    this.message = message;
    this.data = data;
    this.body = body;
  }
}

export const handleError = (
  error: CustomError, 
  translator: { [key: string]: { statusCode: number; message?: string } }
): HttpResponse => {
  const translated = translator?.[error.code] ??
   { statusCode: Status.InternalServerError, message: 'Internal Server Error' };

  console.log("Error code: ", error.code);
  console.log("Translated: ", translator?.[error.code]);

  return {
    statusCode: translated.statusCode,
    body:
      error.body ||
      {
        success: false,
        message: translated.message ?? error.message,
        data: error.data ?? 'null',
      },
  };
};