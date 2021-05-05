import RECIPES from './recipesDataTypes';


export default {
  [RECIPES.GET_RECIPES_CATEGORIES](state) {
    // console.log('GET_RECIPES_CATEGORIES被呼叫: state.recipesCategories:', state.recipesCategories);

    return state.recipesCategories;
  },
  [RECIPES.GET_SELECTED_CATEGORY](state) {
    return state.selectedCategory;
  },

};