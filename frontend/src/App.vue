<template>
  <div id="rootContainer">
    <AppStartPreloader :prop_isLoadingData="isLoadingData" />

    <van-row id="appContainer" justify="center" v-if="!isLoadingData">
      <van-col span="20" class="mobile-viewport-controll">
        <van-row>
          <van-col span="20" class="mainContainer">
            <div class="pageContent">
              <!-- 透過 Vue Router替換不同 path 的內容 -->
              <router-view v-slot="slotProps">
                <component :is="slotProps.Component"></component>
              </router-view>
            </div>
          </van-col>
        </van-row>

        <van-row justify="center" v-if="computed_showNavbar">
          <van-col id="navContainer" span="20">
            <DownNavbar></DownNavbar>
          </van-col>
        </van-row>
      </van-col>
      <!-- List popup 控制將物件加入清單的彈窗的內容 -->
      <PopUpList
        id="PopUpList"
        :prop_showPopup="computed_showListPopup"
        :prop_itemData="computed_dataForListPopup"
      />
    </van-row>
  </div>
</template>

<script>
import DownNavbar from './components/Navbar/navbarContainer.vue'
import Toolbar from './components/Toolbar/Toolbar.vue'
import PopUpList from './components/List/PopupLists.vue'
import AppStartPreloader from './components/Loaders/AppStartPreloader.vue'

import { defineComponent } from 'vue'
import ITEMS from './../store/modules/itemsData/itemsDataTypes'
import USER from './../store/modules/user/userTypes'
import GLOBALSTATE from './../store/modules/globalState/globalStateTypes'
import LIST from './../store/modules/listData/listDataTypes'

export default defineComponent({
  name: 'App',
  components: {
    DownNavbar,
    Toolbar,
    PopUpList,
    AppStartPreloader
  },
  setup() {},
  beforeCreate() {},
  data() {
    return {
      isLoadingData: true,
      data_showNavbar: true,
      data_displayPopUpForList: false
    }
  },
  mounted() {
    // 除錯用的 log
    // console.log(
    //   '檢查環境變數: VITE_API_ENDPOINT + import.meta.env',
    //   `${import.meta.env.VITE_API_ENDPOINT}`
    // )

    // #1 檢查客戶端瀏覽器目前的語言，並連帶設定i18n的語言設定
    let userLang = navigator.language
    if (userLang.toLowerCase().includes('tw')) this.$i18n.locale = 'zhTW'
    if (userLang.toLowerCase().includes('cn')) this.$i18n.locale = 'zhCN'
    if (userLang.toLowerCase().includes('en')) this.$i18n.locale = 'en'

    // 從後端讀取翻譯資料
    this.$store.dispatch(`itemsData/${ITEMS.FETCH_TRANSLATED_ITEM_DATA}`)

    // #2 從 localStorage 讀取清單資料
    this.$store.dispatch(`listData/${LIST.SET_LIST_DATA_FROM_LOCALSTORAGE}`)

    // #3 透過 lastLoggedInTime 變數檢查使用者是否有登入過，藉由Cookie向API請求使用者資料
    // 然後取得資料庫上的使用者資料和清單資料
    console.log('檢查使用者是否有登入過')
    const lastLoggedInTime = localStorage.getItem('lastLoggedInTime')
    if (lastLoggedInTime) {
      console.log('找到 lastLoggedInTime: ', lastLoggedInTime)
      this.$store.dispatch(`user/${USER.GET_CURRENT_USER_DATA_WITH_COOKIE}`)
    }
  },
  computed: {
    // 透過 computed value 綁住 Store的資料物件，
    // 讓 App.vue 的 watcher 監看資料讀取是否成功
    computed_itemsDataForQuery() {
      return this.$store.getters[`itemsData/${ITEMS.GET_ITEMS_FOR_QUERY}`]
    },
    computed_showNavbar() {
      const navbarDisplay = this.$store.getters[`globalStatus/${GLOBALSTATE.GET_NAVBAR_STATUS}`]
      return navbarDisplay
    },
    // 控制將物件加入清單的彈窗的global variable
    computed_showListPopup() {
      const popupDisplay = this.$store.getters[`globalStatus/${GLOBALSTATE.GET_LIST_POPUP_STATUS}`]
      return popupDisplay
    },
    // 控制將物件加入清單的彈窗的內容
    computed_dataForListPopup() {
      const dataForListPopup = this.$store.getters[
        `globalStatus/${GLOBALSTATE.GET_LIST_POPUP_DATA}`
      ]
      return dataForListPopup
    }
  },
  watch: {
    // 要先讀取完成全部的資料後才能進行Store裡面的item設定分類資料
    // 接著再移除讀取畫面
    computed_itemsDataForQuery: function (_new, _old) {
      this.$store.dispatch(`itemsData/${ITEMS.SET_ITEM_CATEGORIES}`)
      this.isLoadingData = false // 移除讀取 preloader
    },
    // 控制將物件加入清單的彈窗
    data_displayPopUpForList() {
      this.$store.dispatch(
        `globalStatus/${GLOBALSTATE.SET_NAVBAR_STATUS}`,
        !this.data_displayPopUpForList
        // App.vue載入的時候要先關閉，避免有任何狀況開啟造成畫面被遮住
      )
    }
  }
})
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  /* font-size: 62.5%; */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  background-color: rgb(205 207 209 / 12%);
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

/* #rootContainer {
  margin: 0 auto;
} */

#appContainer {
  min-height: 100vh;
  background-color: #e9dec2;
  /* overflow: hidden; */
  /* z-index: 10; */
  /* 複寫原本的設定:  */
  /* justify-content: unset; */
}

@media only screen and (max-width: 500px) {
  #appContainer {
    justify-content: unset;
  }

  .mobile-viewport-controll {
    flex: unset;
    max-width: unset;
    width: 100%;
  }
}

.loadingContainer {
  width: 100vw;
  height: 100vh;
  background-color: grey;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4462827367275035) 0%,
      rgba(0, 0, 0, 0.2502043053549545) 15%,
      rgba(0, 2, 9, 0.16617069190957634) 30%,
      rgba(0, 3, 17, 0.01491018770789565) 50%,
      rgba(0, 0, 0, 0) 80%
    ),
    url(https://wallpaperaccess.com/full/2317617.jpg);
  background-size: cover;
  background-position: center;
  z-index: 1000;
}

.loadingContainer .loader {
  margin-top: 7vh;
}

.mainContainer {
  top: 0;
  position: fixed;
  background-color: rgb(211, 211, 211);
  border: 1px dotted grey;
  height: 90%;
  width: 100%;
  border-radius: 10px;
  /* overflow: a; */
}

@media only screen and (max-width: 500px) {
  .mainContainer {
    flex: unset;
    max-width: unset;
  }
}
.pageContent {
  position: relative;
  overflow-y: auto;
  height: 100%;
  border-radius: 10px;
}

/* 底部工具列 */
#navContainer {
  width: 100%;
  position: fixed;
  bottom: 0.1rem;
  height: 5rem;
  /* box-shadow: 4px -38px 59px -19px rgb(19 20 35); */
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 500px) {
  #navContainer {
    height: 3rem;
    bottom: 0.1rem;
  }
}

.btn {
  margin: 0 1rem 0 0;
  border-radius: 7px;
}

.contentContainer {
  margin: 1rem 0 2rem;
}

.route_animation-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route_animation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route_animation-enter-active {
  transition: all 0.3s ease-out;
}

.route_animation-leave-active {
  transition: all 0.3s ease-in;
}

.route_animation-enter-to,
.route_animation-leave-from {
  opacity: 1;
  transform: translateY(0);
}

#PopUpList {
  height: 60% !important;
}
</style>
