const express = require('express');
const router = express.Router();
const openCors = require('../middleware/openCors');

router.use(openCors);
router.use('/manufacturers', require('./manufacturers'));
router.use('/models', require('./models'));
router.use('/api-docs', require('./swagger'));
// router.use(
//   '/',
//   (docData = (req, res) => {
//     let docData = {
//       documentationURL: 'https://cse341-node-br28.onrender.com-api-docs',
//     };
//     res.send(docData);
//   })
// );

module.exports = router;
