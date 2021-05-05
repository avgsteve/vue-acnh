<template>
  <div class="AppIconContainer">
    <div class="appIcon__body">
      <div class="appIcon__logo" :style="computed_style" @mouseover="mouseOver()">
        <slot></slot>
      </div>
      <div class="appIcon__logo mask"> </div>
      <span class="appIcon__badge" v-if="p_iconData.notification"> </span>
    </div>
    <div class="appIcon__bottomText"> {{ p_iconData.bottomText }} </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppIcon',
  components: {},
  setup: () => {},
  props: {
    prop1: {},
    p_iconData: {
      type: Object,
      required: true,
      default: {
        bottomText: 'sample text',
        img: 'src/assets/img/icon/leaf-icon.png',
        notification: false
      }
    }
  },
  data() {
    return {
      dataObj: null
    }
  },
  computed: {
    computed_style() {
      // return 'background-color: ' + this.hovering ? this.color : 'red'
      let img = this.p_iconData.img
      // console.log('img:', img)
      let style = {
        background: `center / contain no-repeat url("${img}")`
      }
      return style
    }
  },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    mouseOver() {
      // this.hovering = !this.hovering
      // console.log('this.hovering:', this.hovering)
    }
  }
})
</script>
<style scoped>
.appIcon__body {
  /* Style */
  background-color: wheat;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(128, 129, 129, 0.52);
  border-radius: 28px;
  margin: 1rem 0.5rem 0;
  cursor: pointer;
  /* position */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transition */
  /* box-shadow: -3px 5px 10px -6px rgba(0, 0, 0, 0.73); */
  box-shadow: 0px 5px 11px -8px rgba(0, 0, 0, 0.73);
  transition: all 0.3s ease-in-out;
  /*  */
}

.appIcon__body.disabled {
  cursor: not-allowed;
}

.appIcon__body:hover {
  background-color: #ffe5b6;
  /* box-shadow: -3px 5px 11px -6px rgba(0, 0, 0, 0.73); */
  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 0.5);
}

.appIcon__body .appIcon__logo {
  /* margin: 0.5rem; */
  /* background-color: green; */
  border-radius: 19px;
  width: 75%;
  height: 75%;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.appIcon__body .appIcon__logo.mask {
  /* margin: 0.5rem; */
  background-color: #6aa6ff14;

  border-radius: 25px;
  width: 85%;
  height: 85%;
  position: absolute;
  z-index: 5;
  transition: all 0.3s ease-in-out;
}

@media only screen and (max-width: 500px) {
  .appIcon__body .appIcon__logo {
    width: 70%;
    height: 70%;
  }

  .appIcon__body .appIcon__logo.mask {
    /* margin: 0.5rem; */
    width: 80%;
    height: 80%;
  }
}

.appIcon__body.disabled .appIcon__logo.mask {
  cursor: not-allowed;
  background-color: #6aa6ff14;
}

.appIcon__body:hover .appIcon__logo.mask {
  /* margin: 0.5rem; */
  background-color: #afa7974d;

  border-radius: 25px;
  width: 86%;
  height: 86%;
  position: absolute;
  z-index: 10;
}

.appIcon__body:hover .appIcon__logo {
  transform: scale(1.05);
}

.appIcon__badge {
  position: absolute;
  right: 0px;
  top: -1px;
  height: 13px;
  width: 13px;
  background-color: red;
  border-radius: 50%;
}

.appIcon__bottomText {
  margin: 0.5rem auto -0.2rem;
  font-size: 1.5rem;
  max-width: 110px;
  word-break: break-all;
}

@media only screen and (max-width: 450px) {
  .appIcon__bottomText {
    margin: 0.2rem auto 0.1rem;
    font-size: 1.2rem;
  }
}
</style>