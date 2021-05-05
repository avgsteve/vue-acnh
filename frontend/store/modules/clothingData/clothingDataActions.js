import axios from 'axios';
import CLOTHING from './clothingDataTypes';

export default {

  async [CLOTHING.SET_CLOTHING_CATEGORIES]({ commit, dispatch }) {
    console.log('發出dispatch: FETCH_CLOTHING_CATEGORIES');
    return axios.get(
      '/api/ac/clothing/categories',
      // 'http://localhost:3003/api/items',
      {
        headers: {
          'CLIENT_REQ': 'Vue.js-FETCH_CLOTHING_CATEGORIES'
        }
      }
    ).then(response => {
      const data = response.data;
      console.log('action裡面取得的資料.', data);
      commit(CLOTHING.SET_CLOTHING_CATEGORIES, data);

    });
  },
  [CLOTHING.SET_CLOTHING_CATEGORIES]({ commit, dispatch }, data) {
    commit(CLOTHING.SET_SELECTED_CATEGORY, data);
  },

  [CLOTHING.RECALCULATE_DATA_FOR_QUERY]({ commit, dispatch }, data) {
    commit(CLOTHING.RECALCULATE_DATA_FOR_QUERY, data);
  }
};

