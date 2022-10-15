const mongodb = require('../database/connect');
const dotenv = require('dotenv');
dotenv.config();
const ObjectId = require('mongodb').ObjectId;
const database_name = process.env.DB_NAME;

const getAllModels = async (req, res, next) => {
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleModels')
    .find();
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents);
    }
  });
};

const getSingleModel = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleModels')
    .find({ _id: userId });
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents[0]);
    }
  });
};

const createModel = async (req, res) => {
  const document = {
    name: req.body.name,
    bodyStyle: req.body.bodyStyle,
    price: req.body.price,
    zeroToSixty: req.body.zeroToSixty,
    rating: req.body.rating,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleModels')
    .insertOne(document);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || 'An error ocurred during model creation.');
  }
};

const updateModel = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const model = {
    name: req.body.name,
    bodyStyle: req.body.bodyStyle,
    price: req.body.price,
    zeroToSixty: req.body.zeroToSixty,
    rating: req.body.rating,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleModels')
    .replaceOne({ _id: userId }, model);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'An error ocurred during the model update.'
      );
  }
};

const deleteModel = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('VehicleModels')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error ocurred during model deletion.');
  }
};

module.exports = {
  getAllModels,
  getSingleModel,
  createModel,
  updateModel,
  deleteModel,
};
