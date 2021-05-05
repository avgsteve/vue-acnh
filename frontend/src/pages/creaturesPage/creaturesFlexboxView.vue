<template>
  <div v-show="prop_selectedCreatureData.length > 0">
    <hr />
    <h4 class="tagSectionHeading"> Step 2. 點選圖片查看資料: </h4>

    <CreaturesFlexboxViewControl
      @scaleValueChanged="changeScaleHandler"
      @filterTextChanged="changeFilterTextHandler"
    />

    <!-- 
        橫向捲動的 tags container 
        使用 parent flex + child flex:1 的方式讓物件用兩排或是三排的方式呈現
        設定在 CSS:  #creaturesData .creaturesData__flexContainer {}
        -->
    <div id="creaturesData">
      <div class="creaturesData__flexContainer">
        <div
          class="creaturesData__box"
          :style="flexboxStyle"
          v-for="(item, index) in computed_filteredCreatureData"
          v-bind:key="item.name + '#' + index"
          @click="setTag(item.tag, $event)"
        >
          <img
            :src="item.critterpediaImage"
            :alt="'Tag: ' + item.name"
            :style="flexboxImageStyle"
          />
          <p class="creatureName"> {{ $t(`creatures.${item.name.split("'").join('')}`) }}</p>
          <AddToListBtn :class="'add-to-list-btn'" :prop_itemData="item" />
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script  >
import { Toast } from 'vant'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import CreaturesFlexboxViewControl from './creaturesFlexboxViewControl.vue'
import LANGUAGE from './../../../store/modules/languageSetting/languageSettingTypes'

import AddToListBtn from './../../components/Buttons/AddToListBtn.vue'

export default defineComponent({
  name: 'creaturesFlexboxView',
  components: {
    CreaturesFlexboxViewControl,
    AddToListBtn
  },
  setup() {
    const scaleValue = ref(100)
    const scale = scaleValue.value / 100

    let flexboxStyle = reactive({
      margin: `${8 * scale}px ${10 * scale}px ${6 * scale}px`,
      transform: `scale(1.1)`
    })

    let flexboxImageStyle = reactive({
      width: `${7 * scale}rem`,
      padding: ` ${0.5 * scale}rem`
    })

    const changeScaleHandler = (changedScaleValue) => {
      scaleValue.value = changedScaleValue
    }

    watch(scaleValue, (newValue, oldValue) => {
      let scale = newValue / 100
      flexboxStyle.margin = `${8 * scale}px ${10 * scale}px ${6 * scale}px`
      flexboxImageStyle.width = `${7 * scale}rem`
      flexboxImageStyle.padding = `${0.5 * scale}rem`
    })

    return {
      scaleValue,
      changeScaleHandler,
      flexboxStyle,
      flexboxImageStyle
      // marginTop,
      // marginHorizontal,
      // marginBottom,
      // transformScale,
    }
  },
  props: {
    // 用來決定是否顯示 component 的變數
    prop_selectedCreatureData: {
      type: Array,
      required: false,
      default: []
    },
    prop_tagsData: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      filterText: ''
    }
  },
  computed: {
    computed_filteredCreatureData() {
      const creaturesFilterString = this.$store.getters[
        `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_FOR_CREATURES}`
      ]

      let creaturesData = Array.from(this.prop_selectedCreatureData)
      for (let i = 0; i < creaturesData.length; i++) {
        const item = creaturesData[i]
        const itemName = item.name.split("'").join('')
        const itemNameTranslations = creaturesFilterString[itemName]
        // console.log('itemNameTranslations:', itemNameTranslations)
        item.stringForFilter = itemNameTranslations
      }

      creaturesData = creaturesData.filter((e) => {
        // if (e.stringForFilter.includes(this.filterText)) console.log('true')
        return e.stringForFilter.includes(this.filterText)
      })

      return creaturesData
    }
  },
  watch: {
    filterText(text) {
      // console.log('filterText已經更新: ', text)
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    setTag(creatureName, eventTarget) {
      // console.log('set tag:', creatureName)

      let allItemsBoxNodes = document.querySelectorAll('.creaturesData__box ')

      allItemsBoxNodes.forEach((e) => e.classList.remove('active'))

      let parentNodes = eventTarget.target.parentElement
      parentNodes.classList.add('active')

      this.$emit('creatureSelected', creatureName)
    },
    changeFilterTextHandler(filterText) {
      // console.log('收到更新的 filterText: ', filterText)
      this.filterText = filterText
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

#creaturesData {
  overflow-x: auto;
}

#creaturesData .creaturesData__flexContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* flex-direction: column; */
  height: 25rem;
}

.creaturesData__box:hover {
  background: rgba(128, 128, 128, 0.205);
  transition: all 0.1s ease-in-out;
  border-radius: 7px;
}

#creaturesData .creaturesData__box {
  height: fit-content;
  /* border-radius: 7px;
  margin: 5px 3px 1px;
  transform: scale(1.1); */
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

#creaturesData .creaturesData__box.active {
  background: rgba(233, 159, 140, 0.486);
  border-radius: 7px;
  padding: 1rem;
}

.creaturesData__box:hover {
  background: rgba(128, 128, 128, 0.205);
}

.creaturesData__box img {
  width: 6rem;
}

.creaturesData__box creatureName {
  word-break: break-all;
  max-width: 6rem;
}
</style>