var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/cool', function(req, res, next) {
// 	res.send('This is so cooler than usual!')
// });

// router.get('/testing', function(req, res, next) {
// 	res.send('I am testing out another router. Hope it works!')
// });

// router.get('/more', function(req, res, next) {
// 	res.send('Again, we want to try out another router.')
// });

module.exports = router;
