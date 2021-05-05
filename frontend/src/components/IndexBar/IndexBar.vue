<template>
  <div>
    <van-index-bar :index-list="indexList" z-index="zIndex">
      <van-index-anchor index="1" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="2" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="3" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="4" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="5" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="6" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="7" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="8" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IndexBar',
  components: {},
  setup() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 'AAAAAA', 'BAAAAAA', 9, 10]
    }
  },
  props: {},
  data(  ): {   , zIndex: number } {
    return {
      dataObj: null,
      zIndex: -1
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
<style scoped></style>
