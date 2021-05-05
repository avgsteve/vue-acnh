<template>
  <div v-show="prop_selectedRecipesData.length > 0">
    <hr />
    <h4 class="tagSectionHeading"> Step 2. 點選圖片查看資料: </h4>

    <clothingFlexboxViewControl
      @scaleValueChanged="changeScaleHandler"
      @filterTextChanged="changeFilterTextHandler"
    />

    <!-- 
        橫向捲動的 tags container 
        使用 parent flex + child flex:1 的方式讓物件用兩排或是三排的方式呈現
        設定在 CSS:  #clothingData .clothingData__flexContainer {}
        -->
    <div id="clothingData">
      <div class="clothingData__flexContainer">
        <div
          class="clothingData__box"
          :style="flexboxStyle"
          v-for="(item, index) in computed_filteredCreatureData"
          v-bind:key="item.name + '#' + index"
          @click="setTag(item.tag, $event)"
        >
          <img
            :src="
              item.variants[0].closetImage ||
              item.variants[0].image ||
              item.variants[0].inventoryImage ||
              item.variants[0].storageImage
            "
            :alt="'Tag: ' + item.name"
            :style="flexboxImageStyle"
          />
          <p class="clothingName">
            {{ $t(`items.item.${item.name.split("'").join('').split('.').join('')}`) }}</p
          >
          <AddToListBtn :class="'add-to-list-btn'" :prop_itemData="item" />
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import clothingFlexboxViewControl from './clothingFlexboxViewControl.vue'
import LANGUAGE from '../../../store/modules/languageSetting/languageSettingTypes'
import AddToListBtn from './../../components/Buttons/AddToListBtn.vue'

export default defineComponent({
  name: 'clothingFlexboxView',
  components: {
    clothingFlexboxViewControl,
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
      // console.log('changedScaleValue:', changedScaleValue)
      scaleValue.value = changedScaleValue
    }

    watch(scaleValue, (newValue, oldValue) => {
      // console.log('flexboxStyle', flexboxStyle)
      console.log('newValue of scale:', newValue)
      let scale = newValue / 100
      flexboxStyle.margin = `${8 * scale}px ${10 * scale}px ${6 * scale}px`
      flexboxImageStyle.width = `${7 * scale}rem`
      flexboxImageStyle.padding = `${0.5 * scale}rem`
    })

    // console.log('目前的style:', style)
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
    prop_selectedRecipesData: {
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
      const clothingFilterString = this.$store.getters[
        `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_FOR_RECIPES}`
      ]

      // let filteredResult = []
      //
      let clothingData = Array.from(this.prop_selectedRecipesData)
      // console.log('clothingData:', clothingData)
      // console.log('clothingFilterString:', clothingFilterString)

      for (let i = 0; i < clothingData.length; i++) {
        const item = clothingData[i]
        const itemName = item.name.split("'").join('').split('.').join('')
        const itemNameTranslations = clothingFilterString[itemName]
        // console.log('itemNameTranslations:', itemNameTranslations)
        item.stringForFilter = itemNameTranslations
      }

      // console.log('clothingData: ', clothingData)

      clothingData = clothingData.filter((e) => {
        // if (e.stringForFilter.includes(this.filterText)) console.log('true')
        return e.stringForFilter.includes(this.filterText)
      })

      return clothingData
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
    setTag(clothingName, eventTarget) {
      // console.log('set tag:', clothingName)

      let allItemsBoxNodes = document.querySelectorAll('.clothingData__box ')

      allItemsBoxNodes.forEach((e) => e.classList.remove('active'))

      let parentNodes = eventTarget.target.parentElement
      parentNodes.classList.add('active')

      this.$emit('clothingelected', clothingName)
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

#clothingData {
  overflow-x: auto;
}

#clothingData .clothingData__flexContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* flex-direction: column; */
  height: 25rem;
}

.clothingData__box:hover {
  background: rgba(128, 128, 128, 0.205);
  transition: all 0.1s ease-in-out;
  border-radius: 7px;
}

#clothingData .clothingData__box {
  height: fit-content;
  /* border-radius: 7px;
  margin: 5px 3px 1px;
  transform: scale(1.1); */
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

#clothingData .clothingData__box.active {
  background: rgba(233, 159, 140, 0.486);
  border-radius: 7px;
  padding: 1rem;
}

.clothingData__box:hover {
  background: rgba(128, 128, 128, 0.205);
}

.clothingData__box img {
  width: 6rem;
}

.clothingData__box clothingName {
  word-break: break-all;
  max-width: 6rem;
}
</style>