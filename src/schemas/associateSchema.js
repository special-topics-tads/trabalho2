const Joi = require('joi');

const associateSchema = Joi.object().keys({
    company: Joi.string().required(),
    cnpj: Joi.string().required(),
    address: Joi.string(),
    password: Joi.string().min(8)
        .pattern(/^([\d]+[a-z]|[a-z]+[\d])[\da-z]*$/i)
        .required(),
});

module.exports = associateSchema;
