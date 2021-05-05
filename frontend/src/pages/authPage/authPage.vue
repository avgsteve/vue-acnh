<template>
  <Section :props_title="$t('ui.auth.auth')" :props_subtitle="''" class="authContainer">
    <!-- <LogIn /> -->
    <div class="checkingUserLogInStatus" v-if="data_checkingIfUserIsLoggedIn">
      <h4>Checking if user has logged in...</h4>
      <van-loading type="circular" color="#5676d8" size="30px" />
    </div>
    <AuthComponent v-if="!data_checkingIfUserIsLoggedIn" />
  </Section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Section from './../LAYOUT/sectionComponent.vue'
import USER from './../../../store/modules/user/userTypes'
import AuthComponent from './AuthComponent.vue'
import SignUp from './SignUp.vue'
import axios from 'axios'

export default defineComponent({
  name: 'authPage',
  components: { Section, AuthComponent, SignUp },
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data(dataObj: any) {
    return {
      dataObj: null,
      data_checkingIfUserIsLoggedIn: true
    }
  },
  computed: {
    computed_ifUserIsLoggedIn() {
      const ifUserIsLoggedIn = this.$store.getters[`user/${USER.GET_IF_AUTHENTICATED}`]
      console.log('ifUserIsLoggedIn', ifUserIsLoggedIn)
      return ifUserIsLoggedIn
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 如果Store的登入狀態顯示沒有登入，就向後端發出請求驗證Cookie是否有效，
    // 有效的話就可以取得使用者資料並且將Store的登入狀態更新為 true

    if (!this.computed_ifUserIsLoggedIn) {
      axios
        .get(`/api/user/currentUser?getUserData="true"`, {
          headers: {
            CLIENT_REQ: 'Vue.js AUTH PAGE: CHECK IF USER HAS LOGGED IN'
          }
        })
        .then((response) => {
          const currentUser = response.data

          console.log('currentUser:', currentUser)

          this.$store.dispatch(`user/${USER.SET_IF_AUTHENTICATED}`, !currentUser ? false : true)
          this.$store.dispatch(
            `user/${USER.SET_DATA_OF_CURRENT_USER}`,
            !currentUser ? null : currentUser
          )

          this.data_checkingIfUserIsLoggedIn = false
        })
    }
    if (this.computed_ifUserIsLoggedIn) {
      this.data_checkingIfUserIsLoggedIn = false
    }
  },
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.checkingUserLogInStatus {
  height: 5rem;
  padding: 2rem;
}

.checkingUserLogInStatus h4 {
  margin-bottom: 2rem;
}
</style>

<style>
.authContainer .section-heading {
  position: relative;
}
</style>

