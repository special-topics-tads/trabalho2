const clientSchema = require('../schemas/clientSchema');

const validateRequest = (req, res, next) => {
  if (
    (req.route.path === '/newClient' || req.route.path === '/updateClient') &&
    (!req.body.company || !req.body.cnpj || !req.body.address)
  )
    return res.status(422).json({ error: 'Campos obrigatórios não preenchidos! ' });

  if (
    (req.route.path === '/searchClientById' ||
      req.route.path === '/updateClient' ||
      req.route.path === '/deleteClient') &&
    !req.params.id
  )
    return res.status(422).json({ error: 'ID inválido!' });

  const { error } = clientSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });

  next();
};

module.exports = validateRequest;
