import { NextFunction, Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/response/response';
import { ApiError } from '../errors/api-error';
import { responseConstants } from '../constants/response';

export const errorResponseHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorResponse: ApiErrorResponse = {
    statusCode:
      error.statusCode ?? responseConstants.httpResponseCode.INTERNAL_ERROR,
    statusMessage: error.statusMessage ?? responseConstants.statusMessage.ERROR,
    errorMessage: error.errorMessage,
    data: error.data ?? undefined,
  };

  res
    .status(
      error.statusCode ?? responseConstants.httpResponseCode.INTERNAL_ERROR,
    )
    .json(errorResponse);
};
