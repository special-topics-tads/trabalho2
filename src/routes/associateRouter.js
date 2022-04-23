const express = require('express');
const associateRouter = express.Router();
const associateController = require('../controllers/associateController');
const validator = require('../middlewares/validateAssociate');
const auth = require("../middlewares/auth");

associateRouter.post("/authentication", validator, associateController.authentication);

associateRouter.post('/newAssociate', validator, associateController.newAssociate);
associateRouter.get('/listAll', auth, validator, associateController.listAll);
associateRouter.get('/searchAssociateByName', auth, validator, associateController.searchAssociateByName);
associateRouter.put('/updateAssociate/:_cnpj', auth, validator, associateController.updateAssociate);
associateRouter.delete('/deleteAssociate/:_cnpj', validator, associateController.deleteAssociate);

module.exports = associateRouter;