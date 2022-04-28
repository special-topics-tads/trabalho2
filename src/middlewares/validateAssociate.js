const associateSchema = require('../schemas/associateSchema');

const validateRequest = (req, res, next) => {
  if (req.route.path === '/newAssociate') {
    const { error } = associateSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details });
  }

  if (
    (req.route.path === '/deleteAssociate') &&
    !req.body.cnpj
  )
    return res.status(422).json({ error: 'CNPJ inválido!' });

  if (
      (req.route.path === '/updateAssociate') &&
      !req.body._cnpjUpdate
    )
      return res.status(422).json({ error: 'CNPJ inválido!' });

  next();
};

module.exports = validateRequest;
