<template>
  <van-row id="toolbarContainer" wrap>
    <van-col span="24" class="toolbar">
      <!--  -->
      <van-col span="6">
        <Searchbar
          :absolutePostion="true"
          @click="expandSearchBar"
          :prop_expandSearchBar="data_expandSearchBar"
          @updateInput="updateInput"
          @focused="focusStatus"
        ></Searchbar>
      </van-col>
      <!--  -->
      <van-col span="18">
        <DropDownMenu></DropDownMenu>
        <!-- <ToolbarButtons class="btns">
          <van-button
            v-for="item in itemsCategoriesData"
            v-bind:key="item"
            type="primary"
            plain
            size="normal"
          >
            {{ item }}
          </van-button>
        </ToolbarButtons> -->
      </van-col>
    </van-col>
  </van-row>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Searchbar from './../Searchbar/Searchbar.vue'
import ToolbarButtons from './ToolbarButtons.vue'
import DropDownMenu from './DropDownMenu.vue'
import { useStore } from 'vuex'
import ITEMS from '../../../store/modules/itemsData/itemsDataTypes'

export default defineComponent({
  name: 'Toolbar',
  components: { Searchbar, ToolbarButtons, DropDownMenu },
  props: {},
  setup() {
    const store = useStore()
    const count = computed(() => store.state.count)

    return {
      count
    }
  },
  data() {
    let itemCategories = this.$store.getters[`itemsData/${ITEMS.GET_ITEM_CATEGORIES}`]

    return {
      itemCategories,
      searchInput: '',
      data_expandSearchBar: false,
      data_searchBarFocused: false
    }
  },
  computed: {
    computed_categoryOptions() {
      let itemCategories = this.computed_itemCategories
    },
    computed_itemCategories() {
      let style = 'background: #222; color: #bada55'
      let itemCategories = this.$store.getters[`itemsData/${ITEMS.GET_ITEM_CATEGORIES}`]
      // if (!Array.isArray(itemCategories))
      //   return console.log(`Can't not fetch itemCategories from store!`)
      console.log('Toolbar.vue 的 computed_itemCategories', itemCategories)
      return itemCategories
    },
    computed_selectedCategory() {
      let selectedCategory = this.$store.getters[`itemsData/${ITEMS.GET_SELECTED_CATEGORY}`]
      console.log('Toolbar.vue的 computed_selectedCategory:', selectedCategory)
      return selectedCategory
    }
  },
  methods: {
    updateInput(inputText) {
      this.searchInput = inputText
    },
    expandSearchBar() {
      this.data_expandSearchBar = true
      setTimeout(() => {
        if (this.searchInput === '' && !this.data_searchBarFocused)
          this.data_expandSearchBar = false
      }, 3000)
    },
    focusStatus(focused) {
      if (focused) this.data_searchBarFocused = focused
      if (!focused) this.data_searchBarFocused = !focused
      if (!focused && this.searchInput === '') {
        setTimeout(() => {
          this.data_expandSearchBar = false
        }, 1000)
      }
    }
  }
})
</script>

<style scoped>
#toolbarContainer {
  display: flex;
  justify-content: space-around;
  background-color: rgba(245, 245, 245, 0.548);
  border-radius: 17px;
  box-shadow: 2px 3px 10px -6px rgba(0, 0, 0, 0.75);
  height: fit-content;
  width: 95%;
  margin: 0 auto;
  position: fixed;
  top: 1rem;
  z-index: 100;
}

@media only screen and (max-width: 470px) {
  #toolbarContainer {
    top: 0.4rem;
  }
}

.toolbar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f4de;
  border-radius: 17px;
}

.btns * {
  min-width: fit-content;
  margin-right: 1rem;
}
</style>

<style>
.consoleLogColor {
  height: 300px;
  width: 300px;
  border: 1px solid red;
}
</style>
