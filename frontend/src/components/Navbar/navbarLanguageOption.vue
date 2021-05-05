<template>
  <div>
    <van-action-sheet
      v-model:show="data_optionToggle"
      :actions="languageOptionsList"
      cancel-text="取消"
      description="語言選項 / Languages"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { Toast } from 'vant'
import { useStore, mapActions } from 'vuex'
import { useI18n } from 'vue-i18n'

import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes.js'

export default defineComponent({
  name: 'LanguageOption',
  components: {},
  setup() {
    const store = useStore()
    const { t, locale } = useI18n({ useScope: 'global' }) // 讀取 global 範圍的 vue i18n

    // 測試用，確認是否能從語言文件檔案en.json中取出對應的文字
    const testStringFromI18nOptions = computed(() => t(`language.options.en`))
    // console.log('testStringFromI18nOptions: ', testStringFromI18nOptions.value)

    // 要對應到json裡面的的翻譯文字物件:
    // console.log('locale: ', locale.value)

    // 目前 useI18n 設定的語言
    // 例如 en.json 裡面的"test"的內容為: "TEST!!" t(`test`)
    // console.log('t: ', t)

    return {}
  },

  props: ['prop_languageMenuToggle'],
  data(): { dataObj: any; data_optionToggle: boolean } {
    return {
      dataObj: null,
      data_optionToggle: this.prop_languageMenuToggle
    }
  },
  computed: {
    // 查看store中目前的變數，可透過store的改變觸發 watcher 來顯示更新過的內容，可以作為除錯工具
    currentLangueFromStore() {
      let currentLangueFromStore = this.$store.getters[
        `languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE}`
      ]
      // console.log('computed "currentLangueFromStore": ', currentLangueFromStore)
      return currentLangueFromStore
    },
    // 可以透過 store 動態更新的 languageOptionsList，做為輸出資料給 component 在畫面顯示選單用的資料
    // 每當 store 裡面的 languageOptionsInStore 更新的時候，會觸發 computed 重新輸出對應的語言內容到畫面
    languageOptionsList() {
      const languageOptionsInStore = Array.from(
        this.$store.getters[`languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE_OPTIONS}`]
      )
      const translatedTextArray = []
      const languageOptionsList = []

      // const locale = this.$i18n.locale
      // console.log('  === computed 裡面的 languageOptionsList() ===  ')

      // console.log('useI18n目前設定的語言 : ', locale)
      // 附註: 將語言資料assign到 this.$i18n.locale 就可以改變i18n在global環境中的語言設定

      // console.log('目前 store 裡的語言選項: ', languageOptionsInStore)
      // ["en", "zhTW", "zhCN"]

      // console.log('目前 store 裡的global語言設定:', this.currentLangueFromStore) // ex: zhTW

      // 透過i18n要取得的文字內容，內容會依照目前 i18n 的global語言設定，輸出不同語言的 "對應翻譯文字"
      for (let i = 0; i < languageOptionsInStore.length; i++) {
        // 1. ↑ loop 出 ["en", "zhTW", "zhCN"]

        // 2. ↓ 透過 i18n 取得目前語言的 "對應翻譯文字"
        let dynamicLanguageOptionText = this.$t(`language.options.${languageOptionsInStore[i]}`)
        // console.log('目前語言的 "對應翻譯文字": ', dynamicLanguageOptionText)

        translatedTextArray.push(dynamicLanguageOptionText)
      }

      // console.log('處理過後的 translatedTextArray: ', translatedTextArray)
      // i18l設定是 en，輸出內容會是:  ["English", "Chinese, Traditional", "Chinese, Simplified"]
      // zhTW 的內容 : ["英文", "繁體中文", "簡體中文"]
      // zhCN 的內容 : ["英文", "繁体中文", "简体中文"]

      // 處理要顯示的選單內容 (languageOptionsList array)
      for (let i = 0; i < languageOptionsInStore.length; i++) {
        languageOptionsList.push({
          // name: 選單項目要顯示的名稱
          name: translatedTextArray[i],
          // subname: 附屬說明文字
          subname: languageOptionsInStore[i],
          // value: 選單項目的值，要使用 store 裡面的選項，
          // 因為store裡面的選項對應到了main.js裡面的i18n的語言選項
          value: languageOptionsInStore[i]
        })
      }

      // console.log('處理過後的languageOptionsList: ', languageOptionsList)

      return languageOptionsList
    }
  },
  watch: {
    prop_languageMenuToggle: function () {
      // 當parent component 傳進來的 prop_languageMenuToggle 改變的時候，
      // 會透過watch function反轉目前的開啟狀態
      this.data_optionToggle = !this.data_optionToggle
    },
    currentLangueFromStore: function () {
      // 檢查透過 store 取得的 computed value : currentLangueFromStore
      // 在Store資料改變的時候，傳出的內容(語言設定文字的值) 是否正確，因為會影響選i18n的語言設定開關
      // console.log(
      //   'languageOptionsInStore.vue裡面的 watch function: \n current language has been change!',
      //   this.$store.getters[`languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE}`]
      // )
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onCancel: () => {
      Toast('取消')
    },
    onSelect: function (e) {
      // console.log('呼叫onSelect改變Store裡面的"currentLanguage"')
      this.$store.dispatch(`languageSetting/${LANGUAGE.SET_DISPLAY_LANGUAGE}`, e.value)
      // store.dispatch(`languageSetting/${LANGUAGE.SET_DISPLAY_LANGUAGE}`, '1')
      this.$i18n.locale = e.value
      // this.$i18n.locale = e.value
      // console.log(' onSelect 裡面的 this.$i18n: ', this.$i18n)
      // // 透過 global scope 的 $i18n 改變 i18n 目前的語言設定
      // // https://vue-i18n.intlify.dev/guide/essentials/scope.html#scope
    }
  }
})
</script>
<style scoped></style>
