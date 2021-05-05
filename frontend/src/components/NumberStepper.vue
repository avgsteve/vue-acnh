<template>
  <van-stepper v-model.number="currentValue" @change="onChange" step="step" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Toast } from 'vant'
  // https://vant-contrib.gitee.io/vant/v3/#/zh-CN/stepper#wei-shi-me-value-you-shi-hou-hui-bian-cheng-string-lei-xing
  export default defineComponent({
    name: 'NumberStepper',
    components: {},
    inject: {
      currentValue: {
        default: 10
      }
    },
    setup: () => {},
    props: {
      // ↓ 是否禁用輸入
      disableInput: { type: Boolean, default: true },
      initialNumber: { type: Number, default: 5 },
      minNumber: { type: Number, default: 5 },
      maxNumber: { type: Number, default: 50 },
      step: { type: Number, default: 5 },
      // ↓ 是否只能輸入整數
      integer: { type: Boolean, default: true },
      // ↓ 是否只能輸入整數
      inputWidth: { type: String, default: '40px' },
      // ↓ 是否只能輸入整數
      buttonSize: { type: String, default: '32px' },
      // ↓ 是否禁用輸入
      longPress: { type: Boolean, default: true }
    },
    data(dataObj: any) {
      return {
        dataObj: null
        // currentNumber: 0
      }
    },
    computed: {
      // currentNumber() {
      //   return this.initialNumber
      // }
    },
    watch: {},
    created() {},
    mounted() {
      console.warn('stepper is mounted! :', this)
    },
    unmounted() {},
    methods: {
      onChange(e) {
        console.log('stepper的值改變了: ', e)
        this.$emit('EmitCurrentStepperValue', e)
      }
    }
  })
</script>
<style scoped></style>
