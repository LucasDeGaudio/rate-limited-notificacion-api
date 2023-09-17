import * as Joi from 'joi';
import { ValidationError } from '../errors/validation-error';
import { handleValidationErrors } from '../helpers/validations/validation-error-helper';

export const postNotifyValidator = Joi.object()
  .keys({
    type: Joi.string()
      .valid('News', 'Update', 'Status', 'Marketing')
      .required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  })
  .error((errors) => {
    const errorName = 'postNotifyValidator';
    handleValidationErrors(errors, errorName);
    throw new ValidationError(errorName);
  });
