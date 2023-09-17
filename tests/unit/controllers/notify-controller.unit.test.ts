import { Request, Response, NextFunction } from 'express';
import NotifyController from '../../../src/controllers/notify-controller';
import { notifyService } from '../../../src/services/notify-service';
import {
  notifyRequestBody,
  errorNotifyProcessService,
} from '../../mocks/controllers/notify-controller';

describe('notify-controller suite test', () => {
  test('Should respond with 200', async () => {
    const notifyController = new NotifyController();

    const req = {} as Request;
    req.body = notifyRequestBody;
    const res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const processSpy = jest
      .spyOn(notifyService, 'process')
      .mockResolvedValue(true);

    await notifyController.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(processSpy).toHaveBeenCalledTimes(1);
  });

  test('Should respond with 401 when user has reached the allowed number of notifications', async () => {
    const notifyController = new NotifyController();

    const req = {} as Request;
    req.body = notifyRequestBody;
    const res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const processSpy = jest
      .spyOn(notifyService, 'process')
      .mockResolvedValue(false);

    await notifyController.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(processSpy).toHaveBeenCalledTimes(1);
  });

  test('Should respond 500 when service fails', async () => {
    const notifyController = new NotifyController();

    const req = {
      body: {},
    } as Request;
    req.body = notifyRequestBody;

    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    jest
      .spyOn(notifyService, 'process')
      .mockImplementation(() => Promise.reject(errorNotifyProcessService));

    await notifyController.process(req, res, next);
    expect(next).toHaveBeenCalledWith(errorNotifyProcessService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
