<template>
  <van-tabs @click="categoryClicked($event)">
    <van-tab
      v-for="(category, index) in prop_categories"
      :key="index"
      :title="$t(`creatures.categories.${category}`)"
      :name="category"
    >
      <slot></slot>
    </van-tab>
  </van-tabs>
</template>
<script  >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CreaturePageTabs',
  components: {},
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop_categories: { type: Array }
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
  methods: {
    categoryClicked(event) {
      // console.log('category name clicked: ', event)
      this.$emit('categoryClicked', event)
    }
  }
})
</script>
<style scoped>
.categoryHeading {
  font-size: 2rem;
  margin: 1rem 0;
}
</style>