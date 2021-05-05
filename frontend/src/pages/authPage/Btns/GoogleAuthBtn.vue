<template>
  <BtnFrame
    @click="handleClickSignIn"
    :prop_btnImg="data_btnImg"
    :prop_btnText="computed_btnText"
    :prop_loadingStatus="data_isLoadingAuthData"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BtnFrame from './BtnFrame.vue'
import USER from './../../../../store/modules/user/userTypes'
import { Toast } from 'vant'

export default defineComponent({
  name: 'GoogleAuth',
  components: { BtnFrame },
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String },
    prop_btnType: {
      type: String,
      default: 'login'
    }
  },
  data(dataObj: any) {
    return {
      data_btnImg: '/src/assets/img/icon/oauth/google-login-icon-bubble.svg',
      data_isLoadingAuthData: false
    }
  },
  computed: {
    computed_btnText() {
      if (this.prop_btnType !== 'login') return 'Sign up with Google'
      if (this.prop_btnType === 'login') return 'Log in with Google'
    }
  },
  watch: {
    data_isLoadingAuthData() {
      this.$emit('isLoadingAuthData', this.isLoadingAuthData)
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async handleClickSignIn() {
      // #1 送出資料到後端
      // #2 顯示讀取中的狀態  (emit 到 parent 或是透過 store)
      // #3 接收資料後結束讀取中的狀態
      // #4 在store中顯示使用者已經登入或是未登入的狀態
      // #5 更新 userAuthIsValidUntil
      // #6 比對使用者的 userItemLists 欄位內的資料是否比 localStorage 新

      this.data_isLoadingAuthData = true
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        this.user = googleUser.getBasicProfile().getEmail()
        const idToken = googleUser.getAuthResponse().id_token

        this.axios({
          method: 'POST',
          url: '/api/auth/signup/google',
          data: {
            idToken
          }
        }).then((response) => {
          const data = response.data
          // console.log('axios 傳回的 data ', data)
          // console.log('axios 傳回的status ', response.status)
          if (response.status === 200) {
            this.$store.dispatch(`user/${USER.SET_IF_AUTHENTICATED}`, true)
            this.$store.dispatch(`user/${USER.SET_AUTHENTICATION_VALID}`, data.tokenIsValidUntil)
            this.data_isLoadingAuthData = false
            Toast.success('登入成功!')
            console.log('auth OK')
            setTimeout(() => {
              location.assign('/')
            }, 800)
          }
        })
      } catch (error) {
        console.log('auth failed')
        console.error(error)
        this.$store.dispatch(`user/${USER.SET_IF_AUTHENTICATED}`, false)
        this.$store.dispatch(`user/${USER.SET_AUTHENTICATION_VALID}`, null)
        this.data_isLoadingAuthData = false
        if (error.error === 'popup_closed_by_user') Toast.fail('取消登入')
        if (error.error !== 'popup_closed_by_user') Toast.fail('登入失敗，請稍後再試')
      }
    }
  }
})
</script>
<style scoped>
</style>