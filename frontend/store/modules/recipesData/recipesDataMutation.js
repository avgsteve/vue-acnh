import RECIPES from './recipesDataTypes';


export default {
  [RECIPES.SET_RECIPES_CATEGORIES](state, payload) {
    // console.log('Mutation: SET_RECIPES_CATEGORIES 的 payload:', payload);
    state.recipesCategories = payload;
  },
  [RECIPES.SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [RECIPES.RECALCULATE_DATA_FOR_QUERY](state, payload) {
    state.selectedCategory = payload;
  }

};