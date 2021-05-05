<template>
  <div class="currentLists">
    <div class="listSelector">
      <van-field
        class="listSelector__menu"
        v-model="computed_optionsForListSelector.value"
        readonly
        clickable
        :label="$t(`ui.list.currentList`) + ':'"
        :placeholder="computed_menuTitle"
        :default-index="data_indexOfSelectedList"
        @click="data_showListSelector = true"
      />

      <van-popup v-model:show="data_showListSelector" round position="bottom">
        <!-- list的選擇器 -->
        <van-picker
          :columns="computed_optionsForListSelector"
          @cancel="data_showListSelector = false"
          @confirm="getValueOfSelectedList"
          :confirm-button-text="$t(`ui.button.confirm`)"
          :cancel-button-text="$t(`ui.button.cancel`)"
        />
      </van-popup>
    </div>
    <van-icon
      name="add-o"
      class="addNewListBtn"
      :title="$t(`ui.list.addNewList`)"
      @click="showAddNewListModal"
    />

    <!--  新增清單的Modal  -->
    <van-dialog
      class="addNewListDialog"
      v-model:show="data_showAddNewListDialog"
      :title="$t(`ui.list.addNewList`)"
      :confirmButtonText="$t(`ui.button.confirm`)"
      :cancelButtonText="$t(`ui.button.cancel`)"
      show-cancel-button
      :beforeClose="confirmAddNewList"
      @cancel="cancelAddNewList('cancel')"
    >
      <van-field
        class="newListNameInputField"
        maxlength="15"
        show-word-limit
        v-model="data_newListName"
        :label="$t(`ui.description.name`)"
      />

      <van-notify v-model:show="data_showWarningMessage" type="warning">
        <van-icon name="bell" style="margin-right: 4px" />
        <span> {{ data_warningMessage }} </span>
      </van-notify>
    </van-dialog>
  </div>
</template>
<script  >
import { Toast } from 'vant'
import { defineComponent } from 'vue'
import LIST from './../../../store/modules/listData/listDataTypes'

export default defineComponent({
  name: 'PopupListCurrentList',
  components: {},
  setup: () => {},
  props: {
    prop_currentListType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data_indexOfSelectedList: '',
      data_showListSelector: false,
      data_showAddNewListDialog: false,
      data_newListName: '',
      data_showWarningMessage: false,
      data_warningMessage: ''
    }
  },
  computed: {
    computed_currentCreatedLists() {
      return this.$store.getters[`listData/${LIST.GET_CREATED_LISTS}`]
    },
    // 當用來產生computed_selectedList的其他變數改變的時候，computed_selectedList也會隨之改變，透過watch監看 computed_selectedList的改變，emit 選擇的清單到父組件
    computed_selectedList() {
      return this.prop_currentListType + '.' + this.data_indexOfSelectedList
    },
    computed_currenListContent() {
      const listType = this.computed_selectedList.split('.')[0]
      const listIndex = parseInt(this.computed_selectedList.split('.')[1], 10)
      return this.computed_currentCreatedLists[listType][listIndex]
    },
    computed_optionsForListSelector() {
      const createdLists = this.$store.getters[`listData/${LIST.GET_CREATED_LISTS}`]
      const currentType = this.prop_currentListType
      const currentLists = Array.from(createdLists[currentType])
      const options = []
      for (let i = 0; i < currentLists.length; i++) {
        const list = currentLists[i]
        const optionItem = {
          text: list.name,
          value: i
        }
        options.push(optionItem)
      }
      // console.log('options:', options)
      return options
    },
    computed_menuTitle() {
      let text
      let options = this.computed_optionsForListSelector[this.data_indexOfSelectedList]
      if (!options) text = 'Select Lists'
      if (options) text = options.text

      return text
    }
  },
  watch: {
    computed_selectedList() {
      // console.log('目前的選單: ', this.computed_currentCreatedLists)
      this.$emit('selectedList', this.computed_selectedList)
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_LIST}`, this.computed_selectedList)
    },
    prop_currentListType() {
      this.data_indexOfSelectedList = 0
    }
  },
  created() {},
  mounted() {
    // const currentCreatedListsFromStore = this.$store.getters[`listData/${LIST.GET_CREATED_LISTS}`]
    // console.log(' 目前已經建立的清單: ', currentCreatedListsFromStore)

    let selectedList = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST}`]
    // console.log('mounted. 目前 selectedList: ', selectedList)
    if (!selectedList) {
      selectedList = this.prop_currentListType + '.' + 0
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_LIST}`, selectedList)
    }
    this.data_indexOfSelectedList = selectedList.split('.')[1]
  },
  unmounted() {},
  methods: {
    getValueOfSelectedList(value) {
      // console.log('picker裡面的value: ', value.value)
      this.data_indexOfSelectedList = value.value
      this.data_showListSelector = false
    },
    showAddNewListModal() {
      this.data_showAddNewListDialog = true
    },
    confirmAddNewList(e) {
      this.data_showAddNewListDialog = true
      const nameOfNewList = this.data_newListName
      const existingLists = this.computed_optionsForListSelector

      // console.log('傳進confirmAddNewList的參數:', e)
      if (e === 'cancel') return true
      // console.log('nameOfNewList: ', nameOfNewList)
      const removeWarning = () =>
        setTimeout(() => {
          this.data_showWarningMessage = false
        }, 1500)

      if (nameOfNewList === '') {
        this.data_showWarningMessage = true
        this.data_warningMessage = '清單名稱不可以為空白'
        removeWarning()
        return false
      }

      for (const list of existingLists) {
        if (nameOfNewList === list.text) {
          this.data_showWarningMessage = true
          this.data_warningMessage = '清單名稱不可以重複'
          removeWarning()
          return false
        }
      }

      Toast.success('新增清單成功!')
      this.data_showAddNewListDialog = false
      this.$store.dispatch(`listData/${LIST.CREATE_NEW_LIST}`, nameOfNewList)
      this.data_newListName = ''
      return false
    },
    cancelAddNewList() {
      // console.log('呼叫cancelAddNewList')
      Toast.fail('取消新增清單')
      this.data_newListName = ''

      return true
    }
  }
})
</script>
<style scoped>
.currentLists {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media only screen and (max-width: 470px) {
  .currentLists {
    max-width: 40rem;
  }
}

.currentLists .listSelector {
  min-width: 22rem;
  max-width: 27rem;
}

.currentLists .listSelector * {
  font-size: 1.1rem;
}

.currentLists .listSelector .listSelector__menu {
  border-radius: 7px;
  padding: 10px 15px 10px 20px;
}

@media only screen and (max-width: 470px) {
  .currentLists .listSelector {
    min-width: unset;
    max-width: unset;
    width: 85%;
    margin-top: 1rem;
  }
}

.currentLists .addNewListBtn {
  position: absolute;
  right: -38px;
  font-size: 1.8rem;
  color: rgba(27, 23, 233, 0.74);
}

@media only screen and (max-width: 470px) {
  .currentLists .addNewListBtn {
    position: absolute;
    top: 29px;
    right: -12px;
    font-size: 1.8rem;
    color: rgba(27, 23, 233, 0.74);
  }
}

.currentLists .addNewListBtn:hover,
.currentLists .addNewListBtn:active,
.currentLists .addNewListBtn:focus {
  font-size: 2rem;
  font-weight: 600;
  color: rgba(27, 23, 233, 0.74);
}
</style>

<style>
.listSelector .listSelector__menu .van-field__body input::placeholder {
  color: orange;
  font-size: 1.5rem;

  /* transform: translateY(2px); */

  overflow-x: scroll;
}

.currentLists .listSelector .van-field__label {
  display: flex;
  justify-self: flex-start;
  text-align: right;
  align-items: center;
  width: 4.3em;
  font-size: 1rem;
  margin-left: -9px;
  margin-right: 10px;
}

.currentLists .listSelector .van-field__body {
  padding-top: 0px;
  display: flex;
  justify-self: flex-start;
  text-align: right;
  align-items: center;
}

.currentLists .listSelector .van-field__control {
  height: 2rem;
}

.currentLists .listSelector .van-cell__value {
  display: flex;
  margin-left: 10px;
}

.currentLists .listSelector .van-field__control {
  height: 2rem;
}

/* 輸入新名字的Modal */

.newListNameInputField {
  width: 80%;
  margin: 1rem auto;
}

.newListNameInputField .van-field__label {
  font-size: 1.2rem;
  width: 3.5rem;
  margin-right: 10px;
}

.newListNameInputField .van-field__body {
  background-color: rgba(234, 239, 243, 0.562);
  border-radius: 4px;
}

.newListNameInputField .van-field__control {
  border-bottom: 2px solid rgba(167, 167, 167, 0.13);
  transition: all 0.3s ease-in-out;
  height: 2.5rem;
  font-size: 1.5rem;
}

.newListNameInputField .van-field__control:focus {
  border-bottom: 2px solid rgba(230, 137, 16, 0.726);
}
</style>