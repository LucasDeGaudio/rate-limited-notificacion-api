import App from './app';
import { HealthRoute } from './routes/health-route';
import { NotifyRoute } from './routes/notify-route';

const app = new App(
  // All App Routes
  [new HealthRoute(), new NotifyRoute()],
);

const run = async () => {
  // Initialize application
  await app.initialize();
  // Listen for connections
  app.listen();
};

run();
