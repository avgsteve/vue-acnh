<template>
  <van-row id="toolbar__buttonContainer">
    <slot></slot>
  </van-row>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'ToolbarButtons',
    components: {},
    props: {},
    setup() {
      const store = useStore()
      const count = computed(() => store.state.count)

      return {
        count
      }
    }
  })
</script>

<style scoped>
  #toolbar__buttonContainer {
    min-height: 6rem;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    background-color: #fff;
    justify-content: flex-start;
    overflow-x: scroll;
  }
</style>
