const associateSchema = require('../schemas/associateSchema');

const validateRequest = (req, res, next) => {
  if (req.route.path === '/newAssociate' || req.route.path === '/updateAssociate') {
    const { error } = associateSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details });
  }

  if (
    (req.route.path === '/searchAssociateByName' ||
      req.route.path === '/updateAssociate' ||
      req.route.path === '/deleteAssociate') &&
    !req.params.id
  )
    return res.status(422).json({ error: 'ID inválido!' });

  next();
};

module.exports = validateRequest;
