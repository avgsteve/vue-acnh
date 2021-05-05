<template>
  <div v-show="prop_selectedCategory">
    <hr />
    <h4 class="tagSectionHeading"> Step 2. 選擇分類標籤: </h4>
    <!-- 
        橫向捲動的 tags container 
        使用 parent flex + child flex:1 的方式讓物件用兩排或是三排的方式呈現
        設定在 CSS:  #tagsData .tagsData__flexContainer {}
        -->
    <div id="tagsData">
      <div class="tagsData__flexContainer">
        <div
          class="tagsData__box"
          v-for="(item, index) in prop_tagsData"
          v-bind:key="item.tag + '#' + index"
          @click="setTag(item.tag, $event)"
        >
          <img :src="item.img" :alt="'Tag: ' + item.tag" />
          <p class="tagName"> {{ item.tag }}</p>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ItemCategories',
  components: {},
  setup: () => {},
  props: {
    // 用來決定是否顯示 component 的變數
    prop_selectedCategory: {
      type: String,
      required: true,
      default: ''
    },
    prop_tagsData: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    setTag(tagName, eventTarget) {
      // console.log('set tag:', tagName)

      let allItemsBoxNodes = document.querySelectorAll('.tagsData__box ')

      allItemsBoxNodes.forEach((e) => e.classList.remove('active'))

      let parentNodes = eventTarget.target.parentElement
      parentNodes.classList.add('active')

      this.$emit('tagSelected', tagName)
    }
  }
})
</script>
<style scoped>
.tagSectionHeading {
  margin: 1rem 0 0;
  font-size: 1.5rem;
  font-weight: 400;
}

#tagsData {
  overflow-x: auto;
}

#tagsData .tagsData__flexContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* flex-direction: column; */
  height: 25rem;
}

.tagsData__box:hover {
  background: rgba(128, 128, 128, 0.205);
  transition: all 0.1s ease-in-out;
  border-radius: 7px;
}

#tagsData .tagsData__box {
  height: fit-content;
  border-radius: 7px;
  margin: 5px 3px 1px;
  cursor: pointer;
}

#tagsData .tagsData__box.active {
  background: rgba(233, 159, 140, 0.486);
}

.tagsData__box:hover {
  background: rgba(128, 128, 128, 0.205);
}

.tagsData__box img {
  width: 6rem;
}

.tagsData__box tagName {
  word-break: break-all;
  max-width: 6rem;
}
</style>