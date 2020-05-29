// @ts-ignore
import Joi from '@hapi/joi';

export const addUserValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().required().error((err: any) => {
      err.forEach((er: any) => {
        switch(er.code) {
          case 'any.required':
            er.message = 'Name is required';
            break;
          case 'string.empty':
            er.message = 'Name must not be empty';
            break;
        }
      });
      return err;
    }),
    email: Joi.string().email().required().error((err: any)  => {
      err.forEach((er: any) => {
        switch(er.code) {
          case 'any.required':
            er.message = 'Email is required';
            break;
          case 'string.empty':
            er.message = 'Email must not be empty';
            break;
          case 'string.email':
            er.message = 'Please enter a valid email.';
            break;
        }
      });
      return err;
    }),
    age: Joi.number().integer().min(18).required().error((err: any)  => {
      err.forEach((er: any) => {
        switch(er.code) {
          case 'any.required':
            er.message = 'Age is required';
            break;
          case "number.base":
            er.message = "Age must be a number.";
            break;
          case "number.min":
            er.message = "Your age must be at least 18.";
            break;
        }
      });
      return err;
    })
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors: any = {};
    error.details.forEach((detail: any) => {
      errors[detail.path[0]] = detail.message;
    });
    res.status(400).json({status: 'validation_error', errors});
  } else {
    next();
  }
};