'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = function route() {
  var router = new _express2.default.Router();

  router.route('/').get(function (req, res) {
    _User2.default.find(function (err, doc) {
      if (err) {
        console.error(err);
      } else {
        res.send(doc);
      }
    });
  });

  router.route('/giris-yap').post(function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;


    _User2.default.findOne({ email: email }).then(function (user) {
      if (!user) {
        res.send({ status: false, message: 'boyle mail yok' });
      } else {
        if (user.password === _crypto2.default.createHmac('sha256', _config2.default.jwtSecret).update(password).digest('hex')) {
          var token = _jsonwebtoken2.default.sign({ userid: user._id }, _config2.default.jwtSecret);
          res.send({ status: true, token: token });
        } else {
          res.send({ status: false, message: 'hatali sifre' });
        }
      }
      res.send("ok");
    });
  });

  router.route('/kayit-ol').post(function (req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password,
        nickName = _req$body2.nickName;

    var passwordHashed = _crypto2.default.createHmac('sha256', _config2.default.jwtSecret).update(password).digest('hex');

    var newUser = new _User2.default({
      nickName: nickName,
      email: email,
      password: passwordHashed,
      date: new Date()
    });

    newUser.save().then(function (data) {
      res.send({ status: true, user: data });
    }, function (err) {
      res.send({ status: false, error: err });
    });

    res.send(passwordHashed);
  });

  return router;
};

exports.default = {
  route: route,
  routePrefix: '/' + _config2.default.version + '/auth'
};