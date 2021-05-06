<template>
  <div class="loadingContainer" v-if="prop_isLoadingData">
    <div class="loadingContainer__background">
      <van-loading class="loader" color="#dfdfdf" size="48px" vertical type="spinner">
        Loading
      </van-loading>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppStartPreloader',
  components: {},
  setup: () => {},
  props: {
    prop_isLoadingData: false
  },
  data() {
    return {
      dataObj: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
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
    url(https://my-profile-site-storage.sgp1.cdn.digitaloceanspaces.com/img/project/animal-crossing/logo-resized.jpg);
  background-size: cover;
  background-position: center;
  z-index: 1000;
}

.loadingContainer .loader {
  margin-top: 7vh;
}
</style>