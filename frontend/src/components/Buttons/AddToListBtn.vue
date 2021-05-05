<template>
  <div class="add-to-list-btn" @click.stop="openPopupList" :title="$t(`ui.button.addToList`)">
    <van-icon name="records" class="add-to-list-btn-icon" />
    <!-- <Popup :prop_showPopup="data_popupDisplay" @popupClosed="popupClosed" /> -->
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
// import Popup from './AddToListBtn/Popup.vue'
import GLOBALSTATE from './../../../store/modules/globalState/globalStateTypes'
import LIST from './../../../store/modules/listData/listDataTypes'
export default defineComponent({
  name: 'AddToListBtn',
  components: {},
  setup: () => {},
  props: {
    // 每一個 AddToListBtn 在建立的時候會被傳入 prop_itemData，取得每個物件的資料
    // 並透過 openPopupList method 去更新 store 裡面選取的資料
    prop_itemData: { type: Object, required: true }
  },
  data() {
    return {
      dataObj: null
    }
  },
  computed: {},
  watch: {
    data_popupDisplay() {
      this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_NAVBAR_STATUS}`, !this.data_popupDisplay)
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    openPopupList() {
      // 按下 <AddToListBtn>之後就會將物件的資料(prop_itemData)傳進store讓其他組件使用
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_ITEM_DATA}`, this.prop_itemData)
      this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_LIST_POPUP_STATUS}`, true)
      // console.log('要選取到清單的物件: ', this.prop_itemData)
    },
    popupClosed() {
      // console.log('receiving popupClosed')
      this.$store.dispatch(`globalStatus/${GLOBALSTATE.SET_LIST_POPUP_STATUS}`, false)
    }
  }
})
</script>
<style scoped>
</style>

<style>
.add-to-list-btn {
  position: absolute;
  /* background-color: bisque; */
  top: 0;
  right: 0;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
}

.add-to-list-btn.no_absolutePosition {
  position: unset;
}

.add-to-list-btn-icon {
  font-size: 1.2rem;
  transition: all 0.2s ease-out;
  color: rgba(128, 128, 128, 0.568);
}

.add-to-list-btn-icon:hover {
  font-size: 1.8rem;
  color: rgba(60, 97, 219, 0.877);
}
</style>