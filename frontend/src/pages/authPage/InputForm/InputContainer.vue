<template>
  <div class="input-container">
    <van-cell class="" center :title="data_loginMode === true ? '登入' : '註冊'">
      <template #right-icon>
        <van-switch v-model="data_loginMode" size="24" />
      </template>
    </van-cell>

    <div v-if="false">
      <van-field
        v-model="data_email"
        type="email"
        label="email"
        placeholder="Please enter email"
        required
      />
      <van-field
        v-model="data_password"
        type="password"
        label="password"
        placeholder="Password"
        required
      />
      <!-- data_loginMode: 為false的時候才會多一個檢查輸入密碼的欄位  -->
      <!-- <van-field
        v-if="!data_loginMode"
        v-model="data_checkPassword"
        type="password"
        label="check_password"
        placeholder="Type password again"
        required
      /> -->
      <van-button class="submitBtn" type="primary" size="large" @click="submitInput">
        <span v-if="!data_isLoading"> Submit </span>
        <van-loading v-if="data_isLoading" size="24px"></van-loading>
      </van-button>
    </div>

    <h4 v-if="!data_loginMode">目前只開放Google帳號註冊</h4>
    <h4 v-if="data_loginMode">目前只開放Google帳號登入</h4>
  </div>
</template>
<script lang="ts">
import { Toast } from 'vant'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InputContainer',
  components: {},
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data(dataObj: any) {
    return {
      dataObj: null,
      data_email: '',
      data_password: '',
      data_checkPassword: '',
      data_isLoading: false,
      data_loginMode: true // 透過 watch 將值 emit 到 AuthComponent.vue，去改變其他組件
    }
  },
  computed: {},
  watch: {
    data_loginMode() {
      this.$emit('authMode', this.data_loginMode === true ? 'login' : 'register')
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    submitInput() {
      if (!this.data_email || !this.data_password) {
        return Toast.fail(`${this.$t('ui.auth.emptyFieldWarning')}`)
      }
      if (this.data_loginMode === false && !this.data_checkPassword) {
        return Toast.fail(`${this.$t('ui.auth.emptyFieldWarning')}`)
      }
      this.$emit('submitInput', null)
    }
  }
})
</script>
<style scoped>
.input-container {
  border-radius: 7px;
  padding: 1rem;
  /* background-color: beige; */
  max-width: 30rem;
  margin-bottom: 1rem;
  height: fit-content;
  flex-direction: column;
  justify-content: space-evenly;
}

.input-container *:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>

<style>
.input-container .van-button {
  border-radius: 10px;
}

.input-container .van-field {
  border-radius: 10px;
}

.input-container .submitBtn {
  width: 7.5rem;
}

.loginContainer .input-container .van-cell {
  border-radius: 10px;
}
.loginContainer .input-container .van-cell__title {
  text-align: left;
  font-size: 1.1rem;
}
</style>