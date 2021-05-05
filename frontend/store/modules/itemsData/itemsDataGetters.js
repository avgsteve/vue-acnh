import ITEMS from './itemsDataTypes';


export default {
  [ITEMS.GET_ITEMS_FOR_QUERY](state) {
    // console.log('getter 裡面的 getItemsData');
    return state.itemDataForQuery;
  },
  [ITEMS.GET_ITEM_CATEGORIES](state) {
    return state.itemsCategoriesForSearchPage;
  },
  [ITEMS.GET_SELECTED_CATEGORY](state) {
    return state.selectedCategory;
  },
  [ITEMS.get_SELECTED_SORTING_OPTION](state) {
    return state.selectedSortingOption;
  },

  // ============== itemsPage  ==============

  [ITEMS.get_ITEM_DETAILS_CATEGORIES](state) {
    // console.log('getter 裡面的 getItemsData');
    return state.allItemsDetailCategories;
  },
  [ITEMS.get_CURRENT_ITEM_CATEGORY](state) {
    return state.currentItemCategory;
  },
  [ITEMS.get_CURRENT_ITEM_TAGS](state) {
    return state.currentItemTags;
  },
  [ITEMS.get_FILTERED_ITEMS](state) {
    return state.filteredItems;
  },


};