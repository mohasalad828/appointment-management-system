const Joi = require("joi");

function userValidation(userObj) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid("male", "female").required(),
    phone: Joi.number().required(),
    role: Joi.string(),
  });
  return schema.validate(userObj);
}

module.exports = userValidation;
