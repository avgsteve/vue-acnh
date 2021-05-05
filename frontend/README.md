
# 程式碼 & 說明

## Vite 
快速建立開發server & 編譯 + 輸出 Vue 檔案，解決 Vue CLI 建立 dev server 速度緩慢的問題 

## i18n 建立語系切換功能 (程式碼)

  - Vue 進入點檔案 [main.js](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/1ecca8f513fa64baa5a2bc7875e8f0cf09969aec/frontEnd/src/main.ts#L5)
  - i18n [多國語言翻譯檔案(.json格式)](https://github.com/avgsteve/Vue-ElementPlus-i18n/tree/main/frontEnd/src/locales)
  - [透過 Vuex Store 儲存 & 動態修改當前語系變數](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/main/frontEnd/store/index.ts)
  - [在App.vue之中透過頁面選單切換語系](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/1ecca8f513fa64baa5a2bc7875e8f0cf09969aec/frontEnd/src/App.vue#L14)
  - [在App.vue之中透過監看 localOptionValue 值的變化](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/bff416e0f3a3ab4e988c28e820d8eeaec62cecf8/frontEnd/src/App.vue#L73)，讓語系的設定可以自動動態修改，並同時修改 i18n 的 locale & 連動修改UI的語言


  - [官方說明文件 & template](https://github.com/intlify/vue-i18n-loader) 
## Element Plus 建立 UI 版面和組件 
  - 在[Vue.app](https://github.com/avgsteve/Vue-ElementPlus-i18n/blob/main/frontEnd/src/main.ts)中 引入 plugin & plugin injection & 設定

  - 參考文件: 採用[fully import](https://element-plus.org/#/en-US/component/quickstart#import-element-plus)
    - 採用fully import的原因是如果只用幾個部分組件的話不必要使用framework，自己寫也可以，但是為了開發速度&一致性，所以整體UI都使用Element Plus的設定跟風格，就乾脆全部引入，也減少為了partial import的時候還要另外安裝package/plugin的麻煩和因為 & 以及減少增加package而出錯的機率



## 已知問題:
### 1. package: eslint-config-prettier
出現安裝錯誤: 
eslint-config-prettier unable to resolve dependency tree ...

https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages

解決: 
  1. 先把這個package從 package.json移除
  ```
  eslint-config-prettier
  ``` 
  2. 接著 npm install 安裝其他全部的package
  3. 再另外安裝 eslint-config-prettier
  ```
  npm install --save --legacy-peer-deps eslint-config-prettier
  ```
  ##### (不事先移除的原因是，當第2步驟安裝了eslint-config-prettier之後，會又跑回去package.json，接著會被作為新的package.json檔案被commit到git上面，就乾脆在readme.md先說明怎麼解決，避免刪掉之後影響後面的package安裝) 
  <br>


### 2. 使用 Webpack 跟 vite 衝突
這個連結有詳細的Vue 3 + webpack設定: <br>
https://lmiller1990.github.io/electic/posts/20200406_webpack_for_vue_3.html
<br>但是會跟 vite 的設定有衝突，且目前還用不到 webpack ，所以先不加入 package.json