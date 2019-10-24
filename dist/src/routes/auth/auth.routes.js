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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

  router.route('/kontrol').post(function (req, res) {
    var username = req.body.username;


    var find = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User2.default.findOne({ nickName: username });

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function find(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    find(username).then(function (user) {
      if (user) res.json({ status: true, data: user });else res.json({ status: false });
    }).catch(function (err) {
      return res.json({ status: false, error: err });
    });
  });

  router.route('/kayit-ol').post(function (req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        email = _req$body2.email,
        password = _req$body2.password;

    var passwordHashed = _crypto2.default.createHmac('sha256', _config2.default.jwtSecret).update(password).digest('hex');

    var newUser = new _User2.default({
      nickName: username,
      email: email,
      password: passwordHashed,
      date: new Date()
    });

    newUser.validate(function (err, asd) {
      console.log("err", err);
      console.log("asd", asd);
    });

    var find = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User2.default.findOne({ email: email });

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function find(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    find(email).then(function (user) {
      console.log(user);
      if (user === null) {
        var findUsername = function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _User2.default.findOne({ nickName: username });

                  case 2:
                    return _context3.abrupt('return', _context3.sent);

                  case 3:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined);
          }));

          return function findUsername(_x3) {
            return _ref3.apply(this, arguments);
          };
        }();
        findUsername(username).then(function (user) {
          if (user === null) {
            newUser.save().then(function (data) {
              res.send({ status: true, user: data });
            });
          } else {
            res.send({ status: false, msg: "Username already exists" });
          }
        });
      } else {
        res.send({ status: false, msg: "E-mai already exists" });
      }
    }).catch(function (err) {
      console.log(err);
    });
  });

  return router;
};

exports.default = {
  route: route,
  routePrefix: '/' + _config2.default.version + '/auth'
};