'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('./auth/auth.routes');

var _auth2 = _interopRequireDefault(_auth);

var _posts = require('./posts/posts.router');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppRoutes = function AppRoutes(app) {
    app.use(_auth2.default.routePrefix, _auth2.default.route());
    app.use(_posts2.default.routePrefix, _posts2.default.route());
};

exports.default = AppRoutes;