import { createApp } from 'vue';
import { store } from '../store';

import { createI18n } from 'vue-i18n';
// i18n 範例: https://github.com/intlify/vue-i18n-loader/blob/next/example/global/main.js

// 要 import .json 的話要先在 tsconfig.json 裡面設定
//     "resolveJsonModule": true,
import en from './locales/en.json';
import zhTW from './locales/zhTW.json';
import zhCN from './locales/zhCN.json';

import Vant from 'vant';
import 'vant/lib/index.css';
// vant定制主题 ref: https://blog.csdn.net/qq_32555123/article/details/105513209

import router from './router';
// import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue';
import './index.css';
import '@vant/touch-emulator'; // convert "mouse" event to "touch"

import axios from 'axios';
import VueAxios from 'vue-axios';
import GAuth from 'vue3-google-oauth2';
const googleOAuthClientId = import.meta.env.VITE_OAUTH_ID_GOOGLE;
const gAuthOptions = {
  clientId: googleOAuthClientId,
  scope: 'profile email', prompt: 'consent', fetch_basic_profile: true
};

// Vue3 + i18n 設定
const i18n = createI18n({
  // legacy: false,
  locale: 'en',
  messages: {
    en, zhTW, zhCN
  }
});
// 透過 frontend\src\components\Navbar\languageOption.vue 的 methods: onSelect() 修改 
// const localeCode = store.getters.getCurrentLocale;
// console.log('localeCode: ', localeCode);


// import 'element-plus/lib/theme-chalk/index.css';
createApp(App)
  // .use(ElementPlus)
  .use(store)
  .use(Vant)
  .use(VueAxios, axios)
  .use(i18n)
  .use(GAuth, gAuthOptions)
  .use(router)
  .mount('#app');
