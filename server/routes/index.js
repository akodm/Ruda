var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', Wel : 'Welcome to ' });
});

router.get('/test', function(req, res, next) {
  res.render('index', { title: 'TEST PAGE - PM2', Wel : 'This is ' });
});

module.exports = router;
