const express = require('express');
const router = express.Router();

const clientRouter = require('./clientRouter');
const associateRouter = require('./associateRouter');

router.use('/client', clientRouter);
router.use('/associate', associateRouter);

module.exports = router;
