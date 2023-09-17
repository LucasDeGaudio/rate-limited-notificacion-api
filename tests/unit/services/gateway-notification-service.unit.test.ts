import { ExternalError } from '../../../src/errors/external-error';
import { NotificationRequest } from '../../../src/interfaces/resources/notification';
import { gatewayNotificationService } from '../../../src/services/gateway-notification-service';

describe('gateway-notification-service suite test', () => {
  test('Should send a notification successfully', async () => {
    const requestBody: NotificationRequest = {
      type: 'News',
      email: 'test1@test.com',
      message: 'test message',
    };
    const consoleInfoSpy = jest.spyOn(console, 'info');

    gatewayNotificationService.send(requestBody);

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      `Sending message to user: ${requestBody.email} message: ${requestBody.message}`,
    );
  });

  test('should handle errors and throw ExternalError', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const requestBody: NotificationRequest = {
      type: 'News',
      email: 'test1@test.com',
      message: 'test message',
    };

    const error = new Error('Test error');
    jest.spyOn(console, 'info').mockImplementation(() => {
      throw error;
    });

    expect(() => gatewayNotificationService.send(requestBody)).toThrowError(
      ExternalError,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '<gateway-notification-service> Error:',
      {
        error,
      },
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
