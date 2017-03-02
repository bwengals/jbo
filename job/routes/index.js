var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
	    var1: 'peoples',
		var2: 'stuff',
	  });
	});

module.exports = router;
