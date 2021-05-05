import mutations from './userMutation';
import actions from './userActions';
import getters from './userGetters';

// #1 送出資料到後端
// #2 顯示讀取中的狀態  (emit 到 parent 或是透過 store)
// #3 接收資料後結束讀取中的狀態
// #4 在store中顯示使用者已經登入或是未登入的狀態
// #5 更新 userAuthIsValidUntil
// #6 比對使用者的 userItemLists 欄位內的資料是否比 localStorage 新

export default {
  namespaced: true,
  state() {
    return {
      userName: "",
      userData: null,
      isBeingAuthenticated: false,
      userIsAuthenticated: false,
      lastLoggedInTime: null,
      // ↑ 預設是透過 localStorage 儲存

      userAuthIsValidUntil: Date.now() + (1000 * 60 * 60 * 24),
      userItemLists: {
      }

    };
  },
  mutations,
  actions,
  getters
};
