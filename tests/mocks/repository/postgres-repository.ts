import { TimeConfig } from '../../../src/interfaces/resources/configuration';
import { NotificationRequest } from '../../../src/interfaces/resources/notification';

export const notifyRequestBody: NotificationRequest = {
  type: 'News',
  email: 'test1@test.com',
  message: 'test message',
};

export const currentValue: any[] = [
  { count: '0' },
  { count: '0' },
  { count: '0' },
];

export const currentValueResult: TimeConfig = {
  minutes: 0,
  hours: 0,
  days: 0,
};

export const errorRepository: Error = new Error('fake message errorRepository');
