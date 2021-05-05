<template>
  <div v-if="prop_selectedTag">
    <hr />
    <br />
    <h2> 目前標籤 : </h2>
    <h3 class="currentTag">{{ prop_selectedTag }} </h3>
    <p class="subHeading--click"> 點擊圖片查看物品資訊 </p>

    <div id="itemsOfSelectedTag">
      <div class="flexbox">
        <div
          class="flexbox__item"
          v-for="(item, index) in computed_itemPageResults"
          v-bind:key="'#' + index + item.name"
          @click="clickItemForDetail(item, item._id)"
        >
          <img :src="item.variants[0].image" :alt="'Tag: ' + item.variants[0].tag" />
          <p class="itemName"> {{ item.nameTranslated }}</p>
          <!-- 將物品加入清單的按鈕 -->
          <AddToListBtn :class="'add-to-list-btn'" :prop_itemData="item" />
        </div>
      </div>
    </div>

    <br />
  </div>

  <!-- 3. 要顯示的 popup modal (dialog組件)-->
  <ItemCard
    @cardConfirmBtnClicked="clickCardConfirmEventHandler"
    :prop_cardData="data_cardSettingAndData"
  >
    <ItemCardBody>
      <!-- <ItemCardBody> 的內容可以替換成任何組件或是 html tag-->
      <DetailedCardContent :prop_cardData="data_cardSettingAndData" />
    </ItemCardBody>
  </ItemCard>
</template>
<script>
import { defineComponent } from 'vue'
import LANGUAGE from './../../../store/modules/languageSetting/languageSettingTypes'
import ItemCard from './../../components/ItemCard/ItemCard.vue'
import ItemCardBody from './../../components/ItemCard/ItemCardBody.vue'
import DetailedCardContent from './../../components/ItemCard/detailedCardContent.vue'
import AddToListBtn from './../../components/Buttons/AddToListBtn.vue'
export default defineComponent({
  name: 'ItemPageResults',
  components: {
    ItemCard,
    ItemCardBody,
    DetailedCardContent,
    AddToListBtn
  },
  setup: () => {},
  props: {
    // 從父組件傳進來的原始物件資料
    prop_itemPageResults: { type: Array, required: true, default: [] },
    prop_selectedTag: {
      type: String,
      required: true,
      default: null
    }
  },
  data() {
    const currentLocale = this.$i18n.locale
    return {
      dataObj: null,
      data_cardSettingAndData: {
        // showCard: true, // 如果設定為 true 就會讓卡片顯示在葉面上
        cardTitle: '',
        setting: {
          closeOnClickOverlay: true,
          showCancelBtn: false,
          showLoader: true // 改為透過 ItemCard　的 watch 自動修改
        },
        data: {}
      },
      data_itemName: '',
      data_currentLocale: currentLocale
    }
  },
  computed: {
    computed_itemPageResults() {
      let translationObj = this.$store.getters[
        `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_BY_NAME}`
      ]
      let originalDataFromProps = this.prop_itemPageResults
      // console.log('originalDataFromProps: ', originalDataFromProps)
      let currentLocale = this.$i18n.locale

      let itemsDataArray = []
      for (let i = 0; i < originalDataFromProps.length; i++) {
        const currentItemName = originalDataFromProps[i].name
        const translationDataForItem = translationObj[currentItemName]
        // ↑ 使用目前物品的英文名稱(currentItemName)去查詢翻譯文件(translationObj)中對應的屬性
        // 得到 translationDataForItem 物件 ，
        // 並在 translationDataForItem 物件中找出對應目前語系(currentLocale)的資料 ↓
        const nameTranslation = translationDataForItem.translation[currentLocale]

        const item = originalDataFromProps[i]
        item.nameTranslated = nameTranslation
        console.log('處理過後的item:', item)
        itemsDataArray.push(item)
      }
      return itemsDataArray
    }
  },
  watch: {
    // prop_itemPageResults() {
    //   // console.clear()
    //   // console.log('prop_itemPageResults 已經更新!')
    // }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // setItemData(item: any) {
    //   console.log('setItemData: ', item)
    // },
    clickCardConfirmEventHandler(data) {
      console.log('data in clickCardConfirmEventHandler: ', data)
      this.data_cardSettingAndData.showCard = false
    },
    clickItemForDetail(itemClicked, id) {
      // return console.log('clickItemForDetail: ', itemClicked)
      const itemName = itemClicked.name
      // console.log('clickItemForDetail is called: ')
      // console.warn('id: ', id)
      // 開啟對話框
      this.data_cardSettingAndData.showCard = true

      this.axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/ac/items/detailed-data?name=${itemName}`)
        .then((response) => {
          const data = response.data
          // console.log('item fetched. data: ', data)
          data.idForTranslation = null
          this.data_cardSettingAndData.data = data

          setTimeout(() => {
            this.data_cardSettingAndData.setting.showLoader = false
          }, 200)
        })
    }
  }
})
</script>
<style scoped>
.itemsGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.itemsGrid__item {
  margin: 0.5rem;
  max-width: 12rem;
  min-width: 9rem;
}

#itemsOfSelectedTag {
  overflow-x: auto;
}

#itemsOfSelectedTag .fetchedTags {
  margin: 1rem 0 0;
}

#itemsOfSelectedTag .flexbox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  /* flex-direction: column; */
  /* height: 25rem; */
}

.currentTag {
  font-size: 1.7rem;
  margin: 0.4rem 0;
}

.subHeading--click {
  color: rgba(131, 128, 128, 0.5);
  font-weight: 400;
  font-size: 0.9rem;
}

#itemsOfSelectedTag .flexbox__item {
  height: fit-content;
  margin: 0px 2px 8px;
  max-width: 11rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-radius: 7px;
  position: relative;
}

/* .flexbox__item .add-to-list-btn {
  position: absolute;
  top: 0;
  right: 0;
} */

.flexbox__item .itemName {
  word-break: break-word;
  max-width: 85%;
  font-size: 1.5rem;
}

.flexbox__item:hover {
  background: rgba(128, 128, 128, 0.205);
}

.flexbox__item img {
  width: 10rem;
}

.itemVariation {
  display: flex;
  justify-content: center;
  align-content: center;
}

.itemVariation .itemVariation__image,
.itemVariation .itemVariation__detail {
  flex: 1;
  display: flex;

  justify-content: center;
  align-content: center;
}

.itemVariation .itemVariation__detail {
  flex-direction: column;
  text-align: left;
  padding-left: 0.5rem;
}

.itemVariation .itemVariation__detail div {
  margin: 1rem;
}
</style>