import axios from 'axios';
import USER from './userTypes';
import LIST from './../listData/listDataTypes';

export default {
  [USER.SET_NAME]({ commit, dispatch }, payload) {
    console.log('發出dispatch: USER.SET_NAME. Payload: ', payload);
    commit(USER.SET_NAME, payload);
  },
  [USER.SET_IF_AUTHENTICATED]({ commit, dispatch }, payload) {
    console.log('發出dispatch: USER.SET_IF_AUTHENTICATED. Payload: ', payload);
    if (payload === true)
      // ↓ 讓 App.vue 在掛載的時候可以檢查是否有登入過
      localStorage.setItem('lastLoggedInTime', new Date().toISOString());

    commit(USER.SET_IF_AUTHENTICATED, payload);
  },
  [USER.SET_AUTHENTICATION_VALID]({ commit, dispatch }, payload) {
    console.log('發出dispatch: USER.SET_AUTHENTICATION_VALID. Payload: ', payload);
    commit(USER.SET_AUTHENTICATION_VALID, payload);
  },
  [USER.SET_DATA_OF_CURRENT_USER]({ commit, dispatch }, payload) {
    commit(USER.SET_DATA_OF_CURRENT_USER, payload);
  },

  // 在App.vue掛載的時候: #1 檢查是否有登入過的紀錄 & 
  // 有的話就進行以下的action: 
  // #2 從API取得使用者的資料 & #3 更新 list data
  [USER.GET_CURRENT_USER_DATA_WITH_COOKIE]({ commit, dispatch }, payload) {

    return axios
      .get('/api/me/listData')
      .then((response) => {
        const currentUser = response.data;
        console.log('ACTION :GET_CURRENT_USER_DATA_WITH_COOKIE 取得的資料', currentUser);

        // #2 在Store中更新使用者的驗證狀態和資料，
        // 如果API傳回的currentUser是 null 的話，action payload 就會是 false, 
        // 也就不會把狀態設定成已登入
        dispatch(`${USER.SET_IF_AUTHENTICATED}`, !currentUser ? false : true);
        dispatch(`${USER.SET_DATA_OF_CURRENT_USER}`, !currentUser ? null : currentUser
        );

        // #3 設定list data之前先檢查 localStorage有沒有  listData，
        // 有的話比對 API取得的 listData 跟 localStorage 的 listData資料 哪一個比較新
        const listDataFromLocalStorage = localStorage.getItem('listData');
        const listDataFromDB = currentUser.listData;

        let lastestListDataForStore;

        if (listDataFromLocalStorage && listDataFromDB) {
          // 將比較新的資料寫入Store
          if (listDataFromDB.updatedAt > listDataFromLocalStorage.updatedAt)
            lastestListDataForStore = listDataFromDB;
          lastestListDataForStore = listDataFromLocalStorage;
          dispatch(
            `listData/${LIST.SET_LIST_DATA_FROM_LOCALSTORAGE}`,
            lastestListDataForStore,
            { root: true }
          );
          return;
        }

        // 如果只有資料庫或是 localStorage其中之一有listData資料的話
        // 就將目前有的資料寫入 Store；都沒有的話就寫入 null
        dispatch(
          `listData/${LIST.SET_LIST_DATA_FROM_LOCALSTORAGE}`,
          listDataFromLocalStorage || listDataFromDB || null,
          { root: true }
        );


      }).catch(error => {
        console.log('error:', error);
      });

  },

};

