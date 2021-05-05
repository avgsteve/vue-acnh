import USER from './userTypes';


export default {
  [USER.GET_NAME](state) {
    return state.userName;
  },
  [USER.GET_IF_AUTHENTICATED](state) {
    return state.userIsAuthenticated;
  },
  [USER.GET_AUTHENTICATION_VALID](state) {
    return state.userAuthIsValidUntil;
  },
  [USER.GET_ITEM_LISTS](state) {
    return state.userItemLists;
  },
  [USER.GET_DATA_OF_CURRENT_USER](state) {
    return state.userData;
  }
};