import { Router } from 'express';
import NotifyController from '../controllers/notify-controller';
import { Route } from '../interfaces/routes/routes';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { postNotifyValidator } from '../validators/notify';

export class NotifyRoute implements Route {
  public basePath = '/notify';
  public router = Router();
  public notifyController = new NotifyController();
  public validator: ExpressJoiInstance;

  constructor() {
    this.validator = createValidator({ passError: true });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}`,
      [this.validator.body(postNotifyValidator)],
      this.notifyController.process,
    );
  }
}
