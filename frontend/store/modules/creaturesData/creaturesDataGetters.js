import CREATURES from './creaturesDataTypes';


export default {
  [CREATURES.GET_CREATURES_CATEGORIES](state) {
    console.log('GET_CREATURES_CATEGORIES被呼叫: state.creatureCategories:', state.creatureCategories);

    return state.creatureCategories;
  },
  [CREATURES.GET_SELECTED_CATEGORY](state) {
    return state.selectedCategory;
  },

};