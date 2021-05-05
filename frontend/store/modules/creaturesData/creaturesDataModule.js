import mutations from './creaturesDataMutation';
import actions from './creaturesDataActions';
import getters from './creaturesDataGetters';

export default {
  namespaced: true,
  state() {
    return {
      // searchPage的資料
      creaturesData: [], // 要查詢的資料，可以被query和sorting修改
      creatureCategories: [],
      selectedCategory: null,
      filteredCreaturesData: []
    };
  },
  mutations,
  actions,
  getters
};
