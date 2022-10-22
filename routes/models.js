const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const modelsController = require('../controllers/models');

router.get('/', modelsController.getAllModels);

router.get('/:id', modelsController.getSingleModel);

router.post('/', validation.modelValidation, modelsController.createModel);

router.put('/:id', validation.modelValidation, modelsController.updateModel);

router.delete('/:id', modelsController.deleteModel);

module.exports = router;
