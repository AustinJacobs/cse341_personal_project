const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    next();
  })
  .use('/', require('./routes'));

mongodb.connectDb((e, mongodb) => {
  if (e) {
    console.log(e);
  } else {
    app.listen(port);
    console.log(`App running on http://localhost:${port}`);
  }
});
