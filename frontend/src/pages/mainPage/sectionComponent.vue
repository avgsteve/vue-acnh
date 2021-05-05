<template>
  <section class="section-container">
    <div class="section-heading">
      <h2> {{ props_title }} </h2>
      <h3>{{ props_subtitle }}</h3>
    </div>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>
<script  >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SectionComponent',
  components: {},
  setup: () => {},
  props: {
    props_title: { type: String, default: 'Title' },
    props_subtitle: { type: String, default: 'Title' }
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
.section-container {
  background-color: rgb(236, 236, 233);
  /* border: 1px dotted black; */
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem;
}

.section-heading {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section-heading h2 {
  font-size: 2rem;
  /* font-weight: 600; */
  margin-bottom: 1.1rem;
}

.section-heading h3 {
  font-size: 1.7rem;
  font-weight: 400;

  margin-bottom: 0.2rem;
}

.section-content {
  min-height: 10rem;
  background-color: #70707014;
  margin: 0.5rem 0.5rem 0;
  border-radius: 1rem;
}
</style>