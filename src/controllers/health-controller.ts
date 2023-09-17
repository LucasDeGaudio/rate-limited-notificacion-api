import { NextFunction, Request, Response } from 'express';
import { responseConstants } from '../constants/response';

class HealthController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.info('<GET-health> Entro Health');
      res.status(responseConstants.httpResponseCode.OK).json();
    } catch (error) {
      console.error('<GET-health> Error:', error);
      next(error);
    }
  };
}

export default HealthController;
