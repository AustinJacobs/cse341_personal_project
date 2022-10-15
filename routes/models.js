const express = require('express');
const router = express.Router();

const modelsController = require('../controllers/models');

router.get('/', modelsController.getAllModels);

router.get('/:id', modelsController.getSingleModel);

router.post('/', modelsController.createModel);

router.put('/:id', modelsController.updateModel);

router.delete('/:id', modelsController.deleteModel);

module.exports = router;
