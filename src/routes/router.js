const express = require('express');
const router = express.Router();

const clientRouter = require('./clientRouter');
const associateRouter = require('./associateRouter');
const motoboyRouter = require('./motoboyRouter');

router.use('/client', clientRouter);
router.use('/associate', associateRouter);
router.use('/motoboy', motoboyRouter);

module.exports = router;
