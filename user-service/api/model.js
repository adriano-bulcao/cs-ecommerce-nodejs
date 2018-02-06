const Joi = require('joi');

const schema = Joi.object().keys({
  _id: Joi.string(),
  email: Joi.string().email(),
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

exports.schema = schema;
