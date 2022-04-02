const clientSchema = require('../schemas/clientSchema');

const validateRequest = (req, res, next) => {
  if (req.route.path === '/newClient' || req.route.path === '/updateClient') {
    const { error } = clientSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details });
  }

  if (
    (req.route.path === '/searchClientById' ||
      req.route.path === '/updateClient' ||
      req.route.path === '/deleteClient') &&
    !req.params.id
  )
    return res.status(422).json({ error: 'ID inválido!' });

  next();
};

module.exports = validateRequest;
