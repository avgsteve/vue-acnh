import mutations from './clothingDataMutation';
import actions from './clothingDataActions';
import getters from './clothingDataGetters';

export default {
  namespaced: true,
  state() {
    return {
      // searchPage的資料
      clothingData: [], // 要查詢的資料，可以被query和sorting修改
      clothingCategories: [],
      selectedCategory: null,
      filteredClothingData: []
    };
  },
  mutations,
  actions,
  getters
};
