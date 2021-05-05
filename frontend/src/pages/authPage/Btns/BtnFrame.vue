<template>
  <div class="btnFrame">
    <div class="logoContainer" v-if="!prop_loadingStatus">
      <div class="logo" :style="computed_style"> <img :src="prop_btnImg" alt="" /> </div>
    </div>

    <div class="text">
      <p v-if="!prop_loadingStatus">
        {{ prop_btnText }}
      </p>

      <van-loading class="loading" size="24" v-if="prop_loadingStatus" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnFrame',
  components: {},
  setup: () => {},
  props: {
    prop_btnImg: { type: String },
    prop_btnText: { type: String },
    prop_loadingStatus: { type: Boolean, default: false }
  },
  data(dataObj: any) {
    return {
      dataObj: null,
      isLoading: false
    }
  },
  computed: {
    computed_style() {
      return {
        // background: `center / contain no-repeat url("${this.prop_btnImg}")`
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.btnFrame {
  width: 100%;
  display: flex;
  max-width: 28rem;
  height: 4rem;
  justify-content: space-evenly;
  align-items: center;
  background-color: beige;
  border-radius: 10px;
  cursor: pointer;
  border-bottom: 3px solid rgba(128, 128, 128, 0.144);
  transition: all 0.3s ease-in-out;
  position: relative;
}

.logoContainer {
  width: 3rem;
  height: 3rem;
  position: absolute;
  left: 2rem;
}

@media only screen and (max-width: 600px) {
  .logoContainer {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: 1.1rem;
  }
}

.logo img {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.btnFrame:hover .logo img {
  transform: scale(1.34);
}

.btnFrame:hover {
  border-bottom: 3px solid rgba(238, 174, 35, 0.507);
}

.text {
  display: flex;
  justify-content: fle;
  align-items: center;
  color: grey;
  font-size: 2rem;
  padding-left: 2.4rem;
}

@media only screen and (max-width: 600px) {
  .text {
    font-size: 1.4rem;
    padding-left: 1.7rem;
  }
}

@media only screen and (max-width: 600px) {
  .text {
    font-size: 1.2rem;
    padding-left: 2.1rem;
  }
}

.loading {
  margin-left: -2.4rem;
}
</style>