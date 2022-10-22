const validator = require('../validation/validate');

const manufacturerValidation = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    president: 'required|string',
    origin: 'required|string',
    stockSymbol: 'required|string',
    revenue: 'required|string',
    productionPerYear: 'required|string',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message:
          'All fields are required. All fields require you to enter a string of text.',
        data: err,
      });
    } else {
      next();
    }
  });
};

const modelValidation = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    bodyStyle: 'required|string',
    price: 'required|string',
    zeroToSixty: 'required|string',
    rating: 'required|string',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message:
          'All fields are required. All fields require you to enter a string of text.',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  manufacturerValidation,
  modelValidation,
};
