const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(26).required(),
    email: Joi.string().min(6).max(64).required().email(),
    birthdate: Joi.string().required(),
    sex: Joi.string().min(9).max(12).required(),
    phone: Joi.string().min(10).max(12).required(),
    statusType: Joi.string().required(),
    password: Joi.string().min(6).max(128).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(64).required().email(),
    password: Joi.string().min(6).max(128).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
