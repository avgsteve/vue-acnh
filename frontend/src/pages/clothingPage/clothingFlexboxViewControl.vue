<template>
  <div id="displayControl">
    <div class="displayControl__box displayFilter">
      <van-field
        id="filterInputField"
        class="override"
        v-model="filterText"
        center
        clearable
        :label="$t('searchBar.filter')"
        placeholder="Enter filter"
        @focus="onFocus"
        @blur="onBlur"
      >
        <!-- <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template> -->
      </van-field>
    </div>
    <div class="displayControl__box sizeScaleSlider__container">
      <p class="sliderText"> {{ $t('searchBar.scaleSlider') }} </p>
      <div>
        <van-slider
          class="sizeScaleSlider"
          v-model="scaleValue"
          @change="onScaleValueChanged"
          :max="200"
          :min="50"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'clothingFlexboxViewControl',
  components: {},
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data() {
    return {
      scaleValue: 100,
      filterText: '',
      delayedEmitTimer: ''
    }
  },
  computed: {},
  watch: {
    filterText() {
      clearTimeout(this.delayedEmitTimer)
      const filterText = this.filterText
      const filterInputField = document.querySelector('#filterInputField')
      if (filterText) filterInputField.classList.add('active')
      if (!filterText) filterInputField.classList.remove('active')

      const delayedEmitTimer = setTimeout(() => {
        console.log('emit!: ', filterText)
        this.$emit('filterTextChanged', filterText)
      }, 500)
      this.delayedEmitTimer = delayedEmitTimer
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onScaleValueChanged(scaleValue) {
      const text = '目前縮放比例'
      Toast(text + ':' + scaleValue + '%')
      this.$emit('scaleValueChanged', scaleValue)
    },
    onFocus(eventObj) {
      console.log('eventObj: ', eventObj)
      const target = document.querySelector('#filterInputField')
      target.classList.add('active')
    },
    onBlur(eventObj) {
      console.log('not focused')
      const target = document.querySelector('#filterInputField')
      if (!this.filterText) target.classList.remove('active')
    }
  }
})
</script>
<style scoped>
#displayControl {
  display: flex;
  justify-content: space-evenly;
}

#displayControl .displayControl__box {
  width: 45%;
  display: flex;
}

@media only screen and (max-width: 600px) {
  #displayControl {
    flex-direction: column;
    align-items: center;
  }
  #displayControl .displayControl__box {
    width: 80%;
    display: flex;
  }
}

.displayControl__box .displayFilter {
  display: flex;
  justify-content: center;
  align-content: center;
}

.displayFilter .van-cell {
  background-color: transparent;
}

.displayFilter .van-cell .van-field__control {
  border-bottom: 2px solid rgba(128, 128, 128, 0.514);
}

.sizeScaleSlider__container {
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  position: relative;
  /* padding: 0 1rem; */
  /* width: 100%; */
}

.sliderText {
  position: absolute;
  left: 35%;
  top: -45px;
  font-size: 1.5rem;
  color: grey;
}
</style>

<style>
#filterInputField .van-field__label {
  width: unset;
  font-size: 2rem;
}

#filterInputField .van-cell__value {
  border-bottom: 2px solid rgba(128, 128, 128, 0.137);
  margin-right: 1rem;
  transition: all 0.4s ease-in-out;
}

#filterInputField.active .van-cell__value {
  border-bottom: 2px solid rgb(251 152 30 / 83%);
  margin-right: 1rem;
  margin-right: 1rem;
}

#filterInputField .van-field__label {
  width: unset;
}
</style>