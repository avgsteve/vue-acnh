<template>
  <div class="loadingContainer" v-if="prop_isLoading">
    <div class="loadingContainer__background">
      <van-loading
        class="loader"
        color="#dfdfdf"
        size="48px"
        vertical
        v-if="prop_isLoading"
        type="spinner"
      >
        <p class="loadingText">Loading </p>
      </van-loading>
    </div>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Preloader',
  components: {},
  setup: () => {},
  props: {
    prop_isLoading: {
      type: Boolean,
      default: true
    }
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
  width: 100%;
  height: 100%;
  min-height: 10rem;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4462827367275035) 0%,
      rgba(0, 0, 0, 0.2502043053549545) 15%,
      rgba(0, 2, 9, 0.16617069190957634) 30%,
      rgba(0, 3, 17, 0.01491018770789565) 50%,
      rgba(0, 0, 0, 0) 80%
    ),
    url(https://wallpaperaccess.com/full/2317617.jpg); */

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4462827367275035) 0%,
    rgba(0, 0, 0, 0.2502043053549545) 15%,
    rgba(0, 2, 9, 0.16617069190957634) 30%,
    rgba(0, 3, 17, 0.01491018770789565) 50%,
    rgba(0, 0, 0, 0) 80%
  );
  background-size: cover;
  background-position: center;
  z-index: 1000;
}

.loadingContainer .loader {
  margin-top: 7vh;
}

.loadingText {
  font-size: 2rem;
}
</style>