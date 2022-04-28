const motoboySchema = require('../schemas/motoboySchema');

const validateRequest = (req, res, next) => {
  if (req.route.path === '/newMotoboy') {
    const { error } = motoboySchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details });
  }

  if (
    (req.route.path === '/searchMotoboyById' ||
      req.route.path === '/deleteMotoboy') &&
    !req.params.id
  )
    return res.status(422).json({ error: 'ID inválido!' });

  next();
};

module.exports = validateRequest;
