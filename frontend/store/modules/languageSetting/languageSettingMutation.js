import LANGUAGE from './languageSettingTypes';

export default {
  [LANGUAGE.SET_DISPLAY_LANGUAGE](state, payload) {
    // console.log('執行 mutation: SET_DISPLAY_LANGUAGE');
    // console.log('payload: ', payload);
    state.currentLanguage = payload;
  },
  [LANGUAGE.SET_TRANSLATION_DATA_BY_ID](state, payload) {
    // console.log('SET_TRANSLATION_DATA_BY_ID payload: ', payload);
    state.translationDataById = payload;
    // console.log("state.translationDataById: ", state.translationDataById);
  },

  [LANGUAGE.SET_TRANSLATION_DATA_BY_NAME](state, payload) {
    // console.log('payload: ', payload);

    state.translationDataByName = payload;

    // console.log("state.translationDataByName: ", state.translationDataByName);

  },

  [LANGUAGE.SET_TRANSLATION_DATA_FOR_CREATURES](state, payload) {

    state.translationData_creatures = payload;
  },
  [LANGUAGE.SET_TRANSLATION_DATA_FOR_RECIPES](state, payload) {

    state.translationData_recipes = payload;
  }

};