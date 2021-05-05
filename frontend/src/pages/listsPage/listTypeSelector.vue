<template>
  <van-radio-group v-model="data_selectedListType" class="listTypeSelector">
    <!-- <van-radio name="1">单选框 1</van-radio> -->
    <span class="listTypeSelector__heading"> {{ $t(`ui.list.listType`) }} </span>
    <van-radio v-for="(listName, index) in data_listTypes" :name="listName" :key="index">
      {{ $t(`ui.list.${listName}`) }}
    </van-radio>

    <!-- <van-tab v-for="(list, index) in prop_lists" :key="index" :title="list.name" :name="list.name">
    </van-tab> -->
  </van-radio-group>
</template>
<script  >
import { defineComponent } from 'vue'
import LIST from '../../../store/modules/listData/listDataTypes'
export default defineComponent({
  name: 'ListTypeSelector',
  components: {},
  setup: () => {},
  props: {},
  data() {
    return {
      data_listTypes: ['collection', 'wishList'],
      data_selectedListType: '',
      data_currentListData: {}
    }
  },
  computed: {},
  watch: {
    data_selectedListType() {
      this.$store.dispatch(`listData/${LIST.SET_SELECTED_LIST_TYPE}`, this.data_selectedListType)
      this.$emit('listTypeSelected', this.data_selectedListType)
    }
  },
  created() {
    const selectedListType = this.$store.getters[`listData/${LIST.GET_SELECTED_LIST_TYPE}`]
    this.data_selectedListType = selectedListType
  },
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.categoryHeading {
  font-size: 2rem;
  margin: 1rem 0;
}

.listTypeSelector {
  display: flex;
  flex-wrap: nowrap;
  width: 13rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0.9rem 0 1.2rem;
  /* margin-right: -14px; */
  /* border-right: 3px solid rgba(128, 128, 128, 0.459); */
  border-left: 3px solid rgba(128, 128, 128, 0.459);
  transition: all 0.3s ease-out;
  overflow-x: auto;
  position: relative;
}

@media only screen and (max-width: 500px) {
  .listTypeSelector {
    padding: 0 0.9rem 0 0.8rem;
  }
}

.listTypeSelector__heading {
  position: absolute;
  top: 0;
  left: 1.1rem;
  font-size: 1rem;
  color: rgba(155, 155, 155, 0.829);
  transition: all 0.3s ease-out;
}

.listTypeSelector:hover {
  border-left: 3px solid rgba(236, 160, 18, 0.883);
}

.listTypeSelector:hover .listTypeSelector__heading {
  color: rgba(241, 167, 28, 0.842);
}

@media only screen and (max-width: 500px) {
  .listTypeSelector__heading {
    left: 0.7rem;
    font-size: 0.8rem;
  }
}

.listTypeSelector .van-radio {
  margin-top: 1rem;
}
.listTypeSelector .van-radio:last-child {
  margin-top: 0.5rem;
}
</style>

<style>
.listTypeSelector .van-radio__label {
  white-space: nowrap;
  word-break: keep-all;
}
</style>