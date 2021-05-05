<template>
  <van-radio-group v-model="data_checked" class="currentListType">
    <span> {{ $t(`ui.list.listType`) }} : </span>
    <van-radio class="radioBtn" name="collection"> {{ $t(`ui.list.collection`) }} </van-radio>
    <van-radio class="radioBtn" name="wishList"> {{ $t(`ui.list.wishList`) }}</van-radio>
  </van-radio-group>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LIST from './../../../store/modules/listData/listDataTypes'
export default defineComponent({
  name: 'PopupListCurrentList',
  components: {},
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data(dataObj: any) {
    return {
      data_checked: 'collection'
    }
  },
  computed: {},
  watch: {
    data_checked() {
      // console.log('data_checked: ', this.data_checked)
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_LIST_TYPE}`, this.data_checked)
    }
  },
  created() {},
  mounted() {
    const currentListTypeFromStore = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST_TYPE}`]
    // this.data_checked = currentListTypeFromStore
  },
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.currentListType {
  position: absolute;
  top: 0.5rem;
  right: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.currentListType .radioBtn {
  margin: 1rem;
}

@media only screen and (max-width: 470px) {
  .currentListType {
    top: 0.8rem;
    right: 0.3rem;
  }

  .currentListType .radioBtn {
    margin: 0.3rem;
  }
}
</style>