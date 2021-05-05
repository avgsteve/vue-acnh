import mutations from './itemsDataMutation';
import actions from './itemsDataActions';
import getters from './itemsDataGetters';

export default {
  namespaced: true,
  state() {
    return {
      itemsDataWithTranslation: [], // 原始資料，只能透過向後端請求後更新資料，不能透過其他方式修改
      // searchPage的資料
      itemDataForQuery: [], // 要查詢的資料，可以被query和sorting修改
      itemQueryKeywords: [], // 要輸入尋找物品的文字
      selectedCategory: null,
      selectedSortingOption: null,

      // itemPage的資料
      allItemsDetailData: null,
      allItemsDetailCategories: [],
      currentItemCategory: "",
      currentItemTags: [],
      filteredItems: []

    };
  },
  mutations,
  actions,
  getters
};
