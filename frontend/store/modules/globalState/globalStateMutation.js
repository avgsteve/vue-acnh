import GLOBAL from './globalStateTypes';


export default {
  // App.vue mounted 之後第一個執行的 action
  [GLOBAL.SET_NAVBAR_STATUS](state, payload) {
    state.navbarAtBottomIsShowing = payload;
    console.log('current navbar display:',
      state.navbarAtBottomIsShowing);
  },
  [GLOBAL.SET_LIST_POPUP_STATUS](state, payload) {
    state.listPopupIsShowing = payload;
  },
  [GLOBAL.SET_LIST_POPUP_DATA](state, payload) {
    state.dataForListPopup = payload;
  },

};