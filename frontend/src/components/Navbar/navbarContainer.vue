<template>
  <nav class="downNavBar active">
    <div class="downNavBar_btns">
      <!-- <van-icon  name="https://b.yzcdn.cn/vant/icon-demo-1126.png" /> -->
      <router-link to="/">
        <van-icon name="apps-o" />
      </router-link>
      <router-link to="/search">
        <van-icon name="search" />
      </router-link>

      <router-link to="/lists">
        <van-icon name="orders-o" />
      </router-link>

      <router-link to="/user">
        <div
          class="userIcon"
          :class="{
            loggedIn: computed_userIsloggedIn === true,
            notLoggedIn: computed_userIsloggedIn === false
          }"
        >
          <img src="/src/assets/img/characters/Blathers.png" alt="" />
        </div>

        <!-- <van-icon v-if="!computed_userIsloggedIn" name="bookmark-o" /> -->
      </router-link>

      <a href="#" target="_blank" rel="noopener noreferrer" @click.prevent>
        <van-icon name="setting-o" @click="toggleLanguageOption" />
      </a>
    </div>
  </nav>

  <LanguageOption v-bind:prop_languageMenuToggle="prop_languageMenuToggle"></LanguageOption>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import USER from './../../../store/modules/user/userTypes'
import LanguageOption from './navbarLanguageOption.vue'
export default defineComponent({
  components: {
    LanguageOption
  },
  name: 'DownNavbar',
  props: {},
  setup() {
    const store = useStore()
    const count = computed(() => store.state.count)
    return {
      count
    }
  },
  data() {
    return {
      prop_languageMenuToggle: false
    }
  },
  computed: {
    computed_userIsloggedIn() {
      return this.$store.getters[`user/${USER.GET_IF_AUTHENTICATED}`]
    }
  },
  methods: {
    toggleLanguageOption() {
      this.prop_languageMenuToggle = !this.prop_languageMenuToggle
      console.log('prop_languageMenuToggle', this.prop_languageMenuToggle)
    }
  }
})
</script>

<style scoped>
.downNavBar {
  width: 20%;
  background-color: #d89349;
  border-radius: 50%;
  box-shadow: 2px 3px 10px -6px rgba(0, 0, 0, 0.75);
  min-height: 3.5rem;
  /*  */
  padding: 0 0.5rem;
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 與底部的間距 */
  position: absolute;
  bottom: 0.3rem;
  font-size: 2rem;
  transition: all 0.3s ease-in;
  /*  */
  overflow: hidden;
  z-index: 50;
  /*  */
  box-shadow: inset 3px -2px 15px -29px rgba(163, 163, 163, 0.4);
}

.downNavBar a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: hsla(38, 73%, 15%, 0.863);
}

@media only screen and (max-width: 500px) {
  .downNavBar {
    min-height: 3rem;
    padding: 0 0.2rem;
  }

  .downNavBar i {
    font-size: 1.5rem;
  }
}

.downNavBar.active {
  width: 100%;
  border-radius: 17px;
}

.downNavBar_btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
  width: 90%;
  overflow-x: scroll;
}

@media only screen and (max-width: 500px) {
  .downNavBar_btns {
    justify-content: flex-start;
  }
}

::-webkit-scrollbar {
  width: 0px;
  display: none;
}

.downNavBar_btns i {
  margin: 0 1rem;
  border-radius: 7px;
}

.userIcon {
  margin: 0 1rem;
  width: 30px;
  height: 30px;
  background-color: rgba(128, 128, 128, 0.452);
  border-radius: 50%;
  transition: all 0.4s ease-in-out;
}

.userIcon.notLoggedIn {
  pointer-events: none;
  cursor: not-allowed;
}

.userIcon.loggedIn:hover {
  background-color: rgb(230, 228, 144);
}

.userIcon img {
  height: 100%;
  transition: all 0.4s ease-in-out;
}

.userIcon.notLoggedIn img {
  height: 100%;
  filter: contrast(50%);
  pointer-events: none;
  cursor: not-allowed;
}

.userIcon.loggedIn img {
  transition: all 0.4s ease-in-out;
}

.userIcon.loggedIn img:hover {
  transform: translateY(-1px);
  height: 110%;
}
</style>
