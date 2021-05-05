<template>
  <div class="SearchResultTable">
    <!-- 1. 搜尋頁面的控制選項(flexbox) -->
    <div class="searchFilterOption">
      <!-- 1-1. 搜尋結果的數量 -->
      <div class="searchFilterOption__item">
        <p class="resultsTitle"> {{ $t(`ui.search.resultCount`) }}: </p>
        <p class="resultsCount">{{ computed_currentQueryData.length }}</p>
      </div>

      <!-- 1-2. 讓物品只顯示目前語言的名稱(就不會英文、繁體跟簡體中文一起顯示) -->
      <div class="searchFilterOption__item">
        <p class="resultsTitle"> {{ $t(`ui.search.showNameInCurrentLanguage`) }} </p>
        <van-switch
          v-model="data_showNameOfSelectedLanguageOnly"
          active-color="#ee0a24"
          inactive-color="#dcdee0"
          :size="width > 500 ? '26px' : '18px'"
        />
      </div>

      <!-- 1-3. 控制每頁要顯示的物品數量 -->
      <div class="searchFilterOption__item">
        <p class="resultsTitle">{{ $t(`ui.search.resultsPerPage`) }} </p>
        <div class="stepper">
          <van-stepper
            v-model="data_numbersOfResultPerPage"
            step="2"
            min="5"
            max="30"
            integer
            disable-input
            :input-width="width > 500 ? '32px' : '24px'"
            :button-size="width > 500 ? '28px' : '18px'"
          />
        </div>
      </div>

      <!-- 1-4. 換頁的功能 -->
      <div class="searchFilterOption__item">
        <p class="resultsTitle">
          {{ $t(`ui.search.pageNumber`) }} : {{ data_numberOfCurrentPage }} /
          {{ computed_totalPages }}
        </p>
        <div class="stepper">
          <van-stepper
            v-model="data_numberOfCurrentPage"
            step="1"
            min="1"
            :max="computed_totalPages"
            integer
            disable-input
            :input-width="width > 500 ? '32px' : '24px'"
            :button-size="width > 500 ? '28px' : '18px'"
          />
        </div>
      </div>
    </div>

    <!-- 2. 搜尋結果清單 -->
    <div>
      <div v-if="computed_ifNoResultsToShow">
        <h4> {{ $t(`ui.search.pageNumber`) }}</h4>
        <h4>{{ $t(`ui.search.resetFilter`) }}?</h4>
      </div>

      <!-- https://divtable.com/table-styler/ -->
      <table v-if="!computed_ifNoResultsToShow" class="itemTable">
        <thead>
          <tr>
            <!-- <th v-for="(item, index) in tableHeaders" v-bind:key="index"> {{ item }}</th> -->
            <th class="minWidthCell" v-if="data_showNameOfLanguage.zhTW">
              {{ $t(`table.header.nameTw`) }}</th
            >
            <th class="minWidthCell" v-if="data_showNameOfLanguage.zhCN">{{
              $t(`table.header.nameCn`)
            }}</th>
            <th class="minWidthCell" v-if="data_showNameOfLanguage.en">{{
              $t(`table.header.nameEn`)
            }}</th>
            <th> {{ $t(`ui.button.addToList`) }}</th>
            <th class="clickForDetail-image"> {{ $t(`table.header.img`) }}</th>
            <th> {{ $t(`table.header.priceBuy`) }}</th>
            <th> {{ $t(`table.header.priceSell`) }}</th>
            <th class="clickForDetail source"> {{ $t(`table.header.variants`) }}</th>
            <th class="clickForDetail source"> {{ $t(`table.header.source`) }}</th>
          </tr>
        </thead>

        <!-- Table body:  
          1. clickItemForDetail() event handler 開啟物品資訊
          2. 物品資訊是透過 <ItemCard> 組件顯示內容，要傳入 :prop_cardData
        -->
        <tbody>
          <tr
            v-for="(item, index) in computed_resultsToRenderForCurrentPage"
            v-bind:key="index"
            v-bind:data-item_name="item.nameEn"
          >
            <td class="minWidthCell name_tw" v-if="data_showNameOfLanguage.zhTW">{{
              item.nameTw
            }}</td>
            <td class="minWidthCell name_cn" v-if="data_showNameOfLanguage.zhCN">{{
              item.nameCn
            }}</td>
            <td class="minWidthCell name_en" v-if="data_showNameOfLanguage.en">{{
              item.nameEn
            }}</td>
            <td class="addToListBtn">
              <AddToListBtn :prop_itemData="item" :class="'no_absolutePosition'" />
            </td>

            <td
              @click="clickItemForDetail(item.nameEn, item._id.$oid)"
              class="clickForDetail clickForDetail-image"
            >
              <img :src="item.img" alt="" />
            </td>
            <td
              @click="clickItemForDetail(item.nameEn, item._id.$oid)"
              class="clickForDetail price"
            >
              {{ item.price.buy == '-1' ? 'N/A' : item.price.buy }}
            </td>
            <td
              @click="clickItemForDetail(item.nameEn, item._id.$oid)"
              class="clickForDetail price"
            >
              {{ item.price.sell }}</td
            >
            <td
              @click="clickItemForDetail(item.nameEn, item._id.$oid)"
              class="clickForDetail variants"
            >
              {{ item.variants.length }}
            </td>

            <td
              @click="clickItemForDetail(item.nameEn, item._id.$oid)"
              class="clickForDetail source"
            >
              {{ $t(`items.sources.${item.source[0].replace("'s ", 's')}`) }}
            </td>
          </tr>
        </tbody>

        <!-- <tfoot>
            <tr>
              <td colspan="5">
                <div class="links"
                  ><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a>
                  <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div
                >
              </td>
            </tr>
          </tfoot> -->
      </table>
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
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import ITEMS from '../../../store/modules/itemsData/itemsDataTypes'
import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes'

import NumberStepper from './../../components/NumberStepper.vue'
import ItemCard from './../../components/ItemCard/ItemCard.vue'
import ItemCardBody from './../../components/ItemCard/ItemCardBody.vue'
import DetailedCardContent from './../../components/ItemCard/detailedCardContent.vue'

import AddToListBtn from './../../components/Buttons/AddToListBtn.vue'

// import axios from 'axios'

export default defineComponent({
  name: 'SearchResultTable',
  components: {
    NumberStepper,
    ItemCard,
    ItemCardBody,
    DetailedCardContent,
    AddToListBtn
  },
  setup: () => {
    let windowWidth = ref(window.innerWidth)

    const onWidthChange = () => (windowWidth.value = window.innerWidth)
    onMounted(() => window.addEventListener('resize', onWidthChange))
    onUnmounted(() => window.removeEventListener('resize', onWidthChange))

    const type = computed(() => {
      if (windowWidth.value < 550) return 'xs'
      if (windowWidth.value > 549 && windowWidth.value < 1200) return 'md'
      if (windowWidth.value > 1199) return 'lg'
    })

    const width = computed(() => windowWidth.value)

    watch(width, (newWidth, oldWidth) => {
      console.log({ newWidth, oldWidth })
    })

    return { width, type }
  },
  props: {},
  data() {
    return {
      data_numbersOfResultPerPage: 20, // 透過組件的 v-model 更新
      data_stepperInitialValue: 10,
      data_numberOfCurrentPage: 1, // 透過組件的 v-model 更新
      data_showNameOfSelectedLanguageOnly: false,
      data_showNameOfLanguage: {
        en: true,
        zhTW: true,
        zhCN: true
      },
      // 透過傳入到 <ItemCard> 顯示modal
      // 和透過 .data 作為子組件render物件資料到 Dialog中
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
      data_itemId: '',
      windowWidth: window.innerWidth
    }
  },
  computed: {
    computed_selectedCategory() {
      let currentSelectedCategory = this.$store.getters[`itemsData/${ITEMS.GET_SELECTED_CATEGORY}`]
      return currentSelectedCategory
    },
    computed_selectedSorting() {
      let currentSelectedSorting = this.$store.getters[
        `itemsData/${ITEMS.get_SELECTED_SORTING_OPTION}`
      ]
      return currentSelectedSorting
    },
    computed_currentQueryData() {
      let itemDataBySelectedCategory = this.$store.getters[`itemsData/${ITEMS.GET_ITEMS_FOR_QUERY}`]
      return itemDataBySelectedCategory
    },
    // 透過Store裡面的資料動態計算和更新總頁數的數量
    computed_totalPages() {
      const currentQuery = this.$store.getters[`itemsData/${ITEMS.GET_ITEMS_FOR_QUERY}`]
      const numberOfResultPerPage = this.data_numbersOfResultPerPage
      let totalPages = Math.ceil(currentQuery.length / numberOfResultPerPage)
      // console.warn('更新後的總頁數(computed_totalPages): ', totalPages)
      return totalPages
    },
    // 透過目前頁數跟總頁數取出要顯示在頁面的資料
    // 會透過目前頁面數字的更新，或是store資料update的時候會連帶更新資料
    computed_resultsToRenderForCurrentPage() {
      let numberToSkip = (this.data_numberOfCurrentPage - 1) * this.data_numbersOfResultPerPage
      let currentQuery = Array.from(this.$store.getters[`itemsData/${ITEMS.GET_ITEMS_FOR_QUERY}`])
      // console.log({ numberToSkip, currentQuery: currentQuery.length })

      let resultsToShowInPage = currentQuery.slice(
        numberToSkip,
        numberToSkip + this.data_numbersOfResultPerPage
      )

      for (const item of resultsToShowInPage) {
        item.name = item.nameEn
      }

      console.log('resultsToShowInPage', resultsToShowInPage)
      return resultsToShowInPage
    },
    computed_ifNoResultsToShow() {
      return Array.from(this.$store.getters[`itemsData/${ITEMS.GET_ITEMS_FOR_QUERY}`]).length === 0
    }
  },
  watch: {
    // 當 data_showNameOfSelectedLanguageOnly 變更 的時候，
    // 透過watch去控制顯示的資料是否要關不屬於目前語言的名稱欄位
    data_showNameOfSelectedLanguageOnly() {
      const showNameOfSelectedLanguageOnly = this.data_showNameOfSelectedLanguageOnly
      console.log('是否只顯示目前語言的名稱: ', showNameOfSelectedLanguageOnly)

      let currentLanguage = this.$store.getters[`languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE}`]
      console.log('currentLanguage： ', currentLanguage)

      let showNameOfLanguage = this.data_showNameOfLanguage
      // 如果只顯示目前語言名稱欄位的開關是開的話，就對 showNameOfLanguage 的每個語言屬性的布林值進行轉換
      if (showNameOfSelectedLanguageOnly === true) {
        // 把showNameOfLanguage中對應每一個語言的key找出來，和目前設定語言的key (currentLanguage) 做比對
        for (const key in showNameOfLanguage) {
          console.log('key:', key)
          console.log('showNameOfLanguage[key]:', showNameOfLanguage[key])
          // 將不是目前語言的key的值改為false，該語言的名稱欄位就不會在結果資料中顯示
          if (key !== currentLanguage) {
            showNameOfLanguage[key] = false
          }
          if (key === currentLanguage) {
            showNameOfLanguage[key] = true
          }
          console.log('處理完的 showNameOfLanguage:', showNameOfLanguage)
        }
      } else {
        // 目前語言名稱欄位的開關是關的話，表示顯示全部語言，就把showNameOfLanguage裡面的所有的key都回復成true
        for (const key in showNameOfLanguage) {
          showNameOfLanguage[key] = true
        }
      }
    },
    windowWidth(newWidth, oldWidth) {
      console.log('newWidth:', newWidth)
    }
  },
  created() {},
  mounted() {
    // console.log('computed_totalPages: ', this.computed_totalPages)
  },
  unmounted() {},

  methods: {
    // 關閉 ItemCard 的 method
    clickCardConfirmEventHandler(data) {
      console.log('data in clickCardConfirmEventHandler: ', data)
      this.data_cardSettingAndData.showCard = false
    },
    // 取得 ItemCard 資料的 method
    clickItemForDetail(itemClicked, id) {
      console.log('clickItemForDetail is called: ')
      // console.warn('id: ', id)
      // 開啟對話框

      this.axios.get(`/api/ac/items/detailed-data?name=${itemClicked}`).then((response) => {
        // 讀取完資料之後再開啟ItemCard彈窗
        this.data_cardSettingAndData.showCard = true
        const data = response.data
        // console.log('item fetched. data: ', data)
        data.idForTranslation = id

        // 將取得的資料寫入 data_cardSettingAndData ，作為傳入 ItemCard 的 prop_cardData 屬性的資料

        this.data_cardSettingAndData.data = data

        setTimeout(() => {
          this.data_cardSettingAndData.setting.showLoader = false
        }, 400)
      })
    }
  }
})
</script>
<style scoped>
.SearchResultTable {
  /* margin: 0 auto; */
  width: 100%;
  height: 100%;
  /* border: 4px dotted paleturquoise; */
  z-index: auto;
}

table.itemTable {
  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  /*  */
  border-collapse: separate;
  border-spacing: 0;
  padding: 0 0 1rem;
}

@media only screen and (min-width: 600px) {
  table.itemTable {
    display: table;
  }
}

table.itemTable td,
table.itemTable th {
  /* border: 1px solid #aaaaaa; */
  padding: 3px 2px;
  max-width: 100%;
  min-width: 4.6rem;
  white-space: normal;
}

table.itemTable th {
  text-align: center;
}

table.itemTable td.minWidthCell,
table.itemTable th.minWidthCell {
  /* border: 1px solid #aaaaaa; */
  padding: 3px 2px;
  max-width: 7rem;
  min-width: 4.6rem;
  white-space: normal;
  text-align: center;
}

/* 凍結 th 第一個元素 (相當於 table head 的第一欄) */
table.itemTable th:first-child {
  /* border: 1px solid #aaaaaa; */
  /* color: red; */
  padding: 3px 2px;
  background-color: #327cad;
  border: 2px solid whitesmoke;
}

table.itemTable tbody td {
  font-size: 1.6rem;
}

table.itemTable tbody td.minWidthCell {
  font-size: 1.3rem;
}

@media only screen and (max-width: 500px) {
  table.itemTable tbody td {
    font-size: 1.1rem;
  }

  table.itemTable tbody td.minWidthCell {
    font-size: 1rem;
  }
}

/* 凍結 tbody 每一列的第一個元素 (相當於 table body的第一欄) */
table.itemTable tbody td:first-child {
  position: sticky;
  color: rgb(0, 26, 255);
  left: 0;
  z-index: 2;
}

table.itemTable tbody td img {
  max-width: 3rem;
}

/* 每單數列的第一個，加上背景顏色在表格橫向捲動的時候才能擋住往左邊捲動的cell */
table.itemTable tr:nth-child(odd) td {
  /* background: #d0e4f5; */
  background: #e6f1de;
}

/* 每雙數列的第一個，加上背景顏色在表格橫向捲動的時候才能擋住往左邊捲動的cell */
table.itemTable tr:nth-child(even) td {
  background: #d0e4f5;
}

table.itemTable tr td {
  border: 2px solid whitesmoke;
  /* border: 0px; */
}

table.itemTable thead {
  background: #1c6ea4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}
table.itemTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}
table.itemTable thead th:first-child {
  /* border-left: none; */
  position: sticky;
  left: 0;
  z-index: 2;
}
</style>



<style scoped>
.searchFilterOption {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1.5rem;
}

@media only screen and (max-width: 470px) {
  .searchFilterOption {
    margin-top: 1rem;
  }
}

.searchFilterOption .searchFilterOption__item {
  padding: 1rem 1.5rem;
  margin: 0.5rem 0.5rem 0.5rem;
  background-color: rgba(235, 159, 87, 0.34);
  border-radius: 3px;
  width: 21rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 3px 4px 4px -5px rgb(0 0 0 / 75%);
}

/* @media only screen and (max-width: 500px) {
  .searchFilterOption .searchFilterOption__item {

  }
} */

.searchFilterOption .searchFilterOption__item:hover {
  box-shadow: 3px 3px 9px -4px rgba(0, 0, 0, 0.75);
  background-color: rgba(235, 159, 87, 0.68);
}

.searchFilterOption__item .resultsTitle {
  font-size: 1.6rem;
  margin-bottom: 0.9rem;
}

.searchFilterOption__item .resultsCount {
  font-size: 2rem;
}

.searchFilterOption__item .van-stepper {
  display: flex;
  justify-content: space-evenly;
}

@media only screen and (max-width: 470px) {
  .searchFilterOption .searchFilterOption__item {
    width: 4.5rem;
    height: 5.1rem;
    padding: 0.2rem 0.3rem;
    margin: 0.2rem 0.1rem 0.2rem;
    /* margin: 0.5rem; */

    flex-direction: column;
    justify-content: space-evenly;
  }

  .searchFilterOption__item .resultsTitle {
    font-size: 0.7rem;
    margin-bottom: 0;
  }

  .searchFilterOption__item .resultsCount {
    font-size: 1.1rem;
  }

  .searchFilterOption__item .van-stepper {
    display: flex;
    justify-content: space-evenly;
  }
}

.clickForDetail-image {
  height: 4.5rem;
  cursor: pointer;
  text-align: center;
}

.clickForDetail.price {
  text-align: right;
  padding-right: 0.7rem;
}

.clickForDetail.variants {
  text-align: center;
}

.clickForDetail.source {
  text-align: center;
}
</style>

<style>
.addToListBtn {
  display: flex;
  justify-content: center;
  max-height: 5rem;
}

.addToListBtn .add-to-list-btn {
  height: 4rem;
}

.addToListBtn .add-to-list-btn-icon {
  font-size: 2.5rem;
}

@media only screen and (max-width: 470px) {
  .addToListBtn .add-to-list-btn {
    height: 4rem;
  }

  .addToListBtn .add-to-list-btn-icon {
    font-size: 2.8rem;
  }
}
</style>