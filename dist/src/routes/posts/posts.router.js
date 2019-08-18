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

var _Posts = require('../../models/Posts');

var _Posts2 = _interopRequireDefault(_Posts);

require('@babel/polyfill');

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var route = function route() {
  var router = require('express-promise-router')();

  router.route('/paylas').post(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, post, who, tarihDuzenle, item, data, deger, newPost, _data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, post = _req$body.post, who = _req$body.who;

              tarihDuzenle = function tarihDuzenle(tarih) {
                var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
                var gün = tarih.getDate();
                var aySayi = tarih.getMonth();
                var yil = tarih.getFullYear();

                return gün + ' ' + aylar[aySayi] + ' ' + yil;
              };

              _context.next = 4;
              return _User2.default.findOne({ _id: who });

            case 4:
              item = _context.sent;
              _context.next = 7;
              return item.toJSON();

            case 7:
              data = _context.sent;
              deger = data.nickName;


              console.log("1111 " + item);

              console.log("brat" + deger);
              newPost = new _Posts2.default({
                post: post,
                who: deger,
                date: tarihDuzenle(new Date())

              });
              _context.prev = 12;
              _context.next = 15;
              return newPost.save();

            case 15:
              _data = _context.sent;

              res.json({ status: true, post: _data });
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](12);

              res.json({ status: false, error: _context.t0 });

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[12, 19]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.route('/sil').post(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var id;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.body.id;


              _Posts2.default.remove({ _id: id }, function (err, doc) {
                if (err) res.json({ status: false, error: err });else res.json({ status: true, post: doc });
              });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.route('/').get(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _Posts2.default.find(function (err, doc) {
                if (err) {
                  console.error(err);
                } else {
                  res.send(doc);
                }
              });

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  return router;
};

exports.default = {
  route: route,
  routePrefix: '/' + _config2.default.version + '/post'
};