<script >
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import { Toast } from 'vant'

import LIST from './../../../store/modules/listData/listDataTypes'
export default defineComponent({
  name: 'ListManager',
  components: { draggable },
  setup: () => {},
  props: {},
  data() {
    return {
      data_showAddNewListDialog: false,
      data_showEditListNameDialog: false,
      data_oldNameOfCurrentList: '',
      data_newNameOfCurrentList: '',
      data_newListName: '',
      data_showWarningMessage: false,
      data_warningMessage: '',
      data_showDragModeList: false
    }
  },
  computed: {
    computed_currentListData: {
      get() {
        let currentList = this.$store.getters[`listData/${LIST.GET_LISTS_OF_SELECTED_LIST_TYPE}`]
        return currentList
      },
      set(updatedData) {
        this.$store.commit(`listData/${LIST.REORDER_LISTS}`, updatedData)
      }
    }
  },
  watch: {
    data_showDragModeList() {
      console.log('清單排序模式開關:', this.data_showDragModeList)
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    deleteList(listName) {
      const confirmToDelete = window.confirm(`${this.$t('ui.list.deleteList')}: "${listName}" ? `)
      if (confirmToDelete) {
        console.log('confirmToDelete:', confirmToDelete)

        Toast.success('更新清單成功!')
        this.$store.commit(`listData/${LIST.REMOVE_CURRENT_LIST}`, listName)
      }
    },
    // 更新清單名稱的功能
    openEditListNameModal(currentName) {
      this.data_showEditListNameDialog = true
      this.data_oldNameOfCurrentList = currentName
      this.data_newNameOfCurrentList = currentName
      // ↑ 讓 modal input 裡面可以出現目前的名稱
    },
    confirmUpdateListName(event) {
      const oldListName = this.data_oldNameOfCurrentList
      const newListName = this.data_newNameOfCurrentList
      const existingLists = this.computed_currentListData
      const self = this
      function removeWarning() {
        setTimeout(function () {
          self.data_showWarningMessage = false
        }, 1500)
      }

      if (event === 'cancel') return true
      // 如果傳回的值是true才能讓modal關掉
      // 是透過 @cancel="cancelUpdateListName('cancel')" 傳入 event 的值

      if (oldListName === newListName) {
        this.data_showEditListNameDialog = false
        return
      }

      if (newListName === '') {
        this.data_showWarningMessage = true
        this.data_warningMessage = '清單名稱不可以為空白'
        removeWarning()
        return false
      }

      for (const list of existingLists) {
        console.log('list.name: ', list.name)
        if (newListName === list.name) {
          this.data_showWarningMessage = true
          this.data_warningMessage = '清單名稱不可以重複'
          removeWarning()
          return false
        }
      }

      Toast.success('更新清單成功!')
      this.$store.commit(`listData/${LIST.UPDATE_LIST_NAME}`, { newListName, oldListName })

      this.data_showEditListNameDialog = false
      return false
    },
    // 取消更新清單名稱的提示訊息
    cancelUpdateListName() {
      Toast.fail('取消')
      return true
    },
    // 開啟新增清單的Modal
    showAddNewListModal() {
      this.data_showAddNewListDialog = true
    },
    // 新增清單的Modal的清單名稱輸入和驗證
    confirmAddNewList(e) {
      this.data_showAddNewListDialog = true
      const nameOfNewList = this.data_newListName
      const existingLists = this.computed_currentListData

      // console.log('傳進confirmAddNewList的參數:', e)
      if (e === 'cancel') return true
      // 如果傳回的值是true才能讓modal關掉

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
        if (nameOfNewList === list.name) {
          this.data_showWarningMessage = true
          this.data_warningMessage = '清單名稱不可以重複'
          removeWarning()
          return false
        }
      }

      Toast.success('新增清單成功!')
      this.$store.dispatch(`listData/${LIST.CREATE_NEW_LIST}`, nameOfNewList)
      this.data_showAddNewListDialog = false

      return false
    },
    cancelAddNewList() {
      // console.log('呼叫cancelAddNewList')
      Toast.fail('取消')
      return true
    }
  }
})
</script>

<template>
  <div class="listManager">
    <!-- 新增清單的按鈕 -->

    <div class="addNewList" @click="showAddNewListModal">
      {{ $t(`ui.list.addNewList`) }}
      <van-icon class="addNewListIcon" name="add-o" />
    </div>

    <!-- 切換排序功能的開關 -->
    <div class="dragModeSwitch">
      <span class="dragModeSwitchText"> 排序模式 </span>
      <van-switch v-model="data_showDragModeList" size="22px" />
    </div>

    <!-- 排序列表模式 -->
    <h4 v-if="data_showDragModeList" class="dragModeText">
      <!-- 提示排序功能的文字 -->
      {{ $t(`ui.list.dragToReorder`) }}
    </h4>

    <!-- 排序列表模式的主要組件: 
    要在 draggable 標籤外使用一層 div 作為 wrapper，
    讓draggable 標籤在排序模式被關閉的時候被移出DOM，這樣才能在下一次排序模式被開啟的時候重新讀取
    Store 裡面的列表資料
    -->
    <div v-if="data_showDragModeList">
      <draggable
        v-model="computed_currentListData"
        tag="transition-group"
        item-key="name"
        :component-data="{ name: 'fade' }"
      >
        <!-- 排序列表模式的list item -->
        <template #item="{ element, index }">
          <div class="list">
            <!-- 欄位一:清單編號跟名稱 -->
            <div class="listProperty listName">
              <div class="index"> {{ $t(`ui.list.list`) }} {{ index + 1 }}: </div>
              <div class="name">
                <span> {{ element.name }} </span>
              </div>
            </div>

            <!--清單列表項目的物品數量跟刪除按鈕  -->
            <div class="listProperty listLength">
              <div> {{ $t(`ui.list.items`) }}: {{ element.items.length }} </div>
              <div class="btn" @click.stop="deleteList(element.name)">
                <span @click.stop="deleteList(element.name)"
                  >&nbsp; <van-icon name="delete-o" />
                </span>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <!-- 一般列表模式 -->
    <div v-if="!data_showDragModeList" class="listMode">
      <div class="list" v-for="(list, index) in computed_currentListData" :key="list.name">
        <!-- 
          一般模式的列表:
          清單列表項目的基本屬性 -->
        <!-- 欄位一:清單編號跟名稱 -->
        <div class="listProperty listName" @click="openEditListNameModal(list.name)">
          <div class="index"> {{ $t(`ui.list.list`) }} {{ index + 1 }}: </div>
          <div class="name">
            <span class="editListName"> ✏️ </span>
            <span> {{ list.name }} </span>
          </div>
        </div>

        <!--清單列表項目的物品數量跟刪除按鈕  -->
        <div class="listProperty listLength">
          <div> {{ $t(`ui.list.items`) }}: {{ list.length }} </div>
          <div class="btn" @click.stop="deleteList(list.name)">
            <span @click.stop="deleteList(list.name)">&nbsp; <van-icon name="delete-o" /> </span>
          </div>
        </div>
      </div>
    </div>

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
        v-model="data_newListName"
        :label="$t(`ui.description.name`)"
        type="text"
        maxlength="15"
        show-word-limit
      />

      <van-notify v-model:show="data_showWarningMessage" type="warning">
        <van-icon name="bell" style="margin-right: 4px" />
        <span> {{ data_warningMessage }} </span>
      </van-notify>
    </van-dialog>

    <!--  修改清單名稱的Modal  -->
    <van-dialog
      class="addNewListDialog"
      v-model:show="data_showEditListNameDialog"
      :title="$t(`ui.list.updateList`)"
      :confirmButtonText="$t(`ui.button.confirm`)"
      :cancelButtonText="$t(`ui.button.cancel`)"
      show-cancel-button
      :beforeClose="confirmUpdateListName"
      @cancel="cancelUpdateListName('cancel')"
    >
      <van-field
        class="newListNameInputField updateOldName"
        v-model="data_newNameOfCurrentList"
        :label="$t(`ui.description.name`)"
        clearable
        type="text"
        maxlength="15"
        show-word-limit
      />

      <van-notify v-model:show="data_showWarningMessage" type="warning">
        <van-icon name="bell" style="margin-right: 4px" />
        <span> {{ data_warningMessage }} </span>
      </van-notify>
    </van-dialog>
  </div>
</template>



<style scoped>
.addNewList {
  background-color: #009ff5b0;
  width: fit-content;
  padding: 0.5rem 1rem;
  margin: 0.5rem auto 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.addNewList .addNewListIcon {
  margin-left: 0.5rem;
}

.dragModeSwitch {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.dragModeSwitch :first-child {
  margin-right: 0.8rem;
}

h4 {
  text-align: left;
  margin-bottom: 0.5rem;
  color: rgba(128, 128, 128, 0.678);
  font-size: 1.5rem;
}

.list {
  background-color: rgba(204, 207, 211, 1);
  padding: 0.3rem;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.list:hover {
  background-color: rgb(161, 180, 204);
}

@media only screen and (max-width: 400px) {
  .list {
    width: 100%;
    justify-content: flex-start;
    padding-left: 3rem;
    transition: all 0.4s ease-in-out;
  }
}

.listProperty {
  /* width: 100%; */
  max-width: 20rem;
  display: flex;
  justify-content: flex-start;
}

.listProperty > div {
  height: 2rem;
  display: flex;
  justify-content: center;

  align-items: center;
}

.listProperty > div:nth-child(1) {
  width: 5rem;
  justify-content: center;
}

.listProperty > div:nth-child(2) {
  margin-left: 1rem;
}
</style>

<style>
.updateOldName {
  position: relative;
}
</style>