import { Router } from 'express';
import HealthController from '../controllers/health-controller';
import { Route } from '../interfaces/routes/routes';

export class HealthRoute implements Route {
  public basePath = '/health';
  public router = Router();
  public healthController = new HealthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.basePath}`, this.healthController.index);
  }
}
