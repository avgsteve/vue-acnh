"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/lib/theme-chalk/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _vue.createApp)(_App["default"]).use(_elementPlus["default"]).mount('#app');