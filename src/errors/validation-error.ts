import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class ValidationError extends ApiError {
  static ERROR_CODE = 'VALIDATION_ERROR';
  constructor(name: string) {
    super(
      name,
      responseConstants.httpResponseCode.BAD_REQUEST,
      'Your request seems to be invalid',
      ValidationError.ERROR_CODE,
      responseConstants.statusMessage.INVALID_REQUEST,
    );
  }
}
