import Joi from 'joi';
import { handleValidationErrors } from '../../../../src/helpers/validations/validation-error-helper';

describe('validation-error-helper suite test', () => {
  test('Should create joi report with errors', () => {
    const errorReport: Joi.ErrorReport[] = [
      {
        message: 'some error',
        path: ['field1'],
        type: 'any.required',
        context: {},
      },
    ];
    const expectedOutput = [{ key: 'field1', value: undefined }];

    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    handleValidationErrors(errorReport, 'ValidationError');
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith(
      `<ValidationError> Error validating fields:`,
      expectedOutput,
    );
  });
});
