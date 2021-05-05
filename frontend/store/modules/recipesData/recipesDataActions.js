import axios from 'axios';
import RECIPES from './recipesDataTypes';

export default {

  async [RECIPES.SET_RECIPES_CATEGORIES]({ commit, dispatch }) {
    // console.log('發出dispatch: FETCH_RECIPES_CATEGORIES');
    return axios.get(
      '/api/ac/recipes/categories',
      // 'http://localhost:3003/api/items',
      {
        headers: {
          'CLIENT_REQ': 'Vue.js-FETCH_RECIPES_CATEGORIES'
        }
      }
    ).then(response => {
      const data = response.data;
      // console.log('action裡面取得的資料.', data);
      commit(RECIPES.SET_RECIPES_CATEGORIES, data);

    });
  },
  [RECIPES.SET_RECIPES_CATEGORIES]({ commit, dispatch }, data) {
    commit(RECIPES.SET_SELECTED_CATEGORY, data);
  },

  [RECIPES.RECALCULATE_DATA_FOR_QUERY]({ commit, dispatch }, data) {
    commit(RECIPES.RECALCULATE_DATA_FOR_QUERY, data);
  }
};

