const Joi = require("joi");

function loginValidation(userObj) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(userObj);
}

module.exports = loginValidation;
