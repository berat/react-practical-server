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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var deneme = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(who) {
          var item, data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _User2.default.findOne({ _id: who });

                case 2:
                  item = _context.sent;
                  _context.next = 5;
                  return item.toJSON();

                case 5:
                  data = _context.sent;

                  console.log("item : " + item);
                  console.log("item adi : " + item.nickName);
                  a = item;
                  console.log("a degeri : " + a);
                  console.log("data " + data);
                  return _context.abrupt('return', item);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function deneme(_x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      var _req$body, post, who, tarihDuzenle, a, deger, newPost;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, post = _req$body.post, who = _req$body.who;

              tarihDuzenle = function tarihDuzenle(tarih) {
                var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
                var gün = tarih.getDate();
                var aySayi = tarih.getMonth();
                var yil = tarih.getFullYear();

                return gün + ' ' + aylar[aySayi] + ' ' + yil;
              };

              console.log("deneme 2 : " + who);

              console.log("11111111");

              a = [];


              console.log("a cıkıs degeri" + a);

              deger = deneme(who).then(function (x) {
                return x.nickName;
              });

              // var deneme = Users.findOne();
              // console.log(deneme)

              // var sonuc = null;
              // console.log("333333333");
              // Users.findOne({_id: who}, (err, item) => {
              //   sonuc = item;
              // })
              // console.log(sonuc);


              // console.log("22222222");
              // console.log(Users.findOne({_id: who}, (err, item) => {
              //   return item
              // }))


              // let kimmis = Users.findOne({ _id: who }, function (err, doc) {
              //   console.log(doc);
              // });
              // console.log(kimmis)

              newPost = new _Posts2.default({
                post: post,
                who: deger,
                date: tarihDuzenle(new Date())

              });


              newPost.save().then(function (data) {
                res.send({ status: true, post: data });
              }, function (err) {
                res.send({ status: false, error: err });
              });

              res.send(post);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
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

    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());

  return router;
};

exports.default = {
  route: route,
  routePrefix: '/' + _config2.default.version + '/post'
};