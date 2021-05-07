<template>
  <div>
    <!-- 
      主畫面的功能按鈕(Icon):分成兩個row並使用 flexbox版面，
      每個row最多放三個icon 
      -->
    <SectionComponent :props_title="''" :props_subtitle="$t(`ui.headings.mainPageTitle`)">
      <div class="appContainer">
        <!-- 第一個Row -->
        <div class="row">
          <router-link to="/items">
            <AppIcon :p_iconData="p_iconData_items" />
          </router-link>

          <router-link to="/creatures">
            <AppIcon :p_iconData="p_iconData_creatures" />
          </router-link>

          <router-link to="/recipes">
            <AppIcon :p_iconData="p_iconData_recipe" />
          </router-link>
        </div>

        <!-- 第一個Row -->
        <div class="row">
          <router-link to="/clothing">
            <AppIcon :p_iconData="p_iconData_clothing" />
          </router-link>

          <router-link to="/lists">
            <AppIcon :p_iconData="p_iconData_lists" />
          </router-link>

          <router-link to="/auth">
            <AppIcon :p_iconData="p_iconData_account" />
          </router-link>
        </div>
      </div>
    </SectionComponent>

    <!-- 更新內容 -->
    <SectionComponent :props_title="'Updates'" :props_subtitle="''">
      <ul class="updatesContainer">
        <li>
          <div> Github </div>
          <div>
            <a
              href="https://github.com/avgsteve/vue-acnh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vue - Animal Crossing</a
            >
          </div>
        </li>
        <li>
          <div> 1.</div>
          <div> 20210503 </div>
          <div> 更新登入功能 </div>
        </li>
        <li>
          <div> 2.</div>
          <div> 20210501 </div>
          <div> 建立基本版面 </div>
        </li>
        <li>
          <div> 3.</div>
          <div> 20210501 </div>
          <div> 更新登入功能 </div>
        </li>
        <li>
          <div> 4.</div>
          <div> 20210501 </div>
          <div> 更新登入功能 </div>
        </li>
      </ul>
    </SectionComponent>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SectionComponent from './../LAYOUT/sectionComponent.vue'
import AppIcon from '../../components/Icons/AppIcon.vue'
import USER from './../../../store/modules/user/userTypes'
export default defineComponent({
  name: 'MainFunctions',
  components: { SectionComponent, AppIcon },
  setup: () => {},
  props: {
    prop1: { type: Number },
    prop2: { type: String }
  },
  data() {
    return {}
  },
  computed: {
    p_iconData_items() {
      return {
        bottomText: this.$i18n.t(`ui.list.items`),
        img: '/src/assets/img/icon/logo-leaf.png',
        notification: true
      }
    },
    p_iconData_lists() {
      return {
        bottomText: this.$i18n.t(`ui.list.list`),
        img: '/src/assets/img/icon/logo-pencil.png',
        notification: true
      }
    },
    p_iconData_recipe() {
      return {
        bottomText: this.$i18n.t(`ui.description.recipe`),
        img: '/src/assets/img/icon/logo-recipe.png',
        notification: true
      }
    },
    p_iconData_creatures() {
      return {
        bottomText: this.$i18n.t(`ui.description.creatures`),
        img: '/src/assets/img/icon/logo-creatures.png',
        notification: false
      }
    },
    p_iconData_clothing() {
      return {
        bottomText: this.$i18n.t(`ui.description.clothing`),
        img: '/src/assets/img/icon/logo-abels.png',
        notification: true
      }
    },

    p_iconData_account() {
      return {
        bottomText: this.$i18n.t(`ui.description.account`),
        img: '/src/assets/img/icon/logo-miles.png',
        notification: true
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
})
</script>
<style scoped>
.appContainer {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 1rem;
}

.row {
  flex: 1;
  min-width: 340px;
  max-width: 100%;
  display: flex;
  justify-content: space-around;
}

.updatesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.updatesContainer {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  padding-left: 1.3rem;
}

.updatesContainer li:first-of-type {
  margin-top: 1rem;
}

.updatesContainer li {
  min-height: 2rem;
  display: flex;
  align-items: center;
  margin: 0 0 0.5rem 0;
}

.updatesContainer li div {
  margin-right: 1rem;
}
</style>
