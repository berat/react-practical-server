'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
    user_id: Number,
    post: {
        type: String,
        required: [true, 'İçerik giriniz']
    },
    who: String,
    date: String
});

exports.default = _mongoose2.default.model('Posts', postSchema);