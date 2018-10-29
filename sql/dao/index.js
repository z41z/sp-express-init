var mysql = require('mysql');
var $conf = require('../../config/mysql.config');
var $sql = require('../query/user');

// MySQL连接池
var pool = mysql.createPool($conf.config);
// 接口数据返回
var resturnData = function (res, ret, code = 200) {
  res.json({
    code: code,
    data: ret
  })
};

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      // 获取页面参数
      var param = req.body;

      // 增加
      if (connection) {
        connection.query($sql.insert, [param.name, param.age], function (err, result) {
          if (result) {
            result = '增加成功'
          } else {
            result = err.code
          }
          resturnData(res, result);
          // 释放连接 
          connection.release();
        });
      } else {
        resturnData(res, err.code, 500);
      }
    });
  },
  delete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function (err, connection) {
      var id = +req.body.id;
      if (connection) {
        connection.query($sql.delete, id, function (err, result) {
          if (result.affectedRows > 0) {
            result = '删除成功'
          } else {
            result = '删除失败'
          }
          resturnData(res, result);
          connection.release();
        });
      } else {
        resturnData(res, err.code, 500);
      }
    });
  },
  update: function (req, res, next) {
    // update by id
    var param = req.body;
    if (param.name == null || param.age == null || param.id == null) {
      resturnData(res, undefined);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection) {
        connection.query($sql.update, [param.name, param.age, +param.id], function (err, result) {
          // 使用页面进行跳转提示
          if (result.affectedRows > 0) {
            resturnData(res, '更新成功');
          } else {
            resturnData(res, '更新失败', 500);
          }
          connection.release();
        });
      } else {
        resturnData(res, err.code, 500);
      }
    });

  },
  queryById: function (req, res, next) {
    // id查用户
    var id = +req.query.id;
    pool.getConnection(function (err, connection) {
      if (connection) {
        connection.query($sql.queryById, id, function (err, result) {
          resturnData(res, result);
          connection.release();
        });
      } else {
        resturnData(res, err.code, 500);
      }
    });
  },
  query: function (req, res, next) {
    // 查询所有用户
    pool.getConnection(function (err, connection) {
      if (connection) {
        connection.query($sql.query, function (err, result) {
          resturnData(res, result);
          connection.release();
        });
      } else {
        resturnData(res, err.code, 500);
      }
    });
  }
};