var express = require('express');
var webController = require('../controllers/webController');
var router = express.Router();

/* GET users listing. */
router.post('/create', webController);


module.exports = router;
