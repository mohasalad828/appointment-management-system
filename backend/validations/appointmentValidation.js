const Joi = require("joi");

const appointmentValidation = (data) => {
  const schema = Joi.object({
    categoryId: Joi.string().required(),
    title: Joi.string().required(),
    duration: Joi.number().valid(15, 30, 60, 120).required(),
    availability: Joi.string()
      .valid("availableNow", "dateRange")
      .required(),
    startDate: Joi.date().required(),
    endDate: Joi.alternatives().conditional("availability", {
      is: "dateRange",
      then: Joi.date().required(),
      otherwise: Joi.allow(null),
    }),
    status: Joi.string()
      .valid("Pending", "Process", "Cancelled", "Completed")
      .optional(),
  });

  return schema.validate(data);
};

module.exports = appointmentValidation;
