import { ExternalError } from '../errors/external-error';
import { NotificationRequest } from '../interfaces/resources/notification';

class GatewayNotificationService {
  public send = (requestBody: NotificationRequest): void => {
    try {
      //TODO: implement mail service
      console.info(
        `Sending message to user: ${requestBody.email} message: ${requestBody.message}`,
      );
    } catch (error) {
      console.error('<gateway-notification-service> Error:', {
        error,
      });
      throw new ExternalError('GatewayNotificationService');
    }
  };
}

export const gatewayNotificationService = new GatewayNotificationService();
