var express = require('express');
var router = express.Router();

/* GET userList API. */
router.get('/', function (req, res, next) {
  res.send({
    "name": "admin"
  });
});

module.exports = router;