import { HealthRoute } from '../../../src/routes/health-route';

describe('health-route suite tests', () => {
  test('Should initialize routes', () => {
    const healthRoute = new HealthRoute();

    expect(healthRoute.basePath).toBe('/health');
    expect(healthRoute.router.stack.length).toBe(1);
  });
});
