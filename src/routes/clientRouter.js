const express = require('express');
const clientRouter = express.Router();
const clienteController = require('../controllers/clienteController');
const validator = require('../middlewares/validateClient');

clientRouter.post('/newClient', validator, clienteController.newClient);
clientRouter.get('/listAll', validator, clienteController.listAll);
clientRouter.get('/searchClientById/:id', validator, clienteController.searchClientById);
clientRouter.put('/updateClient/:id', validator, clienteController.updateClient);
clientRouter.put('/deleteClient/:id', validator, clienteController.deleteClient);

module.exports = clientRouter;
