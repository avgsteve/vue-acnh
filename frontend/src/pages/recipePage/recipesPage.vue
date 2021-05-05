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
      <recipesPageTabs :prop_categories="data_categories" @categoryClicked="setClickedCategory">
        <recipesFlexboxView
          :prop_selectedRecipesData="data_dataOfSelectedCategory"
          @nameOfRecipeTagSelected="nameOfRecipeTagSelected"
        />
      </recipesPageTabs>
    </SectionComponent>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SectionComponent from '../LAYOUT/sectionComponent.vue'
import Preloader from './Preloader.vue'
import recipesPageTabs from './recipesPageTabs.vue'
import recipesFlexboxView from './recipesFlexboxView.vue'
import RECIPES from '../../../store/modules/recipesData/recipesDataTypes'
import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes'
import { Toast } from 'vant'
import axios from 'axios'
import * as i18n_en from './../../locales/en.json'
// import LANGUAGE from '../../../../store/modules/languageSetting/languageSettingTypes'

export default defineComponent({
  name: 'recipesPage',
  components: {
    SectionComponent,
    Preloader,
    recipesPageTabs,
    recipesFlexboxView
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
      return this.data_isLoading
    },
    computed_recipesCategories() {
      let category = this.$store.getters[`recipesData/${RECIPES.GET_recipes_CATEGORIES}`]
      return category
    }
  },
  watch: {
    data_recipesCategories() {
      // console.log('data_recipesCategories 更新: ', data_recipesCategories)
    }
  },
  created() {
    this.$store.dispatch(`recipesData/${RECIPES.SET_RECIPES_CATEGORIES}`)
    this.$store.dispatch(`languageSetting/${LANGUAGE.SET_TRANSLATION_DATA_FOR_RECIPES}`)
  },
  beforeMount() {
    // this.$store.dispatch(`recipesData/${RECIPES.SET_recipes_CATEGORIES}`)
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/ac/recipes/categories`,
        // 'http://localhost:3003/api/items',
        {
          headers: {
            CLIENT_REQ: 'Vue.js-FETCH_recipes_CATEGORIES'
          }
        }
      )
      .then((response) => {
        const categoryData = response.data
        // console.log('傳回的資料:', categoryData)
        let obj = {}
        for (let i = 0; i < categoryData.length; i++) {
          const item = categoryData[i]
          obj[item] = item
        }
        console.log(obj)
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
        this.prop_recipesPageResults = []
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
        console.log('axios 傳回的資料 ', data)

        this.prop_recipesPageResults = data
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
          `${import.meta.env.VITE_API_ENDPOINT}/ac/recipes?category=${category}`,
          // 'http://localhost:3003/api/items',
          {
            headers: {
              CLIENT_REQ: `fetch RECIPES data by category: ${category}`
            }
          }
        )
        .then((response) => {
          const data = response.data
          // console.log('傳回的資料:', data)
          this.data_dataOfSelectedCategory = data
        })
    },
    nameOfRecipeTagSelected(creatureName) {
      console.log('nameOfRecipeTagSelected: ', { creatureName })
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