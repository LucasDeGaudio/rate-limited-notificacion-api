import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import config from './config/common';
import { Route } from './interfaces/routes/routes';
import { errorResponseHandler } from './middlewares/error-handler';
import { postgresDb } from './config/database/postgres';

class App {
  public app: express.Application;
  public port: string;
  public routes: Route[];

  constructor(routes: Route[]) {
    this.app = express();
    this.port = config.port;
    this.routes = routes;
  }

  public initialize = async () => {
    // Initialize Middlewares
    this.initializeMiddlewares();
    // Initialize Routes
    this.initializeRoutes();
    // The errorHandler middleware has to be initialized after routes handlers
    // For the next(error) calls to be directed towards them.
    this.initializeErrorHandler();
    // Initialize Database
    await postgresDb.initializeClient();
    // Initial configuration
    await postgresDb.initialConfiguration();
  };

  public listen = () => {
    const server: Server = this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(
        `App listening with following config: ${JSON.stringify({
          port: this.port,
          node_env: config.nodeEnv,
        })}`,
      );
      console.info(`=================================`);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(express.json({ limit: '1mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
  };

  private initializeRoutes = () => {
    this.routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  };

  private initializeErrorHandler = () => {
    this.app.use(errorResponseHandler);
  };
}

export default App;
