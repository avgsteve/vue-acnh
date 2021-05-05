<script>
import { defineComponent } from 'vue'
import SectionComponent from '../LAYOUT/sectionComponent.vue'
import ListTypeSelector from './listTypeSelector.vue'
import ListSelector from './listsSelector.vue'
import ListManager from './listsManager.vue'
import ListCopyMode from './listCopyMode.vue'
import draggable from 'vuedraggable'
import ItemCard from './../../components/ItemCard/ItemCard.vue'
import ItemCardBody from './../../components/ItemCard/ItemCardBody.vue'
import DetailedCardContent from './../../components/ItemCard/detailedCardContent.vue'

import LIST from './../../../store/modules/listData/listDataTypes'

import { Toast } from 'vant'

export default defineComponent({
  name: 'listsPage',
  components: {
    SectionComponent,
    ListTypeSelector,
    ListSelector,
    draggable,
    ListManager,
    ListCopyMode,
    ItemCard,
    ItemCardBody,
    DetailedCardContent
  },
  data() {
    return {
      data_isLoading: true,
      data_indexOfSelectedListClicked: 0,
      data_hideDraggableList: false,
      data_showDragModeList: false,
      data_manageListMode: false,
      data_copyListMode: false,
      data_dataOfClickedList: {},
      data_cardSettingAndData: {
        // showCard: true, // 如果設定為 true 就會讓卡片顯示在葉面上
        cardTitle: '',
        setting: {
          closeOnClickOverlay: true,
          showCancelBtn: false,
          showLoader: true // 改為透過 ItemCard　的 watch 自動修改
        },
        data: {}
      }
    }
  },
  computed: {
    computed_dataOfClickedList: {
      get() {
        let dataOfSelectedList = Array.from(
          this.$store.getters[`listData/${LIST.GET_DATA_OF_SELECTED_LIST}`]
        )

        for (const item of dataOfSelectedList) {
          item.uid = item.id + item.type + item.qty
          // 建立.uid 是為了避免重複的item .id讓 draggable 出錯
          if (
            item.category === 'Fish' ||
            item.category === 'Insects' ||
            item.category === 'Sea Creatures'
          ) {
            item.isCreature = true
          }
        }

        console.log('dataOfSelectedList:', dataOfSelectedList)

        return dataOfSelectedList
      },
      set(updatedData) {
        this.$store.commit(`listData/${LIST.SET_DATA_IN_SELECTED_LIST}`, updatedData)
      }
    }
  },
  watch: {
    computed_dataOfClickedList() {
      this.data_dataOfClickedList = this.computed_dataOfClickedList
    },
    // 排序模式啟用時，將畫面的列表模式跟複製模式關掉
    data_showDragModeList() {
      if (this.data_showDragModeList === true) {
        this.data_manageListMode = false
        this.data_copyListMode = false
      }
    },
    data_copyListMode() {
      if (this.data_copyListMode === true) {
        // 將排序模式按鈕關閉，因為複製模式不需要排序，也避免Store中的影響資料
        this.data_showDragModeList = false
        this.data_manageListMode = false
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUnmount() {},
  methods: {
    // 從 子組件 ListTypeSelector 收到選擇的 list index 是多少
    event_indexOfSelectedListClicked(indexOfSelectedListClicked) {
      console.log('receiving event_indexOfSelectedListClicked:', indexOfSelectedListClicked)
      this.data_indexOfSelectedListClicked = indexOfSelectedListClicked
    },
    // 透過 Vue Store 去刪除list 裡面的項目
    deleteItem(item) {
      const confirmToDelete = window.confirm('Delete item?')
      if (confirmToDelete) {
        console.log('item to delete:', item)
        this.$store.commit(`listData/${LIST.DELETE_ITEM_FROM_LIST}`, item)
      }
      if (!confirmToDelete) return
    },
    showSwitchTransition() {
      this.data_hideDraggableList = true
      setTimeout(() => {
        this.data_hideDraggableList = false
      }, 500)
    },
    changeItemQty(updatedItem) {
      // console.log('更新數量:', updatedItem.tempQty)
      this.$store.commit(`listData/${LIST.UPDATE_ITEM_IN_LIST}`, updatedItem)
    },
    toggleManageListMode() {
      this.data_manageListMode = !this.data_manageListMode
      if (this.data_manageListMode === true) {
        this.data_copyListMode = false
        this.data_hideDraggableList = false
      }
    },
    // 關閉 ItemCard 的 method
    clickCardConfirmEventHandler(data) {
      console.log('data in clickCardConfirmEventHandler: ', data)
      this.data_cardSettingAndData.showCard = false
    },
    // 取得 ItemCard 資料的 method
    clickItemForDetail(nameOfClickedItem, id) {
      /*
        功能: 
          1.發送物品名稱到API取得物品資料
          2.將取得的資料寫入 data_cardSettingAndData ，作為傳入 ItemCard 的 prop_cardData 屬性的資料
          3.讀取完資料之後再開啟ItemCard彈窗          
      */

      this.axios.get(`/api/ac/items/detailed-data?name=${nameOfClickedItem}`).then((response) => {
        const data = response.data
        data.idForTranslation = id // 加上 .idForTranslation 屬性
        // console.log('API取回的資料:', data)
        this.data_cardSettingAndData.data = data
        this.data_cardSettingAndData.showCard = true

        setTimeout(() => {
          // 把 ItemCard 的讀取動畫移除
          this.data_cardSettingAndData.setting.showLoader = false
        }, 400)
      })
    }
  }
})
</script>


<template>
  <div class="listsPageContainer">
    <!--  -->
    <SectionComponent class="no-margin" :props_title="$t(`ui.list.list`)" :props_subtitle="''">
      <div class="selectors">
        <ListTypeSelector @indexOfSelectedListClicked="event_indexOfSelectedListClicked" />

        <!-- 清單選擇畫面，含有控制管理模式跟複製模式的開關 event -->
        <ListSelector @click="showSwitchTransition" @toggleManageListMode="toggleManageListMode" />
      </div>

      <div class="listContainer">
        <!-- 
          複製模式與排序模式的開關 
          -->
        <div v-if="computed_dataOfClickedList.length !== 0 && data_manageListMode === false">
          <!-- 
            拖曳DOM element 排序模式
            -->
          <div class="modeSwitch">
            <span class="modeSwitchText"> 排序模式 </span>
            <van-switch v-model="data_showDragModeList" size="22px" />
          </div>
          <!-- 
            複製模式 
            -->
          <div class="modeSwitch">
            <span class="modeSwitchText"> 複製模式 </span>
            <van-switch v-model="data_copyListMode" size="22px" />
          </div>
        </div>

        <!-- 1) 
        清單列表模式 
        -->
        <div v-if="!data_manageListMode && !data_copyListMode">
          <p class="dragAndReorderText" v-if="data_showDragModeList"> Drag to reorder </p>

          <!-- 一般模式清單: 如果 data_showDragModeList (排序模式) 開啟的話就不會顯示這個清單 
          -->
          <div v-if="!data_showDragModeList">
            <div
              v-for="(element, index) in computed_dataOfClickedList"
              class="listItem"
              :key="element.uid"
            >
              <div class="index"> {{ index + 1 }}. </div>

              <!-- 名稱顯示: 如果分類是物品類的話，在i18n的查詢方式就是($t(`items.item.${名稱})  -->
              <div
                class="name"
                v-if="!element.isCreature"
                @click="clickItemForDetail(element.name, element.id)"
              >
                {{ $t(`items.item.${element.name.split("'").join('')}`) }}
              </div>
              <!-- 名稱顯示: 如果分類是生物類的話，在i18n的查詢方式就是($t(`creatures.${名稱})  -->
              <div
                class="name"
                v-if="element.isCreature"
                @click="clickItemForDetail(element.name, element.id)"
              >
                {{ $t(`creatures.${element.name.split("'").join('')}`) }}
              </div>

              <!-- 類別顯示:  如果分類是物品類的話，在i18n的查詢方式就是($t(`creatures.${名稱})  -->
              <div class="category" v-if="!element.isCreature">
                <span>🏷️&nbsp; </span>
                {{ $t(`items.category.${element.category.toLowerCase()}`).split('/')[0] }}
              </div>

              <!-- 類別顯示: 如果分類是生物類的話，在i18n的查詢方式就是($t(`creatures.${名稱})  -->
              <div class="category" v-if="element.isCreature">
                <span>🏷️&nbsp; </span>
                {{ $t(`creatures.categories.${element.category}`).split('/')[0] }}
              </div>

              <div class="recipe">
                <span class="item-type"> {{ $t(`ui.description.type`) }} : </span>

                <img :src="element.type === 'recipe' ? 'recipe' : 'item'" alt="" />
                <span class="item-type">
                  {{ $t(`ui.description.${element.type}`) }}
                </span>
              </div>
              <div class="qty">
                <van-stepper
                  class="list-qty-stepper"
                  v-model="element.qty"
                  :min="0"
                  :max="99"
                  @click="changeItemQty(element)"
                />
              </div>
              <div class="deleteBtn" @click="deleteItem(element)"
                ><van-icon name="delete-o" />
              </div>
            </div>

            <!-- 如果清單為空的話顯示訊息 -->
            <div v-if="computed_dataOfClickedList.length === 0">
              <h3>This list is empty</h3>
            </div>
          </div>

          <van-loading
            class="preload"
            v-if="data_hideDraggableList && data_showDragModeList"
            type="circular"
            size="60"
          />

          <!-- draggable 模式清單: 如果 data_showDragModeList 開啟才會顯示這個清單 -->
          <div
            class="draggableList"
            :class="{ hidden: data_hideDraggableList }"
            v-if="data_showDragModeList"
          >
            <draggable
              v-model="computed_dataOfClickedList"
              tag="transition-group"
              item-key="uid"
              :component-data="{ name: 'fade' }"
            >
              <!-- draggable 模式清單的 item -->
              <template #item="{ element, index }">
                <div class="listItem" :class="'item#' + index">
                  <div class="index"> #{{ index + 1 }} </div>
                  <div class="name"> {{ $t(`items.item.${element.name}`) }} </div>
                  <div class="category">
                    {{ $t(`items.category.${element.category.toLowerCase()}`).split('/')[0] }}
                  </div>
                  <div class="recipe">
                    <img :src="element.type === 'recipe' ? 'recipe' : 'item'" alt="" />
                    <span>
                      {{ $t(`ui.description.type`) }}
                    </span>
                  </div>
                  <div class="qty">
                    {{ element.qty }}
                  </div>
                  <div class="deleteBtn" @click="deleteItem(element)"
                    ><van-icon name="delete-o" />
                  </div>

                  <!-- <div> {{ id }} </div> -->
                </div>
              </template>
            </draggable>
          </div>
        </div>

        <!-- 2)  清單管理模式的開關
        -->
        <div v-if="data_manageListMode">
          清單管理模式

          <ListManager :prop_dragMode="data_showDragModeList" />
        </div>

        <!-- 3) 複製清單文字模式
        -->
        <div v-if="data_copyListMode">
          <h4> 複製清單文字模式 </h4>
          <ListCopyMode :prop_dataOfClickedList="data_dataOfClickedList" />
        </div>

        <!-- 4) 
          點擊清單的物件後彈出物件詳細資訊的的彈窗
          透過 prop_cardData ，控制彈窗的彈出功能和顯示內容
        -->

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
    </SectionComponent>
  </div>
</template>
<style scoped>
.listsPageContainer {
  /* border: 0.5rem dashed rgb(0, 255, 13); */
  background-color: rgb(208 205 109 / 38%);
  padding: 0.1rem;
  height: 100%;
  position: relative;
  border-radius: 10px;
}

.modeSwitch {
  display: flex;
  /* position: absolute;
  top: 2.3rem;
  right: 2rem; */
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

@media only screen and (max-width: 500px) {
  .modeSwitch {
    display: flex;
    /* position: absolute;
    top: 0.6rem;
    right: 1rem; */
    justify-content: center;
    align-items: center;
  }
}

.modeSwitch .modeSwitchText {
  white-space: nowrap;
  padding-right: 0.4rem;
}

.listsPageContainer .section-content {
  padding: 0 0 1rem;
}

.listContainer {
  overflow-x: scroll;
  width: 100%;
  margin-top: 1rem;
}

.preload {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3rem 0 2rem;
  padding-bottom: 1.8rem;
  color: orange;
}

.dragAndReorderText {
  width: 100%;
  text-align: left;
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: -5px;
  font-size: 1.6rem;
  color: rgba(153, 152, 152, 0.815);
}

.draggableList {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem;
  padding-bottom: 0.8rem;
  transition: all 0.3s ease-out;
}

.draggableList.hidden {
  display: none;
}

.listItem {
  display: flex;
  flex-wrap: nowrap;
  /* height: 2.5rem; */
  height: fit-content;
  /* background-color: rgba(142, 214, 108, 0.288); */
  margin: 0 0 0.5rem 0;
  padding: 10px 0 14px 1rem;
  align-items: center;
  border-radius: 7px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  background-color: rgba(187, 187, 187, 0.945);

  box-shadow: 0px 2px 13px -7px rgba(0, 0, 0, 0.5);
  /* justify-content: space-evenly; */
  transition: all 0.4s ease-out;
  position: relative;
  overflow-x: scroll;
  /*  */
  padding-top: 8px;
}

@media only screen and (max-width: 500px) {
  .listItem {
    padding-top: 12px;
  }
}

.listItem > div {
  /* height: 2.3rem; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* flex-wrap: nowrap; */
  margin-bottom: -10px;
}

.listItem.header {
  width: 100%;
  color: rgba(128, 128, 128, 0.767);
}

.listItem .index {
  width: 2rem;
}

.listItem .name {
  font-size: 1.2rem;
  width: 10rem;
  text-align: left;
  margin-left: 0.45rem;
}

.listItem .category {
  font-size: 1.2rem;
  /* word-wrap: break-word; */
  /* white-space: pre-wrap; */
  /* width: 8rem; */
  margin-left: 0.65rem;
  margin-right: 3rem;
  white-space: nowrap;
}

.listItem .item-type {
  font-size: 1rem;
  /* width: 3rem; */
  white-space: nowrap;
}

.listItem .recipe {
  font-size: 1.5rem;
  /* width: 5.5rem; */
  margin-right: 1rem;
}

.listItem .qty {
  font-size: 1.5rem;

  display: flex;
  flex-direction: row;
  margin-right: 1.8rem;
}

.listItem .deleteBtn {
  width: 2rem;
  font-size: 1.6rem;
  margin-right: 1rem;
}

::-webkit-scrollbar {
  width: 0px;
  /* display: none; */
}

@media only screen and (max-width: 500px) {
  ::-webkit-scrollbar {
    width: 0px;
    /* display: none; */
  }

  .listItem .index {
    width: 1.2rem;
  }

  .listItem .name {
    font-size: 1.2rem;
    width: 12rem;
    text-align: left;
    margin-left: 0.45rem;
    min-width: 8rem;
    max-width: 12rem;
  }

  .listItem .category {
    font-size: 1.2rem;
    /* word-wrap: break-word; */
    /* white-space: pre-wrap; */
    width: 8rem;
    margin-left: 1.4rem;
    margin-right: 4rem;
  }

  .listItem .recipe {
    font-size: 2rem;

    margin-right: 2rem;
  }

  .listItem .qty {
    font-size: 1.5rem;

    display: flex;
    flex-direction: row;
    margin-right: 1.8rem;
  }

  .listItem .deleteBtn {
    width: 2rem;
    font-size: 1.6rem;
    margin-right: 1rem;
  }
}
</style>

<style>
.section-container.no-margin {
  margin: 0.1rem;
  border-radius: 20px;
}

.selectors {
  display: flex;
  justify-content: stretch;
  /* background-color: papayawhip; */
  padding: 0.4rem 0.5rem 1rem;
  box-shadow: -1px 3px 13px -6px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  position: relative;
  /* width: 100%; */
}

@media only screen and (max-width: 500px) {
  .selectors {
    padding: 0.2rem 0.5rem 0.3rem;
  }
}

.selectors > div {
  height: 5rem;
}

.list-qty-stepper {
  display: flex;
}
</style>
