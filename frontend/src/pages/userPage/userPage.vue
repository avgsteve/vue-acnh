<template>
  <div class="userPageContainer">
    <div v-if="data_isLoadingUserData" class="preloader">
      <Preloader :prop_isLoading="data_isLoadingUserData" />
    </div>
    <Account v-if="!data_isLoadingUserData" :prop_accountData="userData" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SectionComponent from '../LAYOUT/sectionComponent.vue'
import Account from './../../components/Account/Account.vue'

import Preloader from './../../components/Preloader.vue'
import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes'
import { Toast } from 'vant'
import USER from '../../../store/modules/user/userTypes'

import axios from 'axios'

export default defineComponent({
  name: 'userPage',
  components: {
    SectionComponent,
    Account,
    Preloader
  },
  data() {
    return {
      data_isLoadingUserData: true,
      userData: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {
    // // this.$store.dispatch(`clothingData/${RECIPES.SET_clothing_CATEGORIES}`)
    console.log('this.data_isLoadingUserData:', this.data_isLoadingUserData)
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/me`, {
        headers: {
          CLIENT_REQ: 'Vue.js-fetch data from ME router'
        }
      })
      .then((response) => {
        const userData = response.data
        if (!userData || !userData[0]) {
          Toast.error('無法取得使用者資料，請重新登入')
        }
        this.$store.dispatch(`user/${USER.SET_DATA_OF_CURRENT_USER}`, userData[0])
        this.userData = userData[0]
        console.log('this.userData:', this.userData)
        setTimeout(() => {
          this.data_isLoadingUserData = false
        }, 500)
      })
      .catch((err) => {
        console.log('無法登入', err.response)
        this.$store.dispatch(`user/${USER.SET_DATA_OF_CURRENT_USER}`, null)
        location.assign('/auth')
      })
  },
  mounted() {},
  beforeUnmount() {},
  methods: {}
})
</script>
<style scoped>
/* @media only screen and (min-width: 600px) {
  
} */
</style>