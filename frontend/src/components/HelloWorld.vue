<template>
  <p>hello</p>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '../../store'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    setup() {
      const store = useStore(key)
      const count = computed(() => store.state.count)

      return {
        count,
        inCrement: () => store.commit('increment')
      }
    }
  })
</script>

<style scoped>
  .sub-contentContainer {
    padding: 0 1rem;
  }
  .sub-contentContainer * {
    margin: 1rem 0;
    text-align: center;
  }

  a {
    color: #42b983;
  }
  .element-plus-logo {
    width: 50%;
  }
</style>
