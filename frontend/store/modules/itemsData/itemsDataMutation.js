import ITEM from './itemsDataTypes';


export default {
  // App.vue mounted 之後第一個執行的 action
  [ITEM.SET_FETCHED_ITEM_DATA](state, payload) {
    // console.log('執行 mutation: ITEM.SET_FETCHED_ITEM_DATA');
    // console.log('payload: ', payload);
    state.itemsDataWithTranslation = payload;
  },
  [ITEM.SET_ITEMS_FOR_QUERY](state, payload) {
    // console.log('執行 mutation: ITEM.SET_ITEMS_FOR_QUERY');
    // console.log('payload: ', payload);
    state.itemDataForQuery = payload;
  },
  [ITEM.SET_ITEM_CATEGORIES](state, payload) {
    // console.log('mutation: updateCategoryData is called. Payload: ', payload);
    // console.log('執行 mutation: ITEM.SET_ITEM_CATEGORIES');

    state.itemsCategoriesForSearchPage = payload;
  },
  [ITEM.SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [ITEM.SET_ITEMS_By_SELECTED_CATEGORY](state, payload) {
    // console.log('mutation: updateCategoryData is called. Payload: ', payload);
    // console.log('執行 mutation: ITEM.SET_ITEMS_By_SELECTED_CATEGORY');
    state.itemsDataFromSelectedCategory = payload;
  },
  [ITEM.SET_SELECTED_SORTING_OPTION](state, payload) {
    // console.log('mutation: updateCategoryData is called. Payload: ', payload);
    // console.log('執行 mutation: ITEM.SET_ITEM_SORT_OPTION');

    state.selectedSortingOption = payload;
  },
  [ITEM.SET_ITEMS_By_SELECTED_SORTED](state, payload) {
    // console.log('執行 mutation: ITEM.SET_ITEMS_By_SELECTED_SORTED');
    state.itemsDataFromSelectedCategoryAndSorted = payload;
  },
  [ITEM.SET_QUERY_KEYWORD](state, payload) {
    // console.log('執行 mutation: ITEM.SET_ITEMS_By_SELECTED_SORTED，payload: ', payload);
    state.itemQueryKeywords = payload;
  },
  // ============================================================

  [ITEM.SET_FETCHED_ITEM_DETAILS_DATA](state, payload) {
    state.allItemsDetailData = payload;
  },

  [ITEM.SET_ITEM_DETAILS_CATEGORIES](state, payload) {
    state.allItemsDetailCategories = payload;
  },

  [ITEM.SET_CURRENT_ITEM_CATEGORY](state, payload) {
    state.currentItemCategory = payload;
  },
  [ITEM.SET_CURRENT_ITEM_TAGS](state, payload) {
    state.currentItemTags = payload;
  },
  [ITEM.SET_FILTERED_ITEMS](state, payload) {
    state.filteredItems = payload;
  },



};