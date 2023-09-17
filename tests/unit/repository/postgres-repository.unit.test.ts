import {
  notifyRequestBody,
  currentValue,
  currentValueResult,
  errorRepository,
} from '../../mocks/repository/postgres-repository';
import { postgresRepository } from '../../../src/repository/postgres-repository';
import { postgresDb } from '../../../src/config/database/postgres';
import { PostgresError } from '../../../src/errors/postgres-error';

describe('postgres-repository suite test', () => {
  test('When getCurrentValueByTypeAndEmail returns valid data', async () => {
    const executeSpy = jest
      .spyOn(postgresDb, 'execute')
      .mockResolvedValue(currentValue);

    const result = await postgresRepository.getCurrentValueByTypeAndEmail(
      notifyRequestBody.type,
      notifyRequestBody.email,
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(currentValueResult);
  });

  test('When getCurrentValueByTypeAndEmail fails', async () => {
    const executeSpy = jest
      .spyOn(postgresDb, 'execute')
      .mockRejectedValue(errorRepository);

    try {
      await postgresRepository.getCurrentValueByTypeAndEmail(
        notifyRequestBody.type,
        notifyRequestBody.email,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(PostgresError);
      expect(error.name).toBe('getCurrentValue');
      expect(executeSpy).toHaveBeenCalledTimes(1);
    }
  });

  test('When addHistory runs ok', async () => {
    const executeSpy = jest
      .spyOn(postgresDb, 'execute')
      .mockImplementation(jest.fn());

    const result = await postgresRepository.addHistory(
      notifyRequestBody.type,
      notifyRequestBody.email,
    );
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  test('When addHistory fails', async () => {
    const executeSpy = jest
      .spyOn(postgresDb, 'execute')
      .mockRejectedValue(errorRepository);

    try {
      await postgresRepository.addHistory(
        notifyRequestBody.type,
        notifyRequestBody.email,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(PostgresError);
      expect(error.name).toBe('addHistory');
      expect(executeSpy).toHaveBeenCalledTimes(1);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
