<template>
  <div class="cardBodyContent">
    <slot></slot>
  </div>
</template>

<script  >
import {
  defineComponent
  // ref
} from 'vue'
export default defineComponent({
  name: 'ItemCardBody',
  components: {},
  setup() {
    // const show = ref(false)
    // return { show }
  },
  props: {},
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
</style>

<style scoped>
</style>

<style>
</style>