const mongodb = require('../database/connect');
const dotenv = require('dotenv');
dotenv.config();
const ObjectId = require('mongodb').ObjectId;
const database_name = process.env.DB_NAME;

const getAllManufacturers = async (req, res, next) => {
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleManufacturers')
    .find();
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents);
    }
  });
};

const getSingleManufacturer = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleManufacturers')
    .find({ _id: userId });
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents[0]);
    }
  });
};

const createManufacturer = async (req, res) => {
  const document = {
    name: req.body.name,
    founded: req.body.founded,
    president: req.body.president,
    origin: req.body.origin,
    stockSymbol: req.body.stockSymbol,
    revenue: req.body.revenue,
    productionPerYear: req.body.productionPerYear,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleManufacturers')
    .insertOne(document);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || 'An error ocurred during manufacturer creation.');
  }
};

const updateManufacturer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const manufacturer = {
    name: req.body.name,
    founded: req.body.founded,
    president: req.body.president,
    origin: req.body.origin,
    stockSymbol: req.body.stockSymbol,
    revenue: req.body.revenue,
    productionPerYear: req.body.productionPerYear,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleManufacturers')
    .replaceOne({ _id: userId }, manufacturer);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error ocurred during the manufacturer update.');
  }
};

const deleteManufacturer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleManufacturers')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error ocurred during manufacturer deletion.');
  }
};

module.exports = {
  getAllManufacturers,
  getSingleManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};
