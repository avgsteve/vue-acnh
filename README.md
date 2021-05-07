# 程式碼 & 說明

## Vite

快速建立開發 server & 編譯 + 輸出 Vue 檔案，解決 Vue CLI 建立 dev server 速度緩慢的問題

## i18n 建立語系切換功能 (程式碼)

### 連結到另外一個 Vue 的 Project 說明

- Vue 進入點檔案 [main.js](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/1ecca8f513fa64baa5a2bc7875e8f0cf09969aec/frontEnd/src/main.ts#L5)
- i18n [多國語言翻譯檔案(.json 格式)](https://github.com/avgsteve/Vue-ElementPlus-i18n/tree/main/frontEnd/src/locales)
- [透過 Vuex Store 儲存 & 動態修改當前語系變數](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/main/frontEnd/store/index.ts)
- [在 App.vue 之中透過頁面選單切換語系](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/1ecca8f513fa64baa5a2bc7875e8f0cf09969aec/frontEnd/src/App.vue#L14)
- [在 App.vue 之中透過監看 localOptionValue 值的變化](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/bff416e0f3a3ab4e988c28e820d8eeaec62cecf8/frontEnd/src/App.vue#L73)，讓語系的設定可以自動動態修改，並同時修改 i18n 的 locale & 連動修改 UI 的語言

* [官方說明文件 & template](https://github.com/intlify/vue-i18n-loader)

## Vant UI 建立 UI 版面和組件

- [https://vant-contrib.gitee.io/vant/v3/#/en-US](https://vant-contrib.gitee.io/vant/v3/#/en-US)

## 已知問題:

### 1. package: eslint-config-prettier

出現安裝錯誤:
eslint-config-prettier unable to resolve dependency tree ...

https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages

解決:

1. 先把這個 package 從 package.json 移除

```
eslint-config-prettier
```

2. 接著 npm install 安裝其他全部的 package
3. 再另外安裝 eslint-config-prettier

```
npm install --save --legacy-peer-deps eslint-config-prettier
```

##### (不事先移除的原因是，當第 2 步驟安裝了 eslint-config-prettier 之後，會又跑回去 package.json，接著會被作為新的 package.json 檔案被 commit 到 git 上面，就乾脆在 readme.md 先說明怎麼解決，避免刪掉之後影響後面的 package 安裝)

  <br>

### 2. 使用 Webpack 跟 vite 衝突

這個連結有詳細的 Vue 3 + webpack 設定: <br>
https://lmiller1990.github.io/electic/posts/20200406_webpack_for_vue_3.html
<br>但是會跟 vite 的設定有衝突，且目前還用不到 webpack ，所以先不加入 package.json

### 3. Deploy 到雲端主機後 Google Auth 無法使用，正在找問題中
