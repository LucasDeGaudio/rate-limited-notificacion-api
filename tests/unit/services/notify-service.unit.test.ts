import {
  notifyRequestBody,
  currentValueResultOK,
  currentValueResultMinutesFail,
  currentValueResultHoursFail,
  currentValueResultDaysFail,
  postgressError,
} from '../../mocks/services/notify-service';
import { postgresRepository } from '../../../src/repository/postgres-repository';
import { notifyService } from '../../../src/services/notify-service';
import { gatewayNotificationService } from '../../../src/services/gateway-notification-service';
import { PostgresError } from '../../../src/errors/postgres-error';

describe('notify-service suite test', () => {
  test('When user is allowed and send notification OK', async () => {
    const getCurrentValueByTypeAndEmailSpy = jest
      .spyOn(postgresRepository, 'getCurrentValueByTypeAndEmail')
      .mockResolvedValue(currentValueResultOK);

    const sendSpy = jest
      .spyOn(gatewayNotificationService, 'send')
      .mockImplementation(jest.fn());

    const addHistorySpy = jest
      .spyOn(postgresRepository, 'addHistory')
      .mockImplementation(jest.fn());

    const result = await notifyService.process(notifyRequestBody);
    expect(getCurrentValueByTypeAndEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(addHistorySpy).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(true);
  });

  test('When user is not allowed because of minutes configuration', async () => {
    const getCurrentValueByTypeAndEmailSpy = jest
      .spyOn(postgresRepository, 'getCurrentValueByTypeAndEmail')
      .mockResolvedValue(currentValueResultMinutesFail);

    const sendSpy = jest
      .spyOn(gatewayNotificationService, 'send')
      .mockImplementation(jest.fn());

    const addHistorySpy = jest
      .spyOn(postgresRepository, 'addHistory')
      .mockImplementation(jest.fn());

    const result = await notifyService.process(notifyRequestBody);
    expect(getCurrentValueByTypeAndEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledTimes(0);
    expect(addHistorySpy).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(false);
  });

  test('When user is not allowed because of hours configuration', async () => {
    const getCurrentValueByTypeAndEmailSpy = jest
      .spyOn(postgresRepository, 'getCurrentValueByTypeAndEmail')
      .mockResolvedValue(currentValueResultHoursFail);

    const sendSpy = jest
      .spyOn(gatewayNotificationService, 'send')
      .mockImplementation(jest.fn());

    const addHistorySpy = jest
      .spyOn(postgresRepository, 'addHistory')
      .mockImplementation(jest.fn());

    const result = await notifyService.process(notifyRequestBody);
    expect(getCurrentValueByTypeAndEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledTimes(0);
    expect(addHistorySpy).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(false);
  });

  test('When user is not allowed because of days configuration', async () => {
    const getCurrentValueByTypeAndEmailSpy = jest
      .spyOn(postgresRepository, 'getCurrentValueByTypeAndEmail')
      .mockResolvedValue(currentValueResultDaysFail);

    const sendSpy = jest
      .spyOn(gatewayNotificationService, 'send')
      .mockImplementation(jest.fn());

    const addHistorySpy = jest
      .spyOn(postgresRepository, 'addHistory')
      .mockImplementation(jest.fn());

    const result = await notifyService.process(notifyRequestBody);
    expect(getCurrentValueByTypeAndEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledTimes(0);
    expect(addHistorySpy).toHaveBeenCalledTimes(0);
    expect(result).toStrictEqual(false);
  });

  test('When repository Fails should throw an error', async () => {
    const getCurrentValueByTypeAndEmailSpy = jest
      .spyOn(postgresRepository, 'getCurrentValueByTypeAndEmail')
      .mockRejectedValue(postgressError);

    const sendSpy = jest
      .spyOn(gatewayNotificationService, 'send')
      .mockImplementation(jest.fn());

    const addHistorySpy = jest
      .spyOn(postgresRepository, 'addHistory')
      .mockImplementation(jest.fn());

    try {
      await notifyService.process(notifyRequestBody);
    } catch (error) {
      expect(error).toBeInstanceOf(PostgresError);
      expect(getCurrentValueByTypeAndEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledTimes(0);
      expect(addHistorySpy).toHaveBeenCalledTimes(0);
    }
  });

  // test('When addHistory fails', async () => {
  //   const executeSpy = jest
  //     .spyOn(postgresDb, 'execute')
  //     .mockRejectedValue(errorRepository);

  //   try {
  //     await postgresRepository.addHistory(
  //       notifyRequestBody.type,
  //       notifyRequestBody.email,
  //     );
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(PostgresError);
  //     expect(error.name).toBe('addHistory');
  //     expect(executeSpy).toHaveBeenCalledTimes(1);
  //   }
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
