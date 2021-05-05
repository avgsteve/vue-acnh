<template>
  <div>
    <van-dropdown-menu
      class="dropDownMenuContainer"
      v-bind:overlay="showOverlay"
      v-bind:close-on-click-outside="closeOnClickOutside"
      v-bind:close-on-click-overlay="closeOnClickOutside"
      v-bind:z-index="menuZindex"
      active-color="#ee0a24"
    >
      <van-dropdown-item
        v-model="ref_selectedCategory"
        :options="computed_categoriesOptions"
        :title="computed_categoryTitle"
      />

      <!-- ↑↑ <van-dropdown-item>  DropdownMenu 下拉菜单 
        https://vant-contrib.gitee.io/vant/v3/#/zh-CN/dropdown-menu
        需要透過 :options 讀取物件資料(格式如下)來render選項
        ex: optionsObj = [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 },
        ];
        :title="類別"  (要顯示的選單標題)
      -->

      <div class="sortingOptionMenu">
        <van-dropdown-item
          v-model="ref_selectedSorting"
          :options="computed_sortingMenuOptions"
          :title="computed_sortingTitle"
        />
      </div>
    </van-dropdown-menu>
  </div>
</template>

<script lang="js">
    import { ref, reactive, defineComponent, watch, computed } from 'vue'
    import { useStore } from 'vuex'
    import ITEMS from '../../../store/modules/itemsData/itemsDataTypes'
    import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes'
    import { useI18n } from 'vue-i18n'

    export default defineComponent({
      name: 'DropDownMenu',
      components: {},
      setup() {
        const store = useStore()
        const computed_currentLanguage = computed(
          () => store.getters[`languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE}`]
        );
        // 例如: computed_currentLanguage 等於 en，可以找出目前的語言設定

        const { t, locale } = useI18n({ useScope: 'global' }) // 讀取 global 範圍的 vue i18n
        // 測試用，確認是否能從語言文件檔案en.json中取出對應的文字
        // const testStringFromI18nOptions = computed(() => t(`items.sortingOption.byDefault`))
        // console.log('testStringFromI18nOptions:', testStringFromI18nOptions.value)

        const ref_selectedCategory = ref('')
        const ref_selectedSorting = ref('')


        // 要給 排序選單 component 的資料
        const computed_sortingMenuOptions = computed(() => {
          const sortingOptions = [
            'noSort',
            'alphabetically',
            'byStrokeAscend' ,
            'byBuyingPriceAscend',
            'byBuyingPriceDescend',
            'bySellingPriceAscend',
            'bySellingPriceDescend'
  ]

          // 將 sortingOptions 裡面的每一個元素透過 i18n 取得翻譯的文字
          // 並且作為 computed value 讓文字可以隨著 i18n 語言的切換而更新
          const translatedSortingOptions = []
          for (let index = 0; index < sortingOptions.length; index++) {
            let sortingCode = sortingOptions[index] // ex: byDefault
            translatedSortingOptions.push(
              computed(() => t(`items.sortingOption.${sortingCode}`)),
              // ↑↑ 使用 computed 將 i18n 物件中找到對應的文字，
              // 就可以讓顯示文字 (text屬性) 的內容隨著 i18n 的語言設定進行動態更新
              // ex: "By default",
            )
          }

          // console.log( 'translatedSortingOptions: ' , translatedSortingOptions );
          // console.warn('translatedSortingOptions[0]: ' , translatedSortingOptions[0].value );
          // // ex: No sorting
          // 因為每個元素都是 computed value 所以要用 .value 取得翻譯文字的值

          const sortingOptionsObjs = []
          // console.log('translatedSortingOptions: ', translatedSortingOptions)
          // 提供選單二在畫面渲染出option內容的資料 : optionsDataArr
          for (let i = 0; i < translatedSortingOptions.length; i++) {

            const sortingOptionText = translatedSortingOptions[i].value
            const sortingOptionValue = sortingOptions[i]
            const currentLanguage = computed_currentLanguage.value
            // console.log( '目前的語言:',currentLanguage );
            // 如果目前的語言是英文，跳過筆畫排序選項
            if (currentLanguage === 'en' && sortingOptionValue === 'byStrokeAscend') continue

            const sortingOptionObj = { text: sortingOptionText, value: sortingOptionValue}
            // ex: {text: "No sorting", value: "noSort"}
            sortingOptionsObjs.push(sortingOptionObj)
          }
          return sortingOptionsObjs
          // 傳出資料給  <van-dropdown-item> component 使用
        })


        watch([ref_selectedCategory, ref_selectedSorting], (newValue, oldValue) => {
        // // 透過監看選單選取內容的變化，並透過變化的內容，在store裡面的sortOption資料做出對應的改變

          // console.log({ newValue, oldValue })
          if (newValue[0] !== oldValue[0])
            // 監看的第一個物件與 category 有關，所以用第一個物件的newValue去更新 store
            store.dispatch(`itemsData/${ITEMS.SET_SELECTED_CATEGORY}`, newValue[0])

          if (newValue[1] !== oldValue[1])
            // 監看的第二個物件與 sorting 有關，所以用第二個物件的newValue去更新 store
            store.dispatch(`itemsData/${ITEMS.SET_SELECTED_SORTING_OPTION}`, newValue[1])
        })

        // 開發 & 除錯用: 節由 computed_currentLanguage 確認
        // watch(computed_currentLanguage, (oldVal, newVal) => {
        //   console.log({ oldVal, newVal })
        //   console.log('setup 裡面的 watch => \ncurrentLanguage: ', computed_currentLanguage.value)
        // })

        return {
          computed_sortingMenuOptions,
          ref_selectedCategory,
          ref_selectedSorting
        }
      },
      props: {},
      data() {
        return {
          dataObj: null,
          showOverlay: false,
          closeOnClickOutside: true,
          menuZindex:999,
        }
      },
      computed: {
        // 在取得 menu 選項的資料之前須先透過 computed_categories 從 store 取出資料並且檢查錯誤
        computed_categories() {
          // 表示傳回到 categories 變數的資料型別是 []
          let categories = this.$store.getters[`itemsData/${ITEMS.GET_ITEM_CATEGORIES}`]

          // console.log('categories: ', categories)
          if (!Array.isArray(categories)) {
            console.error('computed_categories 裡面的資料 "categories" 不是 Array，須檢查錯誤')
            return ['Error: No Data To Show']
          }

          if (categories.length === 0) {
            console.error('computed_categories 裡面的資料 "categories" 不是 Array，須檢查錯誤')
            return ['No Data To Show']
          }

          return categories
        },
        computed_categoriesOptions() {
          // console.log('this.$store: ', this.$store)
          // let categories = this.$store.getters[`itemsData/${ITEMS.GET_ITEM_CATEGORIES}`]
          const translatedTextArray = []
          const categoryOptions = []

          // 透過i18n要取得的文字內容，內容會依照目前 i18n 的global語言設定，輸出不同語言的 "對應翻譯文字"
          for (let i = 0; i < this.computed_categories.length; i++) {
            // 1. ↑ loop 出 ["en", "zhTW", "zhCN"]

            // 2. ↓ 透過 i18n 取得目前語言的 "對應翻譯文字"
            let dynamicLanguageOptionText = this.$t(`items.category.${this.computed_categories[i]}`)
            // console.log('目前語言的 "對應翻譯文字": ', dynamicLanguageOptionText)

            translatedTextArray.push(dynamicLanguageOptionText)
          }

          for (let index = 0; index < this.computed_categories.length; index++) {
            categoryOptions.push({
              text: translatedTextArray[index],
              value: this.computed_categories[index]
            })
          }

          // console.log( '整理完的 categoryOptions: ', categoryOptions );

          // const categoryOptions: [] = this.computed_categories.map((category: string): {
          //   text: string
          //   value: string
          // } => ({ text: category, value: category }))

          // console.log('computed_categoriesOptions: ', categoryOptions)

          return categoryOptions
        },
        computed_selectedCategory() {
          let selectedCategory = this.$store.getters[`itemsData/${ITEMS.GET_SELECTED_CATEGORY}`]
          // console.log('computed_selectedCategory: ', selectedCategory)
          return selectedCategory
        },
        computed_categoryTitle() {
          let categoryTitle = this.$t(`items.category.category`)
          return categoryTitle
        },
        computed_sortingTitle() {
          let sortingTitle = this.$t(`items.sortingOption.sort`)
          return sortingTitle
        }
      },
      watch: {
        // Debug 用，透過監看 computed_selectedCategory ，
        // 顯示 category 選項更新之後，Store內部的選項內容是否被正確更新
        computed_selectedCategory() {
          let selectedCategory = this.$store.getters[`itemsData/${ITEMS.GET_SELECTED_CATEGORY}`]
          // console.clear()
          // console.warn('watch: selectedCategory 被修改: ', selectedCategory)
        },
      },
      created() {},
      mounted() {
        // console.log(
        //   '(mounted)DropDownMenu 裡面的 computed_categoriesOptions',
        //   this.computed_categoriesOptions
        // )
      },
      unmounted() {},
      methods: {}
    })
</script>
<style scoped>
.dropDownMenuContainer {
  /* background-color: grey; */
  overflow-x: scroll;
}
</style>

<style>
/* override vant UI 的原本設定:  
    background-color: white
   */
.van-dropdown-menu__bar {
  background-color: transparent;
  box-shadow: none;
  width: 100%;
  display: flex;
}

/* override vant UI 的原本設定:
    下拉選單寬度
        margin: 0 2rem;
        min-width: 8rem; 
  */
.van-dropdown-item--down {
  width: 82%;
  margin: 0px auto;
}

.dropDownMenuContainer .van-cell {
  display: flex;
  justify-content: space-around;
  flex-direction: row-reverse;
  width: 100%;
}

/* override vant UI 的原本設定:  
    background-color: white
   */
.dropDownMenuContainer .van-cell__title {
  /* width: 39%;
    text-align: center;
    transform: translateX(-60%); */
  flex: unset;
  width: 39%;
  text-align: center;
  transform: translateX(-60%);
}

/* override vant UI 的原本設定:  
      .van-cell__value
   */
.dropDownMenuContainer .van-cell__value {
  /* width: 39%;
    text-align: center;
    transform: translateX(-60%); */
  flex: unset;
  text-align: right;
  width: 30%;
}

/* 修改 vant UI 的原本設定:  
      點擊選單項目之後 active 的 符號 icon，位移 15px
   */
.dropDownMenuContainer .van-dropdown-item__option--active .van-dropdown-item__icon {
  padding-right: 15px;
}

.dropDownMenuContainer .sortingOptionMenu .van-dropdown-item__icon {
  padding-right: 28px;
}
</style>
