import { NextFunction, Request, Response } from 'express';
import { responseConstants } from '../constants/response';
import { resolveResponse } from '../helpers/response/response-helper';
import { NotificationRequest } from '../interfaces/resources/notification';
import { ApiResponse } from '../interfaces/response/response';
import { notifyService } from '../services/notify-service';

class NotifyController {
  public process = async (
    req: Request<any, any, NotificationRequest, any>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.info('<POST notify> Starting...');
      const requestBody: NotificationRequest = req.body;
      console.info('<POST notify> Request received:', requestBody);

      const notifyResult = await notifyService.process(requestBody);

      const jsonResponse: ApiResponse = {
        statusCode: notifyResult
          ? responseConstants.httpResponseCode.OK
          : responseConstants.httpResponseCode.UNAUTHORIZED,
        statusMessage: notifyResult
          ? responseConstants.statusMessage.OK
          : responseConstants.statusMessage.UNAUTHORIZED,
        data: notifyResult
          ? {
              email: requestBody.email,
              type: requestBody.type,
              message: 'Send',
            }
          : {
              email: requestBody.email,
              type: requestBody.type,
              message: 'User has reached the allowed number of notifications',
            },
      };

      resolveResponse(
        res,
        notifyResult
          ? responseConstants.httpResponseCode.OK
          : responseConstants.httpResponseCode.UNAUTHORIZED,
        jsonResponse,
      );
      console.info('<POST notify> Finished');
    } catch (error) {
      console.error('<POST notify> Error:', error);
      next(error);
    }
  };
}

export default NotifyController;
