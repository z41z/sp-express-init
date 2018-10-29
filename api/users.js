var express = require('express');
var router = express.Router();
var userDao = require('../sql/dao/index');

/* Users API. */

// Get all users
router.get('/', function (req, res, next) {
  userDao.query(req, res, next);
});

// Get user info by id
router.get('/getUserInfoById', function (req, res, next) {
  userDao.queryById(req, res, next);
});

//add user
router.post('/add', function (req, res, next) {
  userDao.add(req, res, next);
});

// update user info
router.post('/update', function (req, res, next) {
  userDao.update(req, res, next);
});

// delete user
router.post('/delete', function (req, res, next) {
  userDao.delete(req, res, next);
});

module.exports = router;