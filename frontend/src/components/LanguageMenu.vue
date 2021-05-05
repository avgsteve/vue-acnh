<template>
  <div>
    <!-- 切換語系的選單 Language Menu -->
    <select
      v-model="localOptionValue"
      id="languageMenu"
      overlay="false"
      placeholder="Languages"
      aria-placeholder="Language"
    >
      <!-- <label for="languageMenu"> Language/語言 </label> -->
      <option value="" disabled selected> Language/語言 </option>
      <option
        v-for="item in languagesOptionsMenu"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        {{ item.value }}
      </option>
    </select>
  </div>
</template>

<script  >
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  data() {
    return {
      // 在component的property裡面使用 component data 的變數，並透過watch監看 $store.state.locale 的內容，動態更新變數的內容
      popupTextVue: this.$t('about.vueFrameWork'),
      popupTextElementPlus: this.$t('about.elementPlus'),
      popupTextTypeScript: this.$t('about.typeScript'),
      popupTextVuei18n: this.$t('about.vuei18n')
    }
  },
  watch: {
    '$store.state.locale'(value, oldValue) {
      console.log({ value, oldValue })
      this.popupTextVue = this.$t('about.vueFrameWork')
      this.popupTextElementPlus = this.$t('about.elementPlus')
      this.popupTextTypeScript = this.$t('about.typeScript')
      this.popupTextVuei18n = this.$t('about.vuei18n')
    }
  },
  setup() {}
})
</script>

<style scoped>
.project-about-list {
  /* background: grey; */
  margin: 0 auto;
  padding: 0;
}

.project-about-list li {
  width: fit-content;
  list-style: none;
  margin: 1.1rem auto;
  text-align: center;
  height: 1.3rem;
  font-weight: 800;
  font-size: 1.3rem;
  padding: 0 0 2rem;
}

/* list item hover animation */

.project-about-list > li > a {
  position: relative;
  color: #2a3c50d1;
  text-decoration: none;
}

.project-about-list > li > a:hover {
  color: rgb(236, 221, 0);
  background-color: grey;
}

.project-about-list > li > a::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

.project-about-list > li > a:hover::before {
  visibility: visible;
  transform: scaleX(1);
}
</style>
