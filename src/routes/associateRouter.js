const express = require('express');
const associateRouter = express.Router();
const associateController = require('../controllers/associateController');
const validator = require('../middlewares/validateAssociate');
const auth = require("../middlewares/auth");

associateRouter.post("/authentication", validator, associateController.authentication);

associateRouter.post('/newAssociate', validator, associateController.newAssociate);
associateRouter.get('/listAll', validator, associateController.listAll);
associateRouter.post('/searchAssociateByName', validator, associateController.searchAssociateByName);
associateRouter.put('/updateAssociate', validator, associateController.updateAssociate);
associateRouter.delete('/deleteAssociate', validator, associateController.deleteAssociate);

module.exports = associateRouter;