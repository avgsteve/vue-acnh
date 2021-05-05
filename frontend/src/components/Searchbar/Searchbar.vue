<template>
  <!-- 綁定的class: absolutePostion 會透過 <van-search> 的 onFocus handler 去改變狀態-->
  <div
    class="searchbar__container"
    :title="$t('searchBar.title')"
    v-bind:class="{
      absolutePostion: absolutePostion
    }"
  >
    <form
      action="/"
      class="searchbar__form"
      v-bind:class="{
        active: searchInputFocused,
        active: prop_expandSearchBar,
        absolutePostion: absolutePostion
      }"
    >
      <!--v-bind:show-action="toShowAction" -->
      <van-search
        class="searchbar__input"
        v-model="searchInputValue"
        v-bind:clearable="showClearIcon"
        v-bind:class="{
          active: searchInputFocused
        }"
        shape="round"
        :placeholder="$t('searchBar.placeHolder')"
        :title="$t('searchBar.title')"
        ref="input"
        @input="onSearch"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
        @focus="onFocus"
        @blur="outFocus"
      />
    </form>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
import { Toast } from 'vant'

import ITEMS from './../../../store/modules/itemsData/itemsDataTypes'

export default defineComponent({
  name: '',
  components: {},
  props: { absolutePostion: Boolean, prop_expandSearchBar: Boolean },
  setup: () => {},
  data() {
    return {
      searchInputValue: '',
      searchInputFocused: false,
      toShowAction: true,
      dataObj: null,
      showClearIcon: true,
      autofocus: true
    }
  },
  computed: {},
  watch: {
    searchInputValue: function (newValue, oldValue) {
      // console.log({ newValue, oldValue })
      this.$emit('updateInput', newValue)
      console.log('輸入搜尋字串:', newValue)
      let keyworksArray = newValue.split(' ')

      if (newValue === '') {
        console.clear()
        console.warn('搜尋字串被清空')
        Toast('取消搜尋')
        return this.$store.dispatch(`itemsData/${ITEMS.SET_QUERY_KEYWORD}`, [])
      }

      let self = this
      updateSearchKeyWordWithTimer(newValue)

      function updateSearchKeyWordWithTimer(newValue) {
        // 1) 因為每一次輸入都會呼叫 watcher function 接著呼叫 updateSearchKeyWordWithTimer
        // 會造成無法在 Vue.app 的 global 環境建立一個可以用來儲存和清除 timer 的變數
        // 2) 在updateSearchKeyWordWithTimer裡面的 this 會指向 undefined, 所以要使用 self 變數先儲存指向 Vue.app 的 this
        // 3) 然後把要執行的 setTimeout 存到 self.timer，這樣才能清除前一次輸入後儲存的 setTimeout
        // 並只會執行最後一次儲存到 self.timer 的 setTimeout function
        console.log('呼叫updateSearchKeyWordWithTimer, this: ', self)

        if (self.timer) {
          clearTimeout(self.timer)
          self.timer = null
        }

        self.timer = setTimeout(() => {
          console.log('搜尋關鍵字 array: ', keyworksArray)
          if (newValue !== '')
            self.$store.dispatch(`itemsData/${ITEMS.SET_QUERY_KEYWORD}`, keyworksArray)
        }, 1000)
      }
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onSearch() {
      // console.log('onSearch method: ...')
    },
    onTyping() {
      // console.log('onTyping method: ...')
    },
    onCancel() {
      // console.log('search cancelled')
      Toast('取消')
    },
    onFocus() {
      this.searchInputFocused = true
      this.$refs.input.focus()
      this.$emit('focused', true)
      console.log('focused')
    },
    onClear() {
      this.searchInputValue = ''
      console.log('cleared')
      console.log('this.searchInputFocused:', this.searchInputFocused)
    },
    outFocus() {
      if (this.searchInputValue !== '') {
        return (this.searchInputFocused = true)
      }
      this.$emit('focused', false)

      return (this.searchInputFocused = false)
    }
  }
})
</script>
<style scoped>
.searchbar__container {
  position: relative;
  height: fit-content;
  z-index: 100;
}

.searchbar__container.absolutePostion {
  /* 如果 .searchbar__form.absolutePostion 存在的話
    searchbar__container的height就會抓不searchbar__form的高度而變成 height = 0
    所以要另外指定height給 .searchbar__container
    */
  min-height: 3.7rem;
}

.searchbar__form {
  width: 100%;
  max-width: 20vw;
  margin-left: 0.4rem;

  transition: all 0.3s ease-in;
}

.searchbar__form.active {
  width: 200%;
  max-width: 50rem;
}

.searchbar__form.absolutePostion {
  position: absolute;
  top: 3px;
  left: 0;
}

.searchbar__input {
  border-radius: 25px;
  background-color: burlywood;
}

.searchbar__input.active {
  border-radius: 25px;
  background-color: #d89349;
}
</style>
