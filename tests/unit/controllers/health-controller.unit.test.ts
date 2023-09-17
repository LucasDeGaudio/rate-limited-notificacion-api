import { Request, Response, NextFunction } from 'express';
import HealthController from '../../../src/controllers/health-controller';

describe('health-controller suite test', () => {
  test('Should respond health with 200', async () => {
    const healthController = new HealthController();

    const req = {} as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    await healthController.index(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith();
  });

  test('Should respond 500 when index status method fails', async () => {
    const error = new Error('fake message');
    const healthController = new HealthController();

    const req = {} as Request;
    const res = {} as Response;
    res.status = jest.fn().mockImplementation(() => {
      throw error;
    });
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    await healthController.index(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
