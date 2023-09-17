import { postgresDb } from '../../../../src/config/database/postgres';

jest.mock('pg', () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn(),
  };
  return {
    Client: jest.fn(() => mockClient),
  };
});

describe('postgres suite test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize postgres client and connect it successfully', async () => {
    await postgresDb.initializeClient();
    expect(postgresDb['client'].connect).toHaveBeenCalled();
    expect(postgresDb['client'].connect).toHaveBeenCalledTimes(1);
  });

  test('should execute query successfully', async () => {
    const query = 'SELECT * FROM test_table';
    const mockResult = {
      rows: [{ id: 1, name: 'Test' }],
    };

    postgresDb['client'].query.mockResolvedValueOnce(mockResult);

    await postgresDb.initializeClient();
    const result = await postgresDb.execute(query);

    expect(postgresDb['client'].query).toHaveBeenCalledTimes(1);
    expect(postgresDb['client'].query).toHaveBeenCalledWith(query, undefined);
    expect(result).toEqual(mockResult.rows);
  });

  test('should perform initial configuration', async () => {
    await postgresDb.initializeClient();
    await postgresDb.initialConfiguration();
    expect(postgresDb['client'].query).toHaveBeenCalledTimes(1);
  });

  test('should handle errors when executing a query', async () => {
    await postgresDb.initializeClient();
    const query = 'SELECT * FROM test_table';
    const errorMessage = 'Error executing query';
    postgresDb['client'].query.mockRejectedValueOnce(new Error(errorMessage));
    await expect(postgresDb.execute(query)).rejects.toThrowError(
      'Postgres Fails',
    );
  });
});
