const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const manufacturersController = require('../controllers/manufacturers');

router.get('/', manufacturersController.getAllManufacturers);

router.get('/:id', manufacturersController.getSingleManufacturer);

router.post(
  '/',
  validation.manufacturerValidation,
  manufacturersController.createManufacturer
);

router.put(
  '/:id',
  validation.manufacturerValidation,
  manufacturersController.updateManufacturer
);

router.delete('/:id', manufacturersController.deleteManufacturer);

module.exports = router;
