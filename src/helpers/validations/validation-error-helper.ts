import Joi from 'joi';
import { ErrorValidationField } from '../../interfaces/validation/validation';

const handleValidationErrors = (
  errors: Joi.ErrorReport[],
  errorName: string,
): void => {
  const invalidFields: ErrorValidationField[] = errors.map((element) => {
    return {
      key: element.path.join('->'),
      value: element.value,
    };
  });
  console.error(`<${errorName}> Error validating fields:`, invalidFields);
};

export { handleValidationErrors };
