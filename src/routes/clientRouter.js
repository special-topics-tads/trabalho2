const express = require('express');
const clientRouter = express.Router();
const clienteController = require('../controllers/clientsController');
const validator = require('../middlewares/validateClient');

clientRouter.post('/newClient', validator, clienteController.newClient);
clientRouter.get('/listAll', validator, clienteController.listAll);
clientRouter.get('/searchClientById/:id', validator, clienteController.searchClientById);
clientRouter.get('/searchClientByCNPJ', validator, clienteController.searchClientByCNPJ);
clientRouter.put('/updateClient/:id', validator, clienteController.updateClient);
clientRouter.delete('/deleteClient/:id', validator, clienteController.deleteClient);

module.exports = clientRouter;
