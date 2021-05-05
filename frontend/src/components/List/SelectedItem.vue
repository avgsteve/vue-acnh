<template >
  <div class="selectedItemForList">
    <!-- {{ selectedItemData }}  -->
    <div class="itemImage">
      <input type="hidden" :value="computed_currentItemData" />
      <div class="img">
        <img
          :src="
            selectedItem.iconImage ||
            selectedItem.variants[0].closetImage ||
            selectedItem.variants[0].image ||
            selectedItem.variants[0].inventoryImage ||
            selectedItem.variants[0].storageImage ||
            selectedItem.img
          "
          alt=""
        />
      </div>
    </div>
    <div class="itemMeta">
      <p class="subtitle"> {{ $t(`ui.description.name`) }} : </p>
      <p v-if="selectedItem.type === 'items'"> {{ $t(`items.item.${selectedItem.name}`) }}</p>
      <p v-if="selectedItem.type === 'creatures'"> {{ $t(`creatures.${selectedItem.name}`) }}</p>

      <p class="subtitle"> {{ $t(`ui.description.category`) }} : </p>

      <!-- category可分為 items 或是 creatures -->
      <p v-if="selectedItem.type === 'items'">
        {{
          $t(
            `items.category.${selectedItem.category || selectedItem.sourceSheet.toLowerCase()}`
          ).split('/')[0]
        }}</p
      >
      <p v-if="selectedItem.type === 'creatures'">
        {{
          $t(`creatures.categories.${selectedItem.category || selectedItem.sourceSheet}`).split(
            '/'
          )[0]
        }}</p
      >
    </div>
    <div class="categoryForList">
      <h4>{{ $t(`ui.list.listType`) }}:</h4>
      <van-radio-group v-model="data_currentSelectedItemType">
        <van-radio class="radioBtn" name="recipe" :disabled="data_itemHasNoDIY">
          {{ $t(`ui.description.recipe`) }}
        </van-radio>
        <van-radio class="radioBtn" name="item"> {{ $t(`ui.description.item`) }} </van-radio>
      </van-radio-group>
    </div>
    <div class="qty">
      <h4 class="qtyHeading"> {{ $t(`ui.description.quantity`) }} :</h4>
      <div>
        <van-stepper v-model="data_itemQty" min="1" max="99" />
      </div>
    </div>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
import LIST from '../../../store/modules/listData/listDataTypes'

export default defineComponent({
  name: 'SelectedItem',
  components: {},
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data() {
    return {
      dataObj: null,
      data_itemQty: 1,
      data_currentSelectedItemType: 'recipe',
      // ↑ 透過 mounted 階段 和畫面選單的選取動作資料來更新
      // 並透過watch，在data_currentSelectedItemType被更新的時候寫入store的資料
      data_currentItemData: {},
      data_itemHasNoDIY: false
    }
  },
  computed: {
    selectedItem() {
      const selectedItem = this.$store.getters[`listData/${LIST.GET_SELECTED_ITEM_DATA}`]
      if (
        selectedItem.sourceSheet === 'Fish' ||
        selectedItem.sourceSheet === 'Insects' ||
        selectedItem.sourceSheet === 'Sea Creatures'
      ) {
        selectedItem.type = 'creatures'
      } else {
        selectedItem.type = 'items'
      }

      console.log('selectedItem: ', selectedItem)
      return selectedItem
    },
    computed_currentItemData() {
      const dataObj = {
        id: this.selectedItem.id || this.selectedItem._id.$oid,
        name: this.selectedItem.name,
        qty: this.data_itemQty,
        category: this.selectedItem.sourceSheet || this.selectedItem.category,
        // .sourceSheet 是從 all items API 取得的原始資料才有的屬性
        // .category 使透過 tranlation API 取得的資料(沒有 .sourceSheet屬性)
        diy: this.data_currentSelectedItemType === 'recipe' ? true : false
        // 如果目前選擇的物件類型是 'recipe' ，就表示是 DIY
        // 否則就為物品
      }
      return dataObj
    }
  },
  watch: {
    data_currentSelectedItemType() {
      // console.log('data_currentSelectedItemType: ', this.data_currentSelectedItemType)
      this.$store.dispatch(
        `listData/${LIST.SET_SELECTED_ITEM_TYPE}`,
        this.data_currentSelectedItemType
      )
    },
    data_itemQty() {
      this.data_currentItemData.qty = this.data_itemQty
      // console.log('更新過的 data_currentItemData: ', this.data_currentItemData)
    },
    computed_currentItemData() {
      // console.log('更新過的 computed_currentItemData: ', this.computed_currentItemData)
      this.$emit('updatedItemData', this.computed_currentItemData)
    }
  },
  created() {},
  mounted() {
    const currentItemTypeFromStore = this.$store.getters[`listData/${LIST.GET_SELECTED_ITEM_TYPE}`]

    this.data_currentSelectedItemType = currentItemTypeFromStore
    // 在每一次載入 SelectedItem.vue 的時候，使用 store 裡面的 selectedItemType去更新SelectedItem.vue的本地變數data_currentSelectedItemType，就可以讓選取清單的預設值被更改，使用者就不用每次都要點item或是recipe

    // console.log('目前的this.selectedItem: ', this.selectedItem)

    if (this.selectedItem.diy === false || this.selectedItem.type === 'creatures') {
      this.data_itemHasNoDIY = true
      this.data_currentSelectedItemType = 'item'
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_ITEM_TYPE}`, 'item')
      // 如果載入的物件沒有 diy 選項，就讓畫面的recipe選項無法點選，並讓store的選取內容更新為 item
    }

    if (this.selectedItem.diy === false) {
      this.data_itemHasNoDIY = false
      // this.data_currentSelectedItemType = 'item'
      // this.$store.dispatch(`listData/${LIST.SET_SELECTED_ITEM_TYPE}`, 'item')
      // 如果載入的物件沒有 diy 選項，就讓畫面的recipe選項無法點選，並讓store的選取內容更新為 item
    }

    this.$emit('updatedItemData', this.computed_currentItemData)
  },
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.selectedItemForList {
  margin: 0.4rem 0.5rem 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* background-color: palegoldenrod; */
  padding: 0 0.5rem 0.5rem;
  justify-content: space-around;
  align-items: flex-start;
  text-align: left;
}

.subtitle {
  color: rgba(128, 128, 128, 0.719);
}

.selectedItemForList > div {
  flex: 1;
  /* max-height: 10rem;
  min-height: 5rem; */

  height: 10rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid rgba(128, 128, 128, 0.02);
  background-color: transparent;
  border-radius: 8px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  box-shadow: 1px 2px 5px -3px rgb(0 0 0 / 81%);

  transition: all 0.3s ease-out;
}

.selectedItemForList > div:hover {
  border-bottom: 2px solid rgba(209, 139, 9, 0.774);
  background-color: rgba(205, 236, 143, 0.472);
}

.selectedItemForList .itemImage {
  flex: 0;
  height: 11.5rem;
}

.selectedItemForList .itemImage .img {
  border-radius: 50%;
  background-color: rgba(175, 175, 167, 0.068);
  /* border-radius: 50%; */
  padding: 0.2rem;
  width: 10rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -5px;
}

.selectedItemForList .itemMeta {
  /* padding: 0 0 0 1rem; */
  height: 11.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.selectedItemForList .itemMeta p {
  white-space: nowrap; /* Chrome */
  overflow-wrap: anywhere;
  text-align: center;
}

.selectedItemForList .itemMeta p {
  margin: 0.4rem 0 0;
}

.selectedItemForList .itemMeta p:first-child {
  margin: 0.5rem 0 0;
}

@media only screen and (max-width: 470px) {
  .selectedItemForList > div {
    flex: unset;
    padding: 0.1rem;
    margin: 0.1rem;
    font-size: 1.4rem;
    width: 7.5rem;
    height: 8rem;
    justify-content: flex-start;
  }

  .selectedItemForList .itemImage,
  .selectedItemForList .itemMeta {
    height: 8rem;
  }

  .selectedItemForList .itemMeta {
    overflow-x: auto;
  }

  .selectedItemForList .itemMeta p {
    font-size: 1.2rem;
    /* white-space: pre-wrap; */
    text-align: center;
  }

  .selectedItemForList .itemMeta p {
    margin: 0.2rem 0 0;
  }

  .selectedItemForList .itemMeta p:first-child {
    margin: 0.2rem 0 0.3rem;
  }
}

/* 後半部: 清單類型跟數量的部分 */

.radioBtn:nth-child(odd) {
  margin: 1rem 0 1rem;
}

.categoryForList {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  white-space: nowrap;
}

.qty {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  white-space: nowrap;
}

.categoryForList,
.qty {
  margin-top: 2rem !important;
  margin-bottom: 1rem !important;
}
.qty .qtyHeading {
  margin-bottom: 1.5rem;
}

.selectedItemForList .itemImage img {
  height: 100%;
}

@media only screen and (max-width: 470px) {
  .selectedItemForList .itemImage img {
    height: unset;
    width: 100%;
  }

  .selectedItemForList .categoryForList,
  .selectedItemForList .qty {
    height: 7rem;
    margin-top: 1rem !important;
    margin-bottom: -1rem !important;
  }
}
</style>

<style>
.categoryForList .van-badge__wrapper {
  border: 1px solid #ebecef;
}
</style>