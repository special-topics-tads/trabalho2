const Joi = require('joi');

const motoboySchema = Joi.object().keys({
  id: Joi.number().integer(),
  nome: Joi.string().required(),
  telefone: Joi.string().required(),
  password: Joi.string().required(),
  cpf: Joi.string()
    .min(11)
    .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i) //    xxx.xxx.xxx.-xx
    .required()
});

module.exports = motoboySchema;
