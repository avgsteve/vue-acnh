import mutations from './recipesDataMutation';
import actions from './recipesDataActions';
import getters from './recipesDataGetters';

export default {
  namespaced: true,
  state() {
    return {
      // searchPage的資料
      recipesData: [], // 要查詢的資料，可以被query和sorting修改
      recipesCategories: [],
      selectedCategory: null,
      filteredCreaturesData: []
    };
  },
  mutations,
  actions,
  getters
};
