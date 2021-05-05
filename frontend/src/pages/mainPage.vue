<template>
  <div class="mainPageContainer">
    <MainFunctionsContainer />
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
import MainFunctionsContainer from './mainPage/mainPage.vue'

export default defineComponent({
  name: 'mainPage',
  components: {
    MainFunctionsContainer
  },
  setup: () => {}
})
</script>
<style scoped>
.mainPageContainer {
  /* 發開時使用的背景顏色 */
  /* background-color: rgba(103, 103, 114, 0.377); */
  padding: 0.1rem;
}
</style>
