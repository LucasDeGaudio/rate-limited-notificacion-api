import { PostgresError } from '../../../src/errors/postgres-error';
import { TimeConfig } from '../../../src/interfaces/resources/configuration';
import { NotificationRequest } from '../../../src/interfaces/resources/notification';

export const notifyRequestBody: NotificationRequest = {
  type: 'News',
  email: 'test1@test.com',
  message: 'test message',
};

export const currentValueResultOK: TimeConfig = {
  minutes: 0,
  hours: 0,
  days: 0,
};

export const currentValueResultMinutesFail: TimeConfig = {
  minutes: 1,
  hours: 0,
  days: 0,
};

export const currentValueResultHoursFail: TimeConfig = {
  minutes: 0,
  hours: 5,
  days: 0,
};

export const currentValueResultDaysFail: TimeConfig = {
  minutes: 0,
  hours: 0,
  days: 10,
};

export const postgressError: PostgresError = new PostgresError(
  'fake message postgressError',
);
