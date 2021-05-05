<template>
  <div v-if="!computed_ifUserIsLoggedIn && !data_isRedirectingToOtherPage" class="loginContainer">
    <InputContainer @submitInput="submitInputHandler" @authMode="authModeControll" />
    <GoogleAuthBtn :prop_btnType="data_authBtnType" />
  </div>

  <div v-if="data_isRedirectingToOtherPage" class="loginContainer">
    <h2> {{ $t('ui.auth.redirectToHome') }} ...</h2>
  </div>

  <div v-if="computed_ifUserIsLoggedIn" class="loginContainer">
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="confirmLogout">
      {{ $t('ui.auth.logout') }}
    </van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SectionComponent from '../LAYOUT/sectionComponent.vue'
import InputContainer from './InputForm/InputContainer.vue'
import GoogleAuthBtn from './Btns/GoogleAuthBtn.vue'
import USER from './../../../store/modules/user/userTypes'
import { Toast } from 'vant'
import axios from 'axios'

export default defineComponent({
  name: 'AuthComponent',
  components: { SectionComponent, InputContainer, GoogleAuthBtn },
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String },
    prop_inputType: { type: String }
  },
  data(dataObj: any) {
    return {
      dataObj: null,
      data_sendingAuthData: false,
      data_authBtnType: 'login',
      data_isRedirectingToOtherPage: false
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
  mounted() {},
  unmounted() {},
  methods: {
    submitInputHandler(data) {
      console.log('submitInputHandler:', data)
    },
    // 子組件傳出的 authType 去改變 data_authBtnType
    authModeControll(authMode) {
      // console.log('authMode: ', authMode)
      if (authMode !== 'login' && authMode !== 'register') {
        console.warn('authMode is not valid')
        return (this.data_authBtnType = 'login')
      }
      this.data_authBtnType = authMode
    },
    confirmLogout() {
      const confirmToLogout = window.confirm(`${this.$t('ui.auth.confirmToLogout')}`)
      if (confirmToLogout) {
        axios
          .get('/api/auth/logout', {
            headers: {
              CLIENT_REQ: 'Vue.js AUTH PAGE: CHECK IF USER HAS LOGGED IN'
            }
          })
          .then((response) => {
            const status = response.status
            console.log('傳回的代號status ', status)
            if (status === 200) {
              Toast.success(`${this.$t('ui.result.success')}`)
              this.$store.dispatch(`user/${USER.SET_IF_AUTHENTICATED}`, false)
              this.$store.dispatch(`user/${USER.SET_DATA_OF_CURRENT_USER}`, null)
              this.data_isRedirectingToOtherPage = true
              setTimeout(() => {
                location.assign('/')
              }, 1000)
            }
          })
      }
      if (!confirmToLogout) {
        Toast.fail(`${this.$t('ui.button.cancel')}`)
      }
    }
  }
})
</script>
<style scoped>
.loginContainer {
  width: 100%;
  height: fit-content;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
}
</style>