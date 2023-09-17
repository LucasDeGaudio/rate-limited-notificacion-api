import { NotifyRoute } from '../../../src/routes/notify-route';

describe('traces-route suite tests', () => {
  test('Should initialize routes', () => {
    const notifyRoute = new NotifyRoute();

    expect(notifyRoute.basePath).toBe('/notify');
    expect(notifyRoute.router.stack.length).toBe(1);
  });
});
