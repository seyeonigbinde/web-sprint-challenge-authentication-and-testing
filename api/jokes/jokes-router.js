// do not make changes to this file
const router = require('express').Router();
const restricted = require('../middleware/restricted');
const jokes = require('./jokes-data');

router.get('/', restricted, (req, res, next) => {
  res.status(200).json(jokes);
});

module.exports = router;
