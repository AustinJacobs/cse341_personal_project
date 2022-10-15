const express = require('express');
const router = express.Router();

const manufacturersController = require('../controllers/manufacturers');

router.get('/', manufacturersController.getAllManufacturers);

router.get('/:id', manufacturersController.getSingleManufacturer);

router.post('/', manufacturersController.createManufacturer);

router.put('/:id', manufacturersController.updateManufacturer);

router.delete('/:id', manufacturersController.deleteManufacturer);

module.exports = router;
