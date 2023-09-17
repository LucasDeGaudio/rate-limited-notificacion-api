import { configurationConstants } from '../constants/configuration';
import { TimeConfig } from '../interfaces/resources/configuration';
import { NotificationRequest } from '../interfaces/resources/notification';
import { postgresRepository } from '../repository/postgres-repository';
import { gatewayNotificationService } from './gateway-notification-service';

class NotifyService {
  public process = async (
    requestBody: NotificationRequest,
  ): Promise<boolean> => {
    try {
      const allowedConfig: TimeConfig =
        configurationConstants[requestBody.type];

      const currentValues: TimeConfig =
        await postgresRepository.getCurrentValueByTypeAndEmail(
          requestBody.type,
          requestBody.email,
        );

      console.info('allowedConfig: ', allowedConfig);
      console.info('currentValues: ', currentValues);

      if (
        currentValues.minutes < allowedConfig.minutes &&
        currentValues.hours < allowedConfig.hours &&
        currentValues.days < allowedConfig.days
      ) {
        gatewayNotificationService.send(requestBody);
        await postgresRepository.addHistory(
          requestBody.type,
          requestBody.email,
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('<notify-service> Error:', {
        error,
      });
      throw error;
    }
  };
}

export const notifyService = new NotifyService();
