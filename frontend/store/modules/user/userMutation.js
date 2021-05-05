import USER from './userTypes';


export default {
  [USER.SET_NAME](state, payload) {
    state.userName = payload;
  },
  [USER.IS_BEING_AUTHENTICATED](state, payload) {
    if (typeof payload !== "boolean") throw Error('Payload must be boolean');
    state.userIsAuthenticated = payload;
  },
  [USER.SET_IF_AUTHENTICATED](state, payload) {
    state.userIsAuthenticated = payload;
  },
  [USER.SET_AUTHENTICATION_VALID](state, payload) {
    state.userAuthIsValidUntil = payload;
  },
  [USER.SET_ITEM_LISTS](state, payload) {
    state.userItemLists = payload;
  },
  [USER.SET_DATA_OF_CURRENT_USER](state, payload) {
    // 每當使用者登入或是透過Cookie向後端取得使用者資料的時候(payload !== null)
    // 就將登入時間寫入 localStorage，表示使用者曾經登入過，可以藉此向後端再請求資料取得list data
    if (payload !== null)
      localStorage.setItem('lastLoggedInTime', new Date().toISOString());
    state.userData = payload;
  },

};