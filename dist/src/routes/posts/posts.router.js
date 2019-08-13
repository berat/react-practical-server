'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Posts = require('models/Posts');

var _Posts2 = _interopRequireDefault(_Posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = function route() {
  var router = new _express2.default.Router();

  router.route('/paylas').post(function (req, res) {
    var post = req.body.post;


    var tarihDuzenle = function tarihDuzenle(tarih) {
      var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      var gün = tarih.getDate();
      var aySayi = tarih.getMonth();
      var yil = tarih.getFullYear();

      return gün + ' ' + aylar[aySayi] + ' ' + yil;
    };

    var newPost = new _Posts2.default({
      post: post,
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