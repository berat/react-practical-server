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

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var route = function route() {
  var router = new _express2.default.Router();

  router.route('/paylas').post(function (req, res) {
    var _req$body = req.body,
        post = _req$body.post,
        who = _req$body.who;


    var tarihDuzenle = function tarihDuzenle(tarih) {
      var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      var gün = tarih.getDate();
      var aySayi = tarih.getMonth();
      var yil = tarih.getFullYear();

      return gün + ' ' + aylar[aySayi] + ' ' + yil;
    };

    console.log("deneme 2 : " + who);

    var hangiKul = function hangiKul(who) {
      _User2.default.findOne({ _id: who }, function (err, doc) {
        if (err) {
          console.error(err);
        } else {
          console.log(doc);
          doc = doc.nickName;
          return doc;
        }
      });
    };

    var senkron = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return hangiKul(who);

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function senkron() {
        return _ref.apply(this, arguments);
      };
    }();

    console.log("deneme 3 : " + hangiKul(who));
    var newPost = new _Posts2.default({
      post: post,
      who: senkron,
      date: tarihDuzenle(new Date())
    });

    newPost.save().then(function (data) {
      res.send({ status: true, post: data });
    }, function (err) {
      res.send({ status: false, error: err });
    });

    res.send(post);
  });
  router.route('/').get(function (req, res) {
    _Posts2.default.find(function (err, doc) {
      if (err) {
        console.error(err);
      } else {
        res.send(doc);
      }
    });
  });

  return router;
};

exports.default = {
  route: route,
  routePrefix: '/' + _config2.default.version + '/post'
};