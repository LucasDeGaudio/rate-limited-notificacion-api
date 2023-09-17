import { NotificationRequest } from '../../../src/interfaces/resources/notification';

export const notifyRequestBody: NotificationRequest = {
  type: 'News',
  email: 'test1@test.com',
  message: 'test message',
};

export const errorNotifyProcessService: Error = new Error(
  'fake message errorNotifyProcessService',
);
