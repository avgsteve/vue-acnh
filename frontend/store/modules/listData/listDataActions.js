import axios from 'axios';
import LIST from './listDataTypes';

export default {

  [LIST.ADD_NEW_ITEM_TO_LIST]({ commit, dispatch, state }, payload) {

    const itemType = state.selectedItemType;

    if (payload.id.$oid)
      payload.id = payload.id.$oid;
    // 讓 searchPage 傳進去  AddToListBtn 資料可以符合格式

    console.log('ADD_NEW_ITEM_TO_LIST payload: ', payload);

    if (!payload.id) throw Error('Need id');
    if (!payload.name) throw Error('Need name');
    if (!payload.category) throw Error('Need category');
    if (!payload.qty) throw Error('Need qty');
    if (!(payload.diy !== true || payload.diy !== false)) throw Error('Need diy');

    const newItemObj = {
      id: payload.id,
      name: payload.name,
      category: payload.category,
      type: itemType,
      qty: payload.qty,
      diy: payload.diy,
      createdTime: Date.now()
    };

    // console.log('Action: LIST.ADD_NEW_ITEM_TO_LIST 要新增的 ', newItemObj);

    commit(`${LIST.ADD_NEW_ITEM_TO_LIST}`, newItemObj);
  },
  [LIST.SET_SELECTED_ITEM_DATA]({ commit, dispatch, state }, payload) {
    console.log('SET_SELECTED_ITEM_DATA payload: ', payload);

    if (payload._id)
      payload.id = payload._id;
    if (payload._id.$oid)
      payload.id = payload._id.$oid;


    commit(`${LIST.SET_SELECTED_ITEM_DATA}`, payload);
  },

  [LIST.SET_LIST_DATA_FROM_LOCALSTORAGE]({ commit, dispatch, state }) {

    let dataFromStorage = localStorage.getItem('listData');
    if (!dataFromStorage) return;
    dataFromStorage = JSON.parse(dataFromStorage);

    commit(`${LIST.SET_LIST_DATA_FROM_LOCALSTORAGE}`, dataFromStorage);

  },

  [LIST.SET_SELECTED_LIST_TYPE]({ commit, dispatch, state }, payload) {
    commit(`${LIST.SET_SELECTED_LIST_TYPE}`, payload);

  },

  [LIST.SET_SELECTED_ITEM_TYPE]({ commit, dispatch, state }, payload) {
    commit(`${LIST.SET_SELECTED_ITEM_TYPE}`, payload);

  },


  [LIST.CREATE_NEW_LIST]({ commit, dispatch, state }, payload) {

    const nameOfNewList = payload;
    // const existingLists = state.createdLists;
    // const currentListType = state.selectedListType;
    // const listsOfCurrentType = Array.from(existingLists[currentListType]);
    // console.log({ nameOfNewList, existingLists, listsOfCurrentType });
    // const newListItem = {
    //   name: payload,
    //   createdAt: new Date().toISOString,
    //   items: []
    // };
    // listsOfCurrentType.unshift(newListItem);

    // console.log({ listsOfCurrentType });

    // return;

    commit(`${LIST.CREATE_NEW_LIST}`, nameOfNewList);
  },



  // [LIST.SET_CREATED_LISTS]({ commit, dispatch, state }, payload) {

  //   const selectedListType = state.selectedListType;
  //   const nameOfNewList = payload;
  //   const createdLists = state.createdLists;


  //   commit(`${LIST.SET_CREATED_LISTS}`, payload);
  // },



  [LIST.SET_SELECTED_LIST]({ commit, dispatch, state }, payload) {
    // console.log('dispatch SET_SELECTED_LIST: ', payload);
    commit(`${LIST.SET_SELECTED_LIST}`, payload);

  },



  [LIST.SET_LISTS_NAME]({ commit, dispatch, state }, payload) {

    const currentLists = Array.from(state.listNames);
    const listItem = {
      name: payload,
      createdAt: Date.now()
    };
    currentLists.push(listItem);
    commit(`${LIST.SET_LISTS_NAME}`, currentLists);
  },

  [LIST.SET_LISTS_SORTING_OPTION]({ commit, dispatch, state }, payload) {
    commit(`${LIST.SET_LISTS_SORTING_OPTION}`, payload);
  },

  // ACTION專用: 同時 SET_FLAG_IF_DATA_IS_UPDATED 設為 false 和把 SET_FLAG_IF_DATA_IS_UPLOADED 設為 true，表示已經把修改過的清單資料上傳到資料庫中
  [LIST.SET_LIST_IS_UPLOADED_AND_NOT_UPDATED]({ commit }) {
    commit(`${LIST.SET_FLAG_IF_DATA_IS_UPDATED}`, false);
    commit(`${LIST.SET_FLAG_IF_DATA_IS_UPLOADED}`, true);
  }


};

