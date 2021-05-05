<template>
  <!-- 
  透過按下 AddToListBtn.vue 的圖案，並透過 watcher 監看 global_showPopupStatus 的畫面將 data_showPopup 的 Boolean value做修改來控制 popup 的顯示
 -->
  <van-popup
    v-model:show="data_showPopup"
    position="bottom"
    :style="{ height: '50%' }"
    closeable
    close-icon-position="top-left"
    @close="closePopupEvent"
  >
    <input class="global_showPopupStatus" type="hidden" :value="global_showPopupStatus" />
    <div class="popupContainer">
      <CurrentListsType />

      <div class="listContainer">
        <!--  SelectedItem 會透過 store 取得目前選取的物件資料，並在 SelectedItem 將資料處理後傳回 <CurrentLists> 這個父元件 -->
        <SelectedItem @updatedItemData="updatedItemDataHandler" />
        <CurrentLists :prop_currentListType="computed_currentListType" />
        <!-- 新增物件到清單的按鈕 -->
        <van-button
          :class="'addNewItemToListBtn'"
          type="primary"
          icon="plus"
          plain
          @click="addNewItemToList"
        >
          {{ $t(`ui.button.addToList`) }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>
<script  >
import { defineComponent } from 'vue'
import GLOBALSTATE from '../../../store/modules/globalState/globalStateTypes'
// import LIST from '../../../store/modules/listData/listDataTypes'

import SelectedItem from './SelectedItem.vue'
import CurrentLists from './CurrentLists.vue'
import CurrentListsType from './CurrentListsType.vue'
import LIST from './../../../store/modules/listData/listDataTypes'
import { Toast } from 'vant'

export default defineComponent({
  name: 'Popup',
  components: { SelectedItem, CurrentLists, CurrentListsType },
  setup: () => {},
  props: {},
  data() {
    return {
      dataObj: null,
      data_showPopup: false,
      data_itemDataToAddToStore: {}
      // ↑ 透過子組件的 SelectedItem 的 event handler updatedItemDataHandler 來更新
    }
  },
  computed: {
    global_showPopupStatus() {
      const showPopup = this.$store.getters[`globalStatus/${GLOBALSTATE.GET_LIST_POPUP_STATUS}`]
      return showPopup
    },
    computed_currentListType() {
      const currentListTypeFromStore = this.$store.getters[
        `listData/${LIST.GET_SELECTED_LIST_TYPE}`
      ]
      // console.log('目前的 currentListTypeFromStore : ', currentListTypeFromStore)
      return currentListTypeFromStore
    }
  },
  watch: {
    global_showPopupStatus() {
      // console.log('目前的 global_showPopupStatus : ', this.global_showPopupStatus)
      if (this.global_showPopupStatus === false) this.data_showPopup = false
      if (this.global_showPopupStatus === true) this.data_showPopup = true
    },
    data_showPopup() {
      if (this.data_showPopup === false) {
        this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_LIST_POPUP_STATUS}`, false)
      }
    }
    // data_itemDataToAddToStore() {
    //   console.log('更新過的 data_itemDataToAddToStore: ', this.data_itemDataToAddToStore)
    // }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    closePopupEvent() {
      if (this.data_showPopup === true) {
        this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_LIST_POPUP_STATUS}`, false)
        this.data_showPopup = false
      }
    },
    updatedItemDataHandler(data) {
      // console.log('收到updatedItemData: ', data)
      this.data_itemDataToAddToStore = data
    },
    addNewItemToList() {
      // console.log('目前要新增的item', this.data_itemDataToAddToStore)
      this.$store.dispatch(`listData/${LIST.ADD_NEW_ITEM_TO_LIST}`, this.data_itemDataToAddToStore)
      const message = this.$t('ui.button.addToList') + ' ' + this.$t('ui.result.success')
      Toast.success(`${message}`)
      this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_LIST_POPUP_STATUS}`, false)
      this.data_showPopup = false
    }
  }
})
</script>
<style scoped>
.popupContainer {
  background-color: gainsboro;
  height: 100%;
  /* padding-bottom: 20%; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
.listContainer {
  height: 85%;
  width: 95%;
  background-color: lightgrey;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0.2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}
</style>

<style>
.addNewItemToListBtn {
  border-radius: 7px;
  margin-top: 1rem;
  height: 3rem;
}

.addNewItemToListBtn .van-button__content {
  height: 2rem;
  font-size: 1.2rem;
}

@media only screen and (max-width: 470px) {
  .addNewItemToListBtn .van-button__content {
  }
}
</style>
