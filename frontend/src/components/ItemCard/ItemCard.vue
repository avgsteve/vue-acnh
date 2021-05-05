<template>
  <!-- 
    :close-on-click-overlay="prop_cardData.setting.closeOnClickOverlay"

this.$t(`items.terms.detail`)
 -->
  <van-dialog
    class="item-card-dialog"
    :show="computed_showCard"
    v-bind:title="computed_cardTitle"
    width="90vw"
    :show-cancel-button="prop_cardData.setting.showCancelBtn"
    :close-on-click-overlay="closeOnOverlay"
    confirmButtonText="close"
    @confirm="onConfirm"
    @close="onClose"
  >
    <div v-if="computed_showLoader" class="cardBodyPreloader">
      <van-loading type="spinner" color="#1989fa" />
    </div>

    <div v-if="!computed_showLoader" class="cardBody">
      <slot></slot>
    </div>
  </van-dialog>
</template>

<!-- Comment
    1. 關掉 dialog的方式: 
        原本是直接按confirm，改為透過emit的方式傳到parent component，透過parent component的emit handler去控制傳到 dialog 的 prop (prop_showCard) 來進行關閉 dialog的操作
    ref: https://vant-contrib.gitee.io/vant/v3/#/zh-CN/dialog#dialogoptions
-->


<script  >
import {
  defineComponent
  // ref
} from 'vue'
export default defineComponent({
  name: 'ItemCard',
  components: {},
  setup() {
    // const show = ref(false)
    // return { show }
  },
  props: {
    prop_showCancelBtn: {
      type: Boolean,
      require: false,
      default: false
    },
    prop_cardData: {
      type: Object,
      required: true,
      showCard: false,
      cardTitle: '',
      cardContentIsLoading: true
    }
  },
  data() {
    return {
      dataObj: null,
      closeOnOverlay: true
    }
  },
  computed: {
    computed_cardTitle() {
      // let title = this.prop_cardData.cardTitle
      // console.log('標題: ', title)
      let title = this.$t(`items.terms.detail`)
      if (!title) return '無標題'
      if (title) return title
    },
    computed_showCard() {
      let showCard = this.prop_cardData.showCard
      if (!showCard) return false
      if (showCard) return true
    },
    computed_showLoader() {
      let showLoader = this.prop_cardData.setting.showLoader
      // console.log('標題: ', title)
      if (!showLoader) return false
      if (showLoader) return true
    }
  },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onConfirm(event) {
      console.log('confirm btn clicked')
      this.$emit('cardConfirmBtnClicked', false)
    },
    onClose(event) {
      console.log('close btn clicked')
      this.$emit('cardCloseBtnClicked', 'someValue')
    }
  }
})
</script>
<style scoped>
.cardSlot {
  width: 100%;
}

.cardBodyPreloader {
  height: 20vh;
  max-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.cardBody {
  background-color: rgb(219, 245, 230);
  /* background: url('/public/bg/bg1.jpg'); */
  min-height: 10rem;
  /* max-height: 75vh; */
  padding: 1rem;
  width: 100%;
  display: inline-block;
}
</style>

<style>
/* override  <van-dialog> 原本的標題 CSS設定*/
.van-dialog__header {
  /* padding-top: 26px; */
  padding-top: 1.1rem;
}

.item-card-dialog {
  max-width: 130rem;
}

.item-card-dialog .van-dialog__content {
  max-height: 55vh;
  overflow-y: scroll;
}
</style>