'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb+srv://root:root@cluster0-qwfpm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, function (err) {
    return console.log(err ? err : 'Mongo connected.');
});

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

(0, _routes2.default)(app);

app.get('/', function (req, res) {
    res.send("API yapıyoruz.");
});

app.listen(process.env.PORT || 3000, function () {
    return console.log("server ayakta");
});