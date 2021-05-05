import axios from 'axios';
import CREATURES from './creaturesDataTypes';

export default {

  async [CREATURES.SET_CREATURES_CATEGORIES]({ commit, dispatch }) {
    console.log('發出dispatch: FETCH_CREATURES_CATEGORIES');
    return axios.get(
      `${import.meta.env.VITE_API_ENDPOINT
      }/ac/creatures/categories`,
      // 'http://localhost:3003/api/items',
      {
        headers: {
          'CLIENT_REQ': 'Vue.js-FETCH_CREATURES_CATEGORIES'
        }
      }
    ).then(response => {
      const data = response.data;
      console.log('action裡面取得的資料.', data);
      commit(CREATURES.SET_CREATURES_CATEGORIES, data);

    });
  },
  [CREATURES.SET_CREATURES_CATEGORIES]({ commit, dispatch }, data) {
    commit(CREATURES.SET_SELECTED_CATEGORY, data);
  },

  [CREATURES.RECALCULATE_DATA_FOR_QUERY]({ commit, dispatch }, data) {
    commit(CREATURES.RECALCULATE_DATA_FOR_QUERY, data);
  }
};

