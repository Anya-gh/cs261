var express = require('express');
var router = express.Router();

/* GET users listing. */
// default route, won't be using this in final product
// use this for testing
router.get('/', function(req, res, next) {

  let dataArray = [
    { id: 1, name: "a" },
    { id: 2, name: "b"}
  ];

  res.json({
    data: dataArray
  });
});

module.exports = router;
