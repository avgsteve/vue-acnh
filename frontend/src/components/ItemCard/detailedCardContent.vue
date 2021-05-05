<script  >
import { defineComponent } from 'vue'
import LANGUAGE from './../../../store/modules/languageSetting/languageSettingTypes'
import AddToListBtn from './../Buttons/AddToListBtn.vue'
export default defineComponent({
  name: 'DetailedCardContent',
  components: { AddToListBtn },
  setup: () => {},
  props: {
    prop_cardData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataObj: null,
      active: 0,
      idForTranslation: ''
    }
  },
  computed: {
    computed_itemData() {
      let d = this.prop_cardData.data // d 表示 data
      console.log('傳進computed_itemData裡面的prop_cardData: ', d)

      let p = {
        // p 表示轉換成可以顯示在 detailedCardContent.vue 組件的資料格式(Object)
        id: '',
        idForTranslation: '',
        name: '',
        category: '',
        sourceSheet: '',
        subCategory: null,
        hhaPoints: 0,
        version: '',
        diy: true,
        isCreature: false,
        price: {
          sell: 0,
          buy: 0
        },
        tag: null,
        sources: [],
        isWearable: false, // clothGroupId
        isDecoration: false,
        wearableOptions: {
          villagerEquippable: false,
          villagerGender: null,
          style1: '',
          style2: ''
        }
      }

      // console.warn('variants: ', d.variants.length)
      let organizedSources = []

      if (d.variants) {
        // 因為 Creatures 資料沒有 variants 屬性的資料
        for (let i = 0; i < d.variants.length; i++) {
          const variant = d.variants[i]
          for (let j = 0; j < variant.source.length; j++) {
            const currentSource = variant.source[j].replace("'s ", 's')
            if (currentSource === organizedSources[organizedSources.length - 1]) continue // 如果重複的話就跳過
            organizedSources.push(currentSource)
          }
        }
      }

      p.id = d._id
      p.idForTranslation = d.idForTranslation
      p.name = d.name
      p.category = d.sourceSheet.toLowerCase()
      p.sourceSheet = d.sourceSheet

      p.hhaPoints = d.hhaBasePoints
      p.version = d.versionAdded
      p.diy = d.diy
      p.isCreature = d.critterpediaImage !== undefined
      // ↑ 如果 .critterpediaImage 存在的話表示是生物類型的資料
      p.price = {
        // 如果 .critterpediaImage 存在的話表示是生物類型的資料
        buy: d.critterpediaImage !== undefined ? 'N/A' : d.variants[0].buy,
        sell: d.critterpediaImage !== undefined ? d.sell : d.variants[0].sell
      }
      p.sources = organizedSources
      p.tag = d.tag !== undefined ? d.tag : null
      p.isDecoration = d.size !== undefined ? true : false
      p.isWearable = d.clothGroupId !== undefined ? true : false
      p.wearableOptions.villagerEquippable = d.villagerEquippable === undefined ? false : true
      p.wearableOptions.villagerGender =
        d.villagerEquippable === undefined ? null : d.villagerGender
      p.wearableOptions.style1 = d.style1 !== undefined ? d.style1 : null
      p.wearableOptions.style2 = d.style2 !== undefined ? d.style1 : null
      p.subCategory = p.isWearable !== true ? d.inventoryFilename : null

      console.log('整理過的資料:', p)
      // console.log('computed_variants: ', this.computed_variants)

      return p
    },
    computed_itemImage() {
      let data = this.prop_cardData.data
      let img

      // 如果 .critterpediaImage 存在的話表示是生物類型的資料
      if (data.critterpediaImage !== undefined) {
        img = data.critterpediaImage
      }

      // 如果 .critterpediaImage 不存在的話表示是物件類型的資料
      if (data.critterpediaImage == undefined) {
        img =
          data.variants[0].closetImage || data.variants[0].storageImage || data.variants[0].image
      }

      if (!img) console.warn('找不到圖片資料! ', data)

      return img
    },
    computed_variants() {
      let d = this.prop_cardData.data
      let type = d.sourceSheet
      let variants = d.variants
      let outputData = { variantType: '', variants: [], labels: [] } // 要輸出的資料
      let vObj = { name: '', img: '' }
      outputData.variantType = type

      if (!d.variants) {
        outputData.variantType = null
        return outputData
      }

      if (type === 'Photos') {
        outputData.variantType = type
        for (let index = 0; index < variants.length; index++) {
          const v = variants[index]
          vObj.name = v.variation
          vObj.img = v.img
          outputData.variants.push(vObj)
        }
      }

      if (d.isWearable) {
        console.log('variants: 穿戴服飾類')
        outputData.variantType = type
        for (let index = 0; index < variants.length; index++) {
          const v = variants[index]
          let vObj = {
            name: v.variation,
            img: v.storageImage || v.closetImage,
            colors: v.colors,
            labelThemes: v.labelThemes
          }
          outputData.variants.push(vObj)
        }
      }

      if (!d.isWearable) {
        // console.log('variants: 非穿戴服飾類')
        outputData.variantType = type
        for (let i = 0; i < variants.length; i++) {
          const v = variants[i]
          // console.log('v: ', v)
          let vObj = {
            name: v.variation || d.name,
            img: v.storageImage || v.inventoryImage || v.image,
            colors: v.colors || [],
            labelThemes: v.labelThemes || v.themes || []
          }
          // console.log('新增的variant obj:', vObj)
          outputData.variants.push(vObj)

          const labels = variants[0].labelThemes
          outputData.labels = labels !== undefined && labels.length > 0 ? labels : []
        }
      }

      // console.warn('整理過的variants ', outputData)

      return outputData
    },
    // 將物品名稱與Store的翻譯資料做比對，並找出翻譯名稱
    computed_itemNameTranslated() {
      let idForTranslation = this.prop_cardData.data.idForTranslation
      let itemName = this.prop_cardData.data.name
      let currentLanguage = this.$store.getters[`languageSetting/${LANGUAGE.GET_CURRENT_LANGUAGE}`]
      let itemNameTranslated
      if (currentLanguage === 'en') return itemName

      console.warn('idForTranslation:', idForTranslation)
      console.warn('itemName:', itemName)

      if (idForTranslation) {
        let translationDataById = this.$store.getters[
          `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_BY_ID}`
        ]
        // let translationDataByName = this.$store.getters[
        //   `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_BY_NAME}`
        // ]
        // console.log(' translationDataById 物件:', translationDataById)

        itemNameTranslated = translationDataById[idForTranslation].translation[currentLanguage]
      }

      if (!idForTranslation) {
        console.warn('沒有idForTranslation')
        let translationDataByName = this.$store.getters[
          `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_BY_NAME}`
        ]
        // let translationDataByName = this.$store.getters[
        //   `languageSetting/${LANGUAGE.GET_TRANSLATION_DATA_BY_NAME}`
        // ]
        // console.log(' translationDataById 物件:', translationDataById)
        itemNameTranslated = translationDataByName[itemName].translation[currentLanguage]
        // console.log('itemNameTranslated:', itemNameTranslated)

        return itemNameTranslated
      }

      console.log('搜尋的翻譯結果(itemNameTranslated):', itemNameTranslated)

      return itemNameTranslated
    }
  },
  watch: {
    computed_itemData() {
      // console.log('讀取新的資料到 DetailedCardContent: ', this.computed_itemData)
    },
    computed_itemNameTranslated() {
      // console.log('computed_itemNameTranslated 重新讀取')
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>



<template>
  <div>
    <hr />

    <div class="cardDetail__container">
      <div class="cardDetail__box">
        <!-- Left: Image and btn -->

        <div class="cardDetail__box__sub">
          <h4>
            {{
              computed_itemData.isCreature === true
                ? $t(`creatures.${computed_itemData.name}`)
                : $t(`items.item.${computed_itemData.name}`)
            }}
          </h4>
          <img class="itemImage" v-bind:src="computed_itemImage" alt="" />
          <div class="cardDetail__actionBtns">
            <div>
              <AddToListBtn :prop_itemData="prop_cardData.data" />
            </div>
          </div>
        </div>
        <!-- Right: Price & Source -->
        <div class="cardDetail__box__sub">
          <div>
            <!--  Price -->
            <div class="price">
              <span> <img src="/src/assets/img/icon/bell.png" alt="" /></span>
              {{ $t(`table.header.priceSell`) }} :
              {{ computed_itemData.price.sell }}
            </div>
            <div class="price">
              <span> <img src="/src/assets/img/icon/bell.png" alt="" /></span>

              {{ $t(`table.header.priceBuy`) }} :

              {{ computed_itemData.price.buy === -1 ? 'N/A' : computed_itemData.price.buy }}
            </div>
          </div>
          <div>
            <!-- 
              Source 
            -->

            <div v-if="!computed_itemData.isCreature">
              {{ $t(`table.header.source`) }} :
              <span v-for="source in computed_itemData.sources" v-bind:key="source" :title="source">
                {{ $t(`items.sources.${source}`) }}
              </span>
            </div>

            <div v-if="computed_itemData.isCreature">
              {{ $t(`table.header.source`) }} :
              <span :title="$t(`table.header.source`)">
                {{ $t(`items.sources.catch`) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="cardDetail__box">
        <!-- Left: Category -->

        <div class="cardDetail__box__sub y-axis-scrollable">
          <div class="cardDetail_item">
            <div> {{ $t(`items.category.category`) }}: </div>

            <div>
              {{
                computed_itemData.isCreature !== true
                  ? $t(`items.category.${computed_itemData.category}`).split('/')[0]
                  : $t(`creatures.categories.${computed_itemData.sourceSheet}`)
              }}</div
            >

            <!-- <div> {{ computed_itemData.category }}</div> -->
          </div>
          <div class="cardDetail_item">
            <div> {{ $t(`items.terms.hhaPoints`) }}: </div>
            <div> {{ computed_itemData.hhaPoints }}</div>
          </div>

          <div class="cardDetail_item">
            <div> {{ $t(`items.terms.version`) }}</div>
            <div> {{ computed_itemData.version || 'N/A' }}</div>
          </div>
        </div>
        <div class="cardDetail__box__sub"> </div>
      </div>

      <!-- variant 的圖片
        如果 有 isCreature 屬性的話就不顯示，因為生物類型沒有 variants 的欄位
      -->
      <p class="heading--variationTab" v-if="!computed_itemData.isCreature"> 顏色/風格 </p>
      <van-tabs v-model:active="active" v-if="!computed_itemData.isCreature">
        <van-tab
          v-for="variant in computed_variants.variants"
          v-bind:key="variant.img"
          :title="variant.name"
        >
          <div class="variant__container">
            <div class="variant__meta">
              <img class="variant_img" :src="variant.img" :alt="variant.name" />
            </div>
            <div class="variant__meta colors-labels">
              <div class="variant__colors">
                <p
                  >Colors:
                  <van-tag
                    class="tags"
                    type="primary"
                    v-for="colors in variant.colors"
                    v-bind:key="colors"
                  >
                    {{ colors }}
                  </van-tag>
                </p>
              </div>
              <div class="variant__labels">
                <p
                  >Labels:
                  <van-tag
                    class="tags"
                    type="primary"
                    v-for="label in variant.labelThemes"
                    v-bind:key="label"
                  >
                    {{ label }}
                  </van-tag>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<style scoped>
.cardDetail__container {
  display: flex;
  flex-direction: column;
}

.cardDetail__box {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  /* border: 1px dashed blue; */
  margin-bottom: 4px;
}

.cardDetail__box .cardDetail__box__sub {
  /* flex: 1; */
  /* border: 1px dotted grey; */
  margin: 0.5rem 0 0.2rem;
  padding: 1rem;
  /* height: 10rem; */
  height: fit-content;
  /* max-height: 12rem; */
  /*  */
  width: 35rem;
  /*  */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardDetail__box .cardDetail__box__sub .itemImage {
  width: 16rem;
  margin-bottom: -3rem;
}

.cardDetail__box .cardDetail__box__sub div {
  flex: 1;
  margin: 0 0 1rem 0;
}

.cardDetail__box__sub .price img {
  width: 1.7rem;
  max-height: unset;
  margin: 0 0.5rem 0 0;
}

.cardDetail__box .cardDetail__box__sub .y-axis-scrollable {
  overflow-y: scroll;
}

.cardDetail_item {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
}

.cardDetail_item div {
  flex: 1;
}

.cardDetail_item div:nth-child(odd) {
  text-align: right;
  margin-right: 1.5rem;
}

.cardDetail_item div:nth-child(even) {
  text-align: left;
  margin-left: 1.5rem;
  color: red;
}

.cardDetail__actionBtns {
  /* background-color: rgba(245, 177, 50, 0.52); */
  width: fit-content;
  /*  */
  position: absolute;
  right: 0;
  top: 0;
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /*  */
  padding: 0.5rem;
}

.cardDetail__actionBtns .btn {
  color: #c5c2c2cc;
  transform: scale(1.2);
  font-weight: 500;
  margin: 0 0 2rem 0;
}

.cardDetail__actionBtns .btn:hover {
  color: #a7a7a7f1;
  transform: scale(1.2);
  font-weight: 500;
}

.cardDetail__actionBtns .btn:active,
.cardDetail__actionBtns .btn:focus {
  transform: scale(1);
  font-weight: 500;
}

.cardDetail__actionBtns .active {
  color: gold;
  font-weight: 500;
}

.cardDetail__actionBtns .active:hover {
  color: gold;
  transform: scale(1.2);
  font-weight: 600;
}

.cardDetail__actionBtns .active:active,
.cardDetail__actionBtns .active:focus {
  transform: scale(1);
  font-weight: 500;
}

.cardDetail-btn {
  margin: 1rem;
}
</style>


<style scoped>
.variantsTag {
  /* border: 1px solid blue; */
  padding: 0.2rem;
  margin: 0.3rem;
}

.variant__container {
  width: 100%;
}

.variant__container * {
  box-sizing: border-box;
}

.variant__container,
.variant__meta {
  flex: 1;
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  /*  */
  /* background-color: rgb(206, 214, 202); */
  padding: 1rem;
  align-items: flex-start;
  min-height: 8rem;
}

.variant__meta {
  flex: 1;
  flex-direction: column;
  /* background-color: rgb(206, 214, 202); */
  padding: 1rem;
  align-items: flex-start;
  min-height: 8rem;
}

.variant__meta img {
  max-width: 9rem;
  margin: 0 auto;
}

.variant__meta.colors-labels {
  height: 100%;
}

.variant__meta.colors-labels div {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
  min-height: 4rem;
  margin: 0.5rem 0 0 0;
}

.variant__meta.colors-labels .tags {
  margin-left: 0.5rem;
}
</style>

<style>
.cardDetail__actionBtns .add-to-list-btn-icon {
  font-size: 3rem;
  top: 1rem;
  right: 1rem;
}
</style>