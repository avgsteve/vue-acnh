import mutations from './languageSettingMutation';
import actions from './languageSettingActions';
import getters from './languageSettingGetters';

export default {
  namespaced: true,
  state() {
    return {
      currentLanguage: 'en',
      languageOptions: ['en', 'zhTW', 'zhCN'],
      translationDataById: {},
      translationDataByName: {},
      translationData_creatures: {},
      translationData_recipes: {}

      // 要跟 main.js 裡面的 createI18n 設定一樣
    };
  },
  mutations,
  actions,
  getters
};
