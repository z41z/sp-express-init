var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('../config/site.config');
/* GET users listing. */
router.get('/', function (req, res, next) {
  axios.get(`${config.SITE_ROOT}/api/users`).then(r => {
    res.render('users', {
      title: 'users list',
      data: r.data.data
    });
  })
});

module.exports = router;