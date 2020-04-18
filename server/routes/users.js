var express = require('express');
var router = express.Router();
let models = require('../models');

// DB Setting
const User = models.user;
const Op = models.sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;