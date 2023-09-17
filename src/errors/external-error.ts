import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class ExternalError extends ApiError {
  static ERROR_CODE = 'EXTERNAL_ERROR';
  constructor(name: string) {
    super(
      name,
      responseConstants.httpResponseCode.INTERNAL_ERROR,
      'External resource fails',
      ExternalError.ERROR_CODE,
      responseConstants.statusMessage.ERROR,
    );
  }
}
