import CREATURES from './creaturesDataTypes';


export default {
  [CREATURES.SET_CREATURES_CATEGORIES](state, payload) {
    console.log('Mutation: SET_CREATURES_CATEGORIES 的 payload:', payload);
    state.creatureCategories = payload;
  },
  [CREATURES.SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [CREATURES.RECALCULATE_DATA_FOR_QUERY](state, payload) {
    state.selectedCategory = payload;
  }

};