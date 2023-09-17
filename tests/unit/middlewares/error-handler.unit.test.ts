import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../src/errors/api-error';
import { ApiErrorResponse } from '../../../src/interfaces/response/response';
import { errorResponseHandler } from '../../../src/middlewares/error-handler';

describe('error-handler suite tests', () => {
  test('Should handle error with status code 500', () => {
    const req = { query: {} } as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const apiError = new ApiError('fake name', 500, 'fake message');

    const errorResponse: ApiErrorResponse = {
      statusCode: apiError.statusCode,
      statusMessage: 'ERROR',
      errorMessage: apiError.errorMessage,
    };

    errorResponseHandler(apiError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorResponse);
  });

  test('Should handle error without status code 400', () => {
    const req = { query: {} } as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const apiError = new ApiError('fake name', 400, 'fake message');

    const errorResponse: ApiErrorResponse = {
      statusCode: apiError.statusCode,
      statusMessage: 'ERROR',
      errorMessage: apiError.errorMessage,
    };

    errorResponseHandler(apiError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorResponse);
  });

  test('Should handle error without status code', () => {
    const req = { query: {} } as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const apiError = new ApiError('fake error');

    const errorResponse: ApiErrorResponse = {
      statusCode: 500,
      statusMessage: 'ERROR',
    };

    errorResponseHandler(apiError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorResponse);
  });
});
