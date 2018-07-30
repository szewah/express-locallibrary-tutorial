var express = require('express');
var router = express.Router();

function handleRoot(req, res, next) {
	res.redirect('/catalog');	
}

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.redirect('/catalog');
// });
router.get('/', handleRoot)

module.exports = router;
