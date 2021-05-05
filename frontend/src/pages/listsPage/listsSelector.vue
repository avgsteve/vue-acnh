<script>
import { defineComponent } from 'vue'
import LIST from '../../../store/modules/listData/listDataTypes'
export default defineComponent({
  name: 'ListSelector',
  components: {},
  setup: () => {},
  props: {},
  data() {
    return {
      data_nameOfSelectedList: '',
      data_currentListData: {},
      data_toggleManageListMode: false,
      data_toggleCopyListMode: false
    }
  },
  computed: {
    computed_currentLists() {
      const currentLists = this.$store.getters[`listData/${LIST.GET_LISTS_OF_SELECTED_LIST_TYPE}`]
      // console.log('computed_currentLists: ', currentLists)
      return currentLists
    }
  },
  watch: {
    // 如果選擇的List變化了，就要記錄到store裡面可以方便直接查詢store裡面的紀錄去搜尋要刪除的檔案
    data_nameOfSelectedList() {
      // 找出選擇的list目前的index
      const nameOfSelectedList = this.data_nameOfSelectedList
      const currentType = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST_TYPE}`]
      const currentLists = Array.from(
        this.$store.getters[`listData/${LIST.GET_LISTS_OF_SELECTED_LIST_TYPE}`]
      )
      const indexOfSelectedList = currentLists.findIndex((e) => nameOfSelectedList === e.name)

      // console.log('selectedList: ', `${currentType}.${indexOfSelectedList}`)

      // 到index後更新store的listType和被選擇的list index
      this.$store.dispatch(
        `listData/${LIST.SET_SELECTED_LIST}`,
        `${currentType}.${indexOfSelectedList}`
      )
    }
  },
  created() {},
  // 透過 mounted() 階段檢查 選擇的list和index是否能對應到目前list type裡面的資料
  mounted() {
    const selectedList = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST}`]
    if (!selectedList) this.$store.dispatch(`listData/${LIST.SET_SELECTED_LIST}`, 'collection.0')
  },
  unmounted() {},
  methods: {
    categoryClicked() {
      // 1) update store
      const nameOfSelectedList = this.data_nameOfSelectedList
      const currentType = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST_TYPE}`]
      const currentLists = Array.from(
        this.$store.getters[`listData/${LIST.GET_LISTS_OF_SELECTED_LIST_TYPE}`]
      )
      const indexOfSelectedList = currentLists.findIndex((e) => nameOfSelectedList === e.name)

      this.$store.dispatch(
        `listData/${LIST.SET_SELECTED_LIST}`,
        `${currentType}.${indexOfSelectedList}`
      )

      // 2) emit to parent
      this.$emit('indexOfSelectedListClicked', indexOfSelectedList)
    },
    toggleManageListMode() {
      this.$emit('toggleManageListMode')
      this.data_toggleCopyListMode = false
      this.data_toggleManageListMode = !this.data_toggleManageListMode
      console.log('清單管理模式:', this.data_toggleManageListMode)
    }
  }
})
</script>

<template>
  <van-tabs
    class="listsSelector"
    @click="categoryClicked($event)"
    v-model:active="data_nameOfSelectedList"
    :ellipsis="false"
  >
    <span class="listsSelector__heading">
      {{ $t(`ui.list.list`) }}

      <!-- 切換管理清單模式的開關 -->
      <span
        class="manageList"
        @click="toggleManageListMode"
        :class="{ active: data_toggleManageListMode }"
      >
        [
        <span>管理清單</span>
        <van-icon name="setting-o" />
        ]
      </span>
    </span>

    <!-- 清單選擇tab在管理模式開啟的時候會被停用 :disabled="data_toggleManageListMode"
    -->
    <van-tab
      title-class="selectorTab"
      :disabled="data_toggleManageListMode"
      v-for="(list, index) in computed_currentLists"
      :key="index"
      :title="list.name"
      :name="list.name"
    >
    </van-tab>
  </van-tabs>
</template>

<style scoped>
.categoryHeading {
  font-size: 2rem;
  margin: 1rem 0;
}

.listsSelector {
  border-left: 3px solid rgba(128, 128, 128, 0.459);
  /* border-bottom: 1px solid rgba(117, 117, 117, 0.123); */
  margin-left: 0.8rem;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .listsSelector {
    font-size: 0.8rem;
  }
}

.listsSelector__heading {
  position: absolute;
  /* width: 5rem; */
  top: -4px;
  left: 0.9rem;
  font-size: 1.1rem;
  color: rgba(155, 155, 155, 0.829);
  transition: all 0.3s ease-out;
  display: flex;
  align-items: baseline;
  /* align-items: flex-start; */
}

.listsSelector__heading .manageList {
  cursor: pointer;
  color: rgba(155, 155, 155, 0.829);
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
}

.listsSelector__heading .manageList.active {
  color: rgba(243, 42, 42, 0.829);
  font-size: 1.1rem;
}

@media only screen and (max-width: 600px) {
  .manageList {
    font-size: 1rem;
  }
}

.listsSelector__heading .manageList:hover {
  color: rgba(243, 132, 42, 0.829);
}

.listsSelector__heading .manageList.active i {
  color: rgba(243, 42, 42, 0.829);
  font-size: 1.3rem;
  font-weight: 700;
}

@media only screen and (max-width: 600px) {
  .manageList .listsSelector {
    margin-left: 0.4rem;
  }

  .listsSelector__heading {
    top: -6px;
    left: 0.9rem;
    font-size: 1rem;
    width: fit-content;
  }
}

@media only screen and (max-width: 400px) {
  .listsSelector {
    margin-left: 0.2rem;
  }

  .listsSelector__heading {
    top: -2px;
    left: 0.3rem;
    /* font-size: 0.8rem; */
  }
}

.listsSelector:hover {
  border-left: 3px solid rgba(236, 160, 18, 0.883);
}

.listsSelector:hover .listsSelector__heading {
  color: rgba(241, 167, 28, 0.842);
}
</style>

<style>
.listTypeSelector .van-tabs--line .van-tabs__wrap {
  overflow-x: scroll;
  height: 100%;
}

.listsSelector__heading .manageList i {
  transform: translateY(2px);
  transition: all 0.3s ease-out;
  font-size: 1.2rem;
}

.listsSelector__heading .manageList i:hover {
  color: rgba(243, 132, 42, 0.829);
  font-size: 1.2rem;
}

.listsSelector .van-tabs__nav {
  background-color: transparent;
  margin-left: 0.4rem;
  /* max-width: 2rem; */
}

.listsSelector .van-tab {
  width: 8rem;
  display: flex;
  height: 4rem;
  align-items: center;
  font-size: 1.2rem;
  padding-top: 8.5px;
  overflow-x: auto;
}

.listsSelector .van-tab .van-tab__text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.listsSelector .van-tabs__wrap {
  height: 4rem;
}

.listsSelector::-webkit-scrollbar {
  /* height: 1px;
  background: gray; */
  display: none;
}
</style>