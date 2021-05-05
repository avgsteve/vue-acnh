import axios from 'axios';
import GLOBAL from './globalStateTypes';
import LANGUAGE from '../languageSetting/languageSettingTypes';

export default {

  [GLOBAL.SET_NAVBAR_STATUS]({ commit, dispatch, state }, payload) {

    commit(`${GLOBAL.SET_NAVBAR_STATUS}`, payload);
  },
  [GLOBAL.SET_LIST_POPUP_STATUS]({ commit, dispatch, state }, payload) {

    commit(`${GLOBAL.SET_LIST_POPUP_STATUS}`, payload);
  },
  [GLOBAL.SET_LIST_POPUP_DATA]({ commit, dispatch, state }, payload) {

    commit(`${GLOBAL.SET_LIST_POPUP_DATA}`, payload);
  },

};

