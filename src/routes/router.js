const express = require('express');
const router = express.Router();

const clientRouter = require('./clientRouter');

router.use('/client', clientRouter);

module.exports = router;
