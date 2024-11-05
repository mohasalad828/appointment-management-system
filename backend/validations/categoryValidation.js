const Joi = require("joi");

function categoryValidation(categoryObj) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
  });
  return schema.validate(categoryObj);
}

module.exports = categoryValidation;
                                                      