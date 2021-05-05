"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var store_1 = require("../store");
// import ElementPlus from 'element-plus';
var vue_i18n_1 = require("vue-i18n");
// i18n 範例: https://github.com/intlify/vue-i18n-loader/blob/next/example/global/main.js
// 要 import .json 的話要先在 tsconfig.json 裡面設定
//     "resolveJsonModule": true,
var en_json_1 = require("./locales/en.json");
var zhTW_json_1 = require("./locales/zhTW.json");
var vant_1 = require("vant");
require("vant/lib/index.css");
var router_1 = require("./router/");
// import 'element-plus/lib/theme-chalk/index.css'
var App_vue_1 = require("./App.vue");
require("./index.css");
require("@vant/touch-emulator"); // convert "mouse" event to "touch"
var axios_1 = require("axios");
var vue_axios_1 = require("vue-axios");
// Vue3 + i18n 設定
var i18n = vue_i18n_1.createI18n({
    // legacy: false,
    locale: 'en',
    messages: {
        en: en_json_1["default"], zhTW: zhTW_json_1["default"]
    }
});
// const localeCode = store.getters.getCurrentLocale;
// console.log('localeCode: ', localeCode);
// import 'element-plus/lib/theme-chalk/index.css';
vue_1.createApp(App_vue_1["default"])
    // .use(ElementPlus)
    .use(vant_1["default"])
    .use(vue_axios_1["default"], axios_1["default"])
    .use(i18n)
    .use(router_1["default"])
    .use(store_1.store, store_1.key)
    .mount('#app');
