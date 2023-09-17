import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class PostgresError extends ApiError {
  static ERROR_CODE = 'POSTGRES_ERROR';
  constructor(name: string) {
    super(
      name,
      responseConstants.httpResponseCode.INTERNAL_ERROR,
      'Postgres Fails',
      PostgresError.ERROR_CODE,
      responseConstants.statusMessage.ERROR,
    );
  }
}
