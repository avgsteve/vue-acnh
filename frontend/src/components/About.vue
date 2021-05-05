<template>
  <div>
    <!-- 使用 i18n $t('property.value') 顯示不同語系的內容 (內容在 'src/locales/' 裡面的 .json檔案) -->

    <h3>{{ $t('about.thisProjectUses') }} :</h3>

    <ul class="project-about-list">
      <!-- 在component的property裡面使用 component data 的變數，並透過watch監看 $store.state.locale 的內容，動態更新變數的內容-->
      <li>
        <el-popover
          placement="left-start"
          title="Vue"
          :width="200"
          trigger="hover"
          hide-after="100"
          :content="popupTextVue"
        >
          <template #reference>
            <a href="https://vuejs.org/" target="_blank" rel="noreferrer noopener"> Vue </a>
          </template>
        </el-popover>
      </li>

      <li>
        <el-popover
          placement="right-start"
          :width="200"
          trigger="hover"
          hide-after="100"
          :content="popupTextElementPlus"
        >
          <template #reference>
            <a href="https://element-plus.org/" target="_blank" rel="noreferrer noopener"
              >Element Plus
            </a>
          </template>
        </el-popover>
      </li>

      <li>
        <el-popover
          placement="left-start"
          :width="200"
          trigger="hover"
          :content="popupTextTypeScript"
        >
          <template #reference>
            <a
              href="https://www.youtube.com/watch?v=CQAQkHuulTU"
              target="_blank"
              rel="noreferrer noopener"
              >TypeScript
            </a>
          </template>
        </el-popover>
      </li>

      <li>
        <el-popover
          placement="right-start"
          :width="200"
          trigger="hover"
          :content="popupTextVuei18n"
        >
          <template #reference>
            <a href="https://kazupon.github.io/vue-i18n/" target="_blank" rel="noreferrer noopener"
              >vue i18n
            </a>
          </template>
        </el-popover>
      </li>
    </ul>
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
