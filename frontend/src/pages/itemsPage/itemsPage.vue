<template>
  <div class="itemsPageContainer">
    <!-- <MainFunctionsContainer /> -->
    <Preloader :prop_isLoading="prop_isLoading" />
    <SectionComponent
      v-if="!prop_isLoading"
      class="no-margin"
      :props_title="'物品分類'"
      :props_subtitle="'Step 1. 使用選單選取分類'"
    >
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item
          :title="data_categoryMenuTitle.text"
          v-model="data_selectedCategory"
          :options="data_selectMenuOptions"
        />
      </van-dropdown-menu>
      <ItemCategories
        :prop_selectedCategory="data_selectedCategory"
        :prop_tagsData="data_tagsData"
        @tagSelected="getDataOfSelectedTag"
      />

      <ItemPageResults
        :prop_itemPageResults="prop_itemPageResults"
        :prop_selectedTag="data_selectedTag"
      />
    </SectionComponent>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SectionComponent from './../LAYOUT/sectionComponent.vue'
import AppIcon from '../../components/Icons/AppIcon.vue'
import ItemPageResults from './itemsPageResults.vue'
import ItemCategories from './itemCategories.vue'
import Preloader from './Preloader.vue'

import ITEMS from './../../../store/modules/itemsData/itemsDataTypes'

import { Toast } from 'vant'

// import LANGUAGE from '../../../../store/modules/languageSetting/languageSettingTypes'

export default defineComponent({
  name: 'itemsPage',
  components: {
    SectionComponent,
    ItemCategories,
    AppIcon,
    Preloader,
    ItemPageResults
  },
  data() {
    return {
      prop_isLoading: true,
      prop_itemPageResults: [],
      //
      data_currentTags: [],
      data_selectMenuOptions: [],
      data_selectedCategory: '',
      data_swipeable: true,
      data_categoryMenuTitle: {
        text: 'Select a category',
        value: ''
      },
      // Tag Data
      data_tagDataIsLoading: false,
      data_tagsData: [],
      data_tagsMenuOptions: [],
      data_tagsMenuTitle: {
        text: 'Select a tag',
        value: null
      },
      data_selectedTag: ''
    }
  },
  computed: {
    computed_allItemsCategories() {
      // console.clear()
      // console.log('this:', this)
      let allItemsCategories = this.$store.getters[`itemsData/${ITEMS.get_ITEM_DETAILS_CATEGORIES}`]
      // console.warn('allItemsCategories: ', allItemsCategories)
      return allItemsCategories
    },
    computed_currentLocale() {
      let locale = this.$i18n.locale
      // console.log('locale:', this)
      return locale
    }
  },
  watch: {
    computed_allItemsCategories() {
      let allCategories = this.computed_allItemsCategories
      let menuOptions = []

      let itemsToSkip = [
        'Accessories',
        'Art',
        'Bags',
        'Bottoms',
        'Clothing Other',
        'Construction',
        'Dress-Up',
        'Fencing',
        'Fish',
        // 'Floors',
        'Fossils',
        'Headwear',
        // 'Housewares',
        'Insects',
        // 'Miscellaneous',
        'Music',
        'Other',
        'Photos',
        'Posters',
        'Recipes',
        // 'Rugs',
        'Sea Creatures',
        'Shoes',
        'Socks',
        'Tools',
        'Tops',
        'Umbrellas',
        'Villagers'
        // 'Wall-mounted',
        // 'Wallpaper'
      ]

      let itemsObjToSkip = {}

      for (let i = 0; i < itemsToSkip.length; i++) {
        itemsObjToSkip[itemsToSkip[i]] = itemsToSkip[i]
      }

      for (let i = 0; i < allCategories.length; i++) {
        // 如果碰到符合要跳過的項目，就continue跳到下一個迴圈
        if (itemsObjToSkip[allCategories[i]]) continue
        let option = {
          text: this.$t(`items.category.${allCategories[i].toLowerCase()}`),
          value: allCategories[i]
        }
        menuOptions.push(option)
      }

      menuOptions.unshift({
        text: 'Select a category',
        value: ''
      })

      // 更新 category 要使用的變數
      this.data_selectMenuOptions = menuOptions

      // 將畫面的讀取動畫移除
      this.prop_isLoading = false
    },
    // 當選擇的category更新時，
    // 要連帶觸發其他的資料處理跟UI更新
    data_selectedCategory() {
      const selectedCategory = this.data_selectedCategory

      if (!selectedCategory) {
        // 當select選取的值為 "" 的時候，表示重設選擇內容，
        // 所以要連帶更新data裡面的其他內容才可以用連動的方式刷新頁面

        console.log('selectedCategory被reset')

        // reset Category 選單的標題
        this.data_categoryMenuTitle = {
          text: 'Select a category',
          value: ''
        }

        // 更新 Tag 選單的標題
        this.data_tagsMenuTitle = {
          text: 'Select a tag',
          value: ''
        }

        // 連帶將 data_selectedTag 設為 null，因為 watcher 裡面有監控這個變數
        this.data_tagsMenuOptions = []
        this.data_selectedTag = ''
        return
      }

      if (selectedCategory) {
        console.log('選取的 category: ', selectedCategory)
        Toast.loading({
          message: '讀取中',
          forbidClick: true
        })

        // 1) 如果選單的值不為 '',就更新選單顯示的標題
        this.data_categoryMenuTitle.text = `目前分類: ${this.data_selectedCategory}`
        // 顯示讀取 tag 的 preloader 動畫
        this.data_tagDataIsLoading = true

        let url = `${
          import.meta.env.VITE_API_ENDPOINT
        }/ac/items/detailed-data/categories/tags/first-doc?category=${selectedCategory}`

        // console.log('axios要請求的網址: ', url)

        // 2) 向後端請求屬於該 category 的 tags 資料
        this.axios.get(url).then((response) => {
          Toast.success('資料更新成功')

          const data = response.data
          // console.log('axios 傳回的資料 ', data)

          const tagsData = []
          for (let i = 0; i < data.length; i++) {
            const dataObj = {
              tag: data[i]._id || null,
              img: data[i].image || data[i]['image-storage']
            }
            tagsData.push(dataObj)
          }

          this.data_selectedTag = ''
          this.data_tagsData = tagsData
          this.data_tagDataIsLoading = false
        })
      }
    },
    computed_currentLocale() {
      this.$store.dispatch(`itemsData/${ITEMS.SET_ITEM_DETAILS_CATEGORIES}`)
    }
  },
  beforeMount() {
    // console.log('itemsPage的beforeMount的this ', this)
    this.$store.dispatch(`itemsData/${ITEMS.SET_ITEM_DETAILS_CATEGORIES}`)
  },
  mounted() {},
  beforeUnmount() {},
  methods: {
    getDataOfSelectedTag(selectedTag) {
      // console.log('data_selectedTag已更新: ', selectedTag)
      const selectedCategory = this.data_selectedCategory
      // console.log({ selectedCategory, selectedTag })

      if (!selectedTag) {
        console.log('data_selectedTag被重設')
        // 把提供給子組件 (ItemPageResults) 的資料重設
        this.prop_itemPageResults = []
        return
      }

      // 更新要傳給 ItemPageResults 組件的 props  ( this.data_selectedTag)
      this.data_selectedTag = selectedTag

      let url = `${
        import.meta.env.VITE_API_ENDPOINT
      }/ac/items/detailed-data?sourceSheet=${selectedCategory}&tag=${selectedTag}`
      // console.log('axios要請求的網址: ', url)

      this.axios.get(url).then((response) => {
        const data = response.data
        // console.log('axios 傳回的資料 ', data)

        this.prop_itemPageResults = data
        // 要使用v-for顯示在頁面中的內容
        this.data_tagsMenuTitle = selectedTag
        // 會連帶更新下拉表單的標題
      })
    }
  }
})
</script>
<style scoped>
.itemsPageContainer {
  /* border: 0.5rem dashed rgb(0, 255, 13); */
  background-color: rgba(103, 103, 114, 0.377);
  padding: 0.1rem;
  height: 100%;
}

/* @media only screen and (min-width: 600px) {
  .itemsPageContainer .van-dropdown-item--down {
    width: 73%;
  }
} */
</style>


<style>
.section-container.no-margin {
  margin: 0.1rem;
  border-radius: 20px;
}
/* 下拉選單 : override vant UI 的原本設定*/
@media only screen and (min-width: 600px) {
  .itemsPageContainer .van-dropdown-item--down {
    width: 79%;
  }
}

/* 下拉選單 : override vant UI 的原本設定*/
.itemsPageContainer .van-dropdown-menu__item {
  background: lightseagreen;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.itemsPageContainer .van-dropdown-item__content {
  /* width: 73%; */
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.itemsPageContainer .van-dropdown-item__content .van-cell {
  justify-content: center;
}

.itemsPageContainer .van-dropdown-item__content .van-cell__title,
.itemsPageContainer .van-dropdown-item__content .van-cell__value {
  flex: unset;
  text-align: center;
}

.itemsPageContainer .van-dropdown-item__content .van-cell__value {
  padding-left: 10px;
}
</style>