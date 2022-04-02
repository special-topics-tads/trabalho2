const Joi = require('joi');

const clientSchema = Joi.object().keys({
  id: Joi.number().integer(),
  company: Joi.string().required(),
  cnpj: Joi.string()
    .min(8)
    .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/i) // XX.XXX.XXX/XXXX-XX
    .required(),
  address: Joi.string().required(),
});

module.exports = clientSchema;
