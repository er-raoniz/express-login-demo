var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (request, response, next) {
    response.send("Express");
});

module.exports = router;
