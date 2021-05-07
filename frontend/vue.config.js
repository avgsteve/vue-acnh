// Vue3 + i18n 設定
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      enableLegacy: false
    }
  },
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://localhost:3080',
  //       changeOrigin: true
  //     },
  //   }
  // }
};