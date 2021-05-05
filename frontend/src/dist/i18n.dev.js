"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueI18n["default"]);

function loadLocaleMessages() {
  var locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);

  var messages = {};
  locales.keys().forEach(function (key) {
    var matched = key.match(/([A-Za-z0-9-_]+)\./i);

    if (matched && matched.length > 1) {
      var locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

var _default = new _vueI18n["default"]({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
});

exports["default"] = _default;