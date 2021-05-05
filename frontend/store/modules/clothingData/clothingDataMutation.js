import CLOTHING from './clothingDataTypes';


export default {
  [CLOTHING.SET_CLOTHING_CATEGORIES](state, payload) {
    console.log('Mutation: SET_CLOTHING_CATEGORIES 的 payload:', payload);
    state.clothingCategories = payload;
  },
  [CLOTHING.SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [CLOTHING.RECALCULATE_DATA_FOR_QUERY](state, payload) {
    state.selectedCategory = payload;
  }

};