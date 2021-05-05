import LANGUAGE from './languageSettingTypes';


export default {
  [LANGUAGE.GET_CURRENT_LANGUAGE](state) {
    return state.currentLanguage;
  },
  [LANGUAGE.GET_CURRENT_LANGUAGE_OPTIONS](state) {
    return state.languageOptions;

  },
  [LANGUAGE.GET_TRANSLATION_DATA_BY_ID](state) {
    return state.translationDataById;
  },
  [LANGUAGE.GET_TRANSLATION_DATA_BY_NAME](state) {
    return state.translationDataByName;
  },
  [LANGUAGE.GET_TRANSLATION_DATA_FOR_CREATURES](state) {
    return state.translationData_creatures;
  },
  [LANGUAGE.GET_TRANSLATION_DATA_FOR_RECIPES](state) {
    return state.translationData_recipes;
  },

};