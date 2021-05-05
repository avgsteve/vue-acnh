<template>
  <div class="listCopyContainer">
    <h5 class="subtitle">選擇要顯示的欄位</h5>
    <div class="checkBox">
      <van-checkbox-group v-model="propsToIgnore" ref="checkboxGroup">
        <!-- <van-checkbox name="category"> 物品分類 </van-checkbox> -->
        <van-checkbox class="chkBox" name="type"> 物品屬性(一般物品/DIY) </van-checkbox>
        <van-checkbox class="chkBox" name="qty"> 數量</van-checkbox>
      </van-checkbox-group>
    </div>

    <div class="checkBox autoSelect">
      <van-button class="chkBoxBtn" size="small" type="primary" @click="checkAll"> 全選</van-button>
      <van-button class="chkBoxBtn" size="small" type="primary" @click="uncheckAll"
        >全部不選</van-button
      >
      <van-button class="chkBoxBtn" size="small" type="primary" @click="resetTextarea"
        >重設全部</van-button
      >
      <van-button
        class="chkBoxBtn"
        color="#18c43e"
        size="small"
        type="primary"
        @click="copyTextFromTextarea"
        >複製文字</van-button
      >
    </div>

    <textarea
      name=""
      ref="textarea"
      id="copyModeTextarea"
      v-model="data_textareaText"
      cols="30"
      rows="10"
    ></textarea>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { Toast } from 'vant'
import LIST from './../../../store/modules/listData/listDataTypes'

export default defineComponent({
  name: 'listCopyMode',
  components: {},
  setup() {
    const checked = ref([])
    // const checkboxGroup = ref()
    const checkboxGroup = ref(['type', 'qty'])
    const propsToIgnore = ref(['type', 'qty'])

    const checkAll = () => {
      checkboxGroup.value.toggleAll(true)
    }
    const toggleAll = (boolean) => {
      checkboxGroup.value.toggleAll(boolean)
    }
    const uncheckAll = () => {
      checkboxGroup.value.toggleAll(false)
    }

    // watch(propsToIgnore, (newValue, oldValue) => {
    //   console.log({ newValue, oldValue })
    // })

    return {
      checked,
      checkAll,
      uncheckAll,
      toggleAll,
      propsToIgnore,
      checkboxGroup
    }
  },
  props: {
    prop_dataOfClickedList: {
      type: Object
    }
  },
  data() {
    return {
      data_textareaText: ''
    }
  },
  computed: {
    // 透過 listsPage 這個 parent component 傳進來的 prop 動態讀取 list 的值
    computed_dataForTextarea() {
      // #1 將listItems array中的每筆資料抽出並結合成一整行 string
      // #2 遇到 propsToIgnore 中要跳過的 prop name就不要放到string
      const space = ' '
      const locale = this.$i18n.locale // en , zhTW , zhCN
      let listItems = this.prop_dataOfClickedList
      let propsToIgnore = this.propsToIgnore // [category,type,qty]
      let textareaString = ''

      for (let i = 0; i < listItems.length; i++) {
        // #1
        const item = listItems[i]
        const itemName = this.$i18n.t(`items.item.${item.name.split("'").join('')}`)
        textareaString += `${i + 1}. ${itemName}` + space // 每一筆資料的開頭都是序號加名稱

        // 找出是 diy 或是 item
        if (propsToIgnore.includes('type')) {
          let type = item['type'] === 'diy' ? 'recipe' : 'item' // 翻譯文件中的recipe就是diy
          type = this.$i18n.t(`ui.description.${type}`)
          textareaString += '(' + type + ').' + space
        }
        if (propsToIgnore.includes('qty')) {
          if (locale.includes('zh')) {
            textareaString += item['qty'] + space
            textareaString += `${locale.includes('TW') ? '個' : '个'}`
          }

          if (!locale.includes('zh')) {
            textareaString += 'qty: ' + item['qty'] + space
          }
        }
        textareaString += '\n' // 換下一行
      }

      return textareaString
    }
  },
  watch: {
    computed_dataForTextarea() {
      this.data_textareaText = this.computed_dataForTextarea
    }
  },
  created() {},
  beforeMount() {
    this.data_textareaText = this.computed_dataForTextarea
  },
  mounted() {},
  unmounted() {},
  methods: {
    resetTextarea() {
      this.data_textareaText = this.computed_dataForTextarea
      this.checkAll()
    },
    copyTextFromTextarea() {
      Toast.success('已將文字複製剪貼簿!')
      let textToCopy = document.getElementById('copyModeTextarea').select()
      document.execCommand('copy')
    }
  }
})
</script>
<style scoped>
.listCopyContainer {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: center;
}

.subtitle {
  margin: 0.5rem auto;
  font-weight: 300;
  color: gray;
}

.chkBox:last-child {
  margin: 0.4rem 0;
}
.chkBoxBtn {
  margin: 2px;
  border-radius: 6px;
}
</style>