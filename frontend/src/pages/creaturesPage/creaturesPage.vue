<template>
  <div class="itemsPageContainer">
    <!-- <MainFunctionsContainer /> -->
    <Preloader :prop_isLoading="computed_dataIsLoading" />
    <SectionComponent
      v-if="!computed_dataIsLoading"
      class="no-margin"
      :props_title="'分類'"
      :props_subtitle="'Step 1. 選取分類'"
    >
      <CreaturesPageTabs :prop_categories="data_categories" @categoryClicked="setClickedCategory">
        <CreaturesFlexboxView
          :prop_selectedCreatureData="data_dataOfSelectedCategory"
          @creatureSelected="creatureSelected"
        />
      </CreaturesPageTabs>
    </SectionComponent>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SectionComponent from '../LAYOUT/sectionComponent.vue'
import Preloader from './Preloader.vue'
import CreaturesPageTabs from './creaturesPageTabs.vue'
import CreaturesFlexboxView from './creaturesFlexboxView.vue'
import CREATURES from '../../../store/modules/creaturesData/creaturesDataTypes'
import LANGUAGE from './../../../store/modules/languageSetting/languageSettingTypes'
import { Toast } from 'vant'
import axios from 'axios'
import * as i18n_en from './../../locales/en.json'
// import LANGUAGE from '../../../../store/modules/languageSetting/languageSettingTypes'

export default defineComponent({
  name: 'creaturesPage',
  components: {
    SectionComponent,
    Preloader,
    CreaturesPageTabs,
    CreaturesFlexboxView
  },
  data() {
    return {
      data_isLoading: true,
      data_categories: [],
      data_selectedCategory: '',
      data_dataOfSelectedCategory: [],
      data_swipeable: true,
      data_categoryMenuTitle: {
        text: 'Select a category',
        value: ''
      }
    }
  },
  computed: {
    computed_currentLocale() {
      let locale = this.$i18n.locale
      // console.log('locale:', this)
      return locale
    },

    computed_dataIsLoading() {
      // console.log('目前的computed_dataIsLoading: ', this.data_isLoading)
      return this.data_isLoading
    },
    computed_creaturesCategories() {
      let category = this.$store.getters[`creaturesData/${CREATURES.GET_CREATURES_CATEGORIES}`]
      // console.warn('allItemsCategories: ', category)
      return category
    }
  },
  watch: {
    data_creaturesCategories() {
      // console.log('data_creaturesCategories 更新: ', data_creaturesCategories)
    }
  },
  created() {
    this.$store.dispatch(`creaturesData/${CREATURES.SET_CREATURES_CATEGORIES}`)
    this.$store.dispatch(`languageSetting/${LANGUAGE.SET_TRANSLATION_DATA_FOR_CREATURES}`)
  },
  beforeMount() {
    // this.$store.dispatch(`creaturesData/${CREATURES.SET_CREATURES_CATEGORIES}`)
    axios
      .get(
        `/${import.meta.env.VITE_API_ENDPOINT}/ac/creatures/categories`,
        // 'http://localhost:3003/api/items',
        {
          headers: {
            CLIENT_REQ: 'Vue.js-FETCH_CREATURES_CATEGORIES'
          }
        }
      )
      .then((response) => {
        const categoryData = response.data
        // console.log('傳回的資料:', categoryData)
        // console.log('this:', this)
        this.data_categories = categoryData
        this.data_isLoading = false
      })
  },
  mounted() {},
  beforeUnmount() {},
  methods: {
    getDataOfSelectedTag(selectedTag) {
      const selectedCategory = this.data_selectedCategory
      // console.log({ selectedCategory, selectedTag })

      if (!selectedTag) {
        console.log('data_selectedTag被重設')
        // 把提供給子組件 (ItemPageResults) 的資料重設
        this.prop_creaturesPageResults = []
        return
      }

      // 更新要傳給 ItemPageResults 組件的 props  ( this.data_selectedTag)
      this.data_selectedTag = selectedTag

      let url = `/${
        import.meta.env.VITE_API_ENDPOINT
      }/ac/items/detailed-data?sourceSheet=${selectedCategory}&tag=${selectedTag}`
      // console.log('axios要請求的網址: ', url)

      this.axios.get(url).then((response) => {
        const data = response.data
        // console.log('axios 傳回的資料 ', data)

        console.log('getDataOfSelectedTag裡面的 this:', this)

        this.prop_creaturesPageResults = data
        // 要使用v-for顯示在頁面中的內容
        this.data_tagsMenuTitle = selectedTag
        // 會連帶更新下拉表單的標題
      })
    },
    setClickedCategory(category) {
      // console.log('setClickedCategory name: ', category)
      if (category === this.data_selectedCategory) return
      this.data_selectedCategory = category

      axios
        .get(
          `/${import.meta.env.VITE_API_ENDPOINT}/ac/creatures?category=${category}`,
          // 'http://localhost:3003/api/items',
          {
            headers: {
              CLIENT_REQ: `fetch creatures data by category: ${category}`
            }
          }
        )
        .then((response) => {
          const data = response.data
          // console.log('傳回的資料:', data)
          // console.log('i18n_en:', i18n_en)
          this.data_dataOfSelectedCategory = data
        })
    },
    creatureSelected(creatureName, eventTarget) {
      console.log('creatureSelected: ', { creatureName, eventTarget })
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

.itemsPageContainer .section-content {
  padding: 0 0 1rem;
}
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

@media only screen and (min-width: 600px) {
  .itemsPageContainer .section-content {
    padding: 0 0 4rem;
  }
}
</style>