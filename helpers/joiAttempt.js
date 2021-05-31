const joi = require('joi');

const joiAttempt = (params, schema) => {
  return joi.attempt(params, joi.object(schema));
}

module.exports = joiAttempt;
