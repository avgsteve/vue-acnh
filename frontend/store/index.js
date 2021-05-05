import { createStore, useStore as baseUseStore } from 'vuex';
import languageSetting from './modules/languageSetting/languageSettingModule';
import itemsData from './modules/itemsData/itemsDataModule';
import creaturesData from './modules/creaturesData/creaturesDataModule';
import recipesData from './modules/recipesData/recipesDataModule';
import clothingData from './modules/clothingData/clothingDataModule';
import globalStatus from './modules/globalState/globalStateModule';
import listData from './modules/listData/listDataModule';
import user from './modules/user/userModule';


// export interface State {
//   itemsCategoriesForSearchPage: any;
//   itemsData: object,
//   count: number,
// }


export const store = createStore({
  modules: {
    globalStatus,
    languageSetting,
    itemsData,
    listData,
    creaturesData,
    recipesData,
    clothingData,
    user
  },
  state() {
    return {
      count: 0,
    };
  },
  actions: {
  },
  mutations: {

  }
});

// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
export function useStore() {
  return baseUseStore();
}


// Vuex 的 TypeScript設定: https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component

//