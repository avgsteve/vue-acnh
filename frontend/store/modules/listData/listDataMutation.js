import LIST from './listDataTypes';

function setUpdatedFlagAndTimestap(state) {
  if (!state || !state.createdLists) throw new Error('須傳入state物件');
  state.createdLists.lastUpdated = new Date().toISOString();
  state.createdListsHasBeenUpdated = true;
  state.createdListsHasBeenUploaded = false;
}

export default {
  // 在 PopupLists 中送出要新增到store的資料
  [LIST.ADD_NEW_ITEM_TO_LIST](state, newItem) {

    const listType = state.selectedListType;
    const indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單
    const targetList = state.createdLists[listType][indexOfSelectedList];

    const findItemById = (existingItem, index) => {
      // console.log('目前檢查的item:', existingItem, 'index: ', index);
      if (
        existingItem.id === newItem.id // 相同 id
        && existingItem.diy === newItem.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
      )
        return true;
      if (existingItem.id !== newItem.id) return false;
    };

    // 如果已經有相同的物件，就把新增物件的數量加到現有物件
    if (
      targetList.items.length > 0 &&
      targetList.items.findIndex(findItemById) !== -1
    ) {

      const idxOfExistingItem = targetList.items.findIndex(findItemById);
      // console.log('已存在與新增物件相同的重複物件 ');
      targetList.items[idxOfExistingItem].qty += newItem.qty;
    }

    if (
      targetList.items.length > 0 &&
      targetList.items.findIndex(findItemById) === -1
    ) {
      // console.log('清單中沒有找到目前要新增的物件，將物件寫入清單中 ');
      targetList.items.push(newItem);
    }

    // 如果沒有任何物件就直接加入清單
    if (targetList.items.length === 0) {
      targetList.items.push(newItem);
    }
    setUpdatedFlagAndTimestap(state);

    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },

  [LIST.DELETE_ITEM_FROM_LIST](state, itemToDelete) {

    const listType = state.selectedListType;
    const indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單
    const targetList = state.createdLists[listType][indexOfSelectedList];

    const findItemById = (existingItem, index) => {
      // console.log('目前檢查的item:', existingItem, 'index: ', index);
      if (
        existingItem.id === itemToDelete.id // 相同 id
        && existingItem.diy === itemToDelete.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
        && existingItem.type === itemToDelete.type
      )
        return true;
      if (existingItem.id !== itemToDelete.id) return false;
    };


    const indexOfItemToDelete = targetList.items.findIndex(findItemById);
    targetList.items.splice(indexOfItemToDelete, 1);

    setUpdatedFlagAndTimestap(state);


    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },

  [LIST.UPDATE_ITEM_IN_LIST](state, itemToUpdate) {

    const listType = state.selectedListType;
    const indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單
    const targetList = state.createdLists[listType][indexOfSelectedList];
    console.log('Mutation: targetList', targetList);

    const findItemById = (existingItem, index) => {
      // console.log('目前檢查的item:', existingItem, 'index: ', index);
      if (
        existingItem.id === itemToUpdate.id // 相同 id
        && existingItem.diy === itemToUpdate.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
        && existingItem.type === itemToUpdate.type
      )
        return true;
      if (existingItem.id !== itemToUpdate.id) return false;
    };

    const indexOfItemToUpdate = targetList.items.findIndex(findItemById);

    targetList.items[indexOfItemToUpdate] = itemToUpdate;
    setUpdatedFlagAndTimestap(state);

    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },

  [LIST.SET_LIST_DATA_FROM_LOCALSTORAGE](state, payload) {
    state.createdLists = payload;
    // console.log('已經將 localStorage 的資料寫入 state.listsData', state.createdLists);
  },
  [LIST.SET_SELECTED_ITEM_DATA](state, payload) {
    state.selectedItem = payload;
  },
  [LIST.SET_SELECTED_LIST_TYPE](state, payload) {
    state.selectedListType = payload;
  },
  // 在 listsPage.vue 中修改資料
  [LIST.SET_DATA_IN_SELECTED_LIST](state, payload) {
    const createdLists = state.createdLists;
    const currentListType = state.selectedListType;
    const listsOfSelectedType = createdLists[currentListType];
    const currentIndex = state.selectedList.split('.')[1] || 0;
    const targetList = listsOfSelectedType[currentIndex];
    targetList.items = payload;
    window.localStorage.setItem('listData', JSON.stringify(createdLists));

  },


  // 建立新的清單
  [LIST.CREATE_NEW_LIST](state, payload) {

    const currentListType = state.selectedListType;
    // const existingLists = state.createdLists[currentListType];
    // console.log('目前的existingLists: ', existingLists);
    const newListItem = {
      name: payload,
      createdAt: new Date().toISOString,
      items: []
    };

    state.createdLists[currentListType].unshift(newListItem);
    // 需要為 collection.0
    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },
  // 排序清單
  [LIST.REORDER_LISTS](state, reorderedLists) {
    // 將排序過後的清單寫回目前選擇的列表

    // 先找出目前選擇的列表
    const currentListType = state.selectedListType;
    let currentListsArr = state.createdLists[currentListType];
    const selectedList = state.selectedList;

    console.log('currentListsArr: ', currentListsArr);
    console.log('selectedList: ', selectedList);

    // 接著把 currentListsArr 複製到 map，以便接下來照著排序過後的 reorderedLists 寫回 Store 裡面
    const mapOfOriginalLists = new Map();
    currentListsArr.forEach(element => {
      mapOfOriginalLists.set(element.name, JSON.stringify(element));
    });

    const tempArrForReorderedLists = [];
    // 照著排序過後的 reorderedLists 寫回 Store 裡面
    for (let i = 0; i < reorderedLists.length; i++) {
      const listName = reorderedLists[i].name;
      const list = mapOfOriginalLists.get(listName);
      // 將取出的list資料還原成物件
      tempArrForReorderedLists.push(JSON.parse(list));
    }

    // console.log('完成的 tempArrForReorderedLists:', tempArrForReorderedLists);

    state.createdLists[currentListType] = tempArrForReorderedLists;

    console.log(' state.createdLists[currentListType] :',
      state.createdLists[currentListType]);

    setUpdatedFlagAndTimestap(state);


    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },
  // 更新清單名稱
  [LIST.UPDATE_LIST_NAME](state, payload) {

    const { newListName, oldListName } = payload;

    const currentListType = state.selectedListType;
    let currentListsArr = state.createdLists[currentListType];

    const idxOfTargetList = currentListsArr.findIndex(e =>
      e.name === oldListName);

    currentListsArr[idxOfTargetList].name = newListName;
    setUpdatedFlagAndTimestap(state);
    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },

  [LIST.REMOVE_CURRENT_LIST](state, payload) {

    const targetListName = payload;

    const currentListType = state.selectedListType;
    let currentListsArr = state.createdLists[currentListType];

    const idxOfTargetList = currentListsArr.findIndex(e =>
      e.name === targetListName);

    // return console.log('currentListsArr: ', currentListsArr);

    currentListsArr.splice(idxOfTargetList, 1);

    console.log('更新過的 currentListsArr: ', currentListsArr);
    setUpdatedFlagAndTimestap(state);
    window.localStorage.setItem('listData', JSON.stringify(state.createdLists));

  },

  [LIST.SET_SELECTED_LIST](state, payload) {
    state.selectedList = payload;
  },

  [LIST.SET_SELECTED_ITEM_TYPE](state, payload) {
    state.selectedItemType = payload;
  },

  [LIST.SET_LISTS_NAME](state, payload) {
    state.listNames = payload;
  },
  [LIST.SET_LISTS_SORTING_OPTION](state, payload) {
    state.listsSortingOption = payload;
  },

  // 資料被修改後的 flag，用來提示資料是否被修改過，以及是否已經上傳到資料庫作為備份資料

  [LIST.SET_LISTS_NAME](state, payload) {
    state.listNames = payload;
  },
  [LIST.SET_FLAG_IF_DATA_IS_UPDATED](state, payload) {
    if (typeof payload !== "boolean") throw new Error('payload must be boolean type');
    state.createdListsHasBeenUpdated = payload;
  },

  [LIST.SET_FLAG_IF_DATA_IS_UPLOADED](state, payload) {
    if (typeof payload !== "boolean")
      throw new Error('payload must be boolean type');
    if (payload === true)
      console.log('清單狀態設定為"已上傳到資料庫"');
    state.createdListsHasBeenUploaded = payload;
  },
};