import GLOBAL from './globalStateTypes';


export default {
  [GLOBAL.GET_NAVBAR_STATUS](state) {
    // console.log('getter 裡面的 getItemsData');
    return state.navbarAtBottomIsShowing;
  },
  [GLOBAL.GET_LIST_POPUP_STATUS](state) {
    // console.log('getter 裡面的 getItemsData');
    return state.listPopupIsShowing;
  },
  [GLOBAL.GET_LIST_POPUP_DATA](state) {
    // console.log('getter 裡面的 getItemsData');
    return state.dataForListPopup;
  },
};