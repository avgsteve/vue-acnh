import CLOTHING from './clothingDataTypes';


export default {
  [CLOTHING.GET_CLOTHING_CATEGORIES](state) {
    console.log('GET_CLOTHING_CATEGORIES被呼叫: state.clothingCategories:', state.clothingCategories);

    return state.clothingCategories;
  },
  [CLOTHING.GET_SELECTED_CATEGORY](state) {
    return state.selectedCategory;
  },

};