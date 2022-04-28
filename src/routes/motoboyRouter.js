const express = require('express');
const motoboyRouter = express.Router();
const motoboyController = require('../controllers/motoboyController');
const validator = require('../middlewares/validateMotoboy');


motoboyRouter.post('/newMotoboy', validator, motoboyController.newMotoboy);
motoboyRouter.get('/listAll', validator, motoboyController.listAll);
motoboyRouter.get('/searchMotoboyById/:id', validator, motoboyController.searchMotoboyById);
motoboyRouter.get('/searchMotoboyByCPF', validator, motoboyController.searchMotoboyByCPF);
motoboyRouter.delete('/deleteMotoboy/:id', validator, motoboyController.deleteMotoboy);

module.exports = motoboyRouter;
