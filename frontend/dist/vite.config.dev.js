"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pluginVue = _interopRequireDefault(require("@vitejs/plugin-vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @type {import('vite').UserConfig}
 */
var _default = {
  plugins: [(0, _pluginVue["default"])()],
  server: {
    proxy: {// '/api': {
      //   target: 'http://localhost:3003/api/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
      // // with RegEx
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, '')
      // }
    }
  }
}; // 設定參考: https://www.mdeditor.tw/pl/g6Ng/zh-tw

exports["default"] = _default;