"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _listDataTypes = _interopRequireDefault(require("./listDataTypes"));

var _LIST$ADD_NEW_ITEM_TO;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setUpdatedFlagAndTimestap(state) {
  if (!state || !state.createdLists) throw new Error('須傳入state物件');
  state.createdLists.lastUpdated = new Date().toISOString();
  state.createdListsHasBeenUpdated = true;
  state.createdListsHasBeenUploaded = false;
}

var _default = (_LIST$ADD_NEW_ITEM_TO = {}, _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].ADD_NEW_ITEM_TO_LIST, function (state, newItem) {
  var listType = state.selectedListType;
  var indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單

  var targetList = state.createdLists[listType][indexOfSelectedList];

  var findItemById = function findItemById(existingItem, index) {
    // console.log('目前檢查的item:', existingItem, 'index: ', index);
    if (existingItem.id === newItem.id // 相同 id
    && existingItem.diy === newItem.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
    ) return true;
    if (existingItem.id !== newItem.id) return false;
  }; // 如果已經有相同的物件，就把新增物件的數量加到現有物件


  if (targetList.items.length > 0 && targetList.items.findIndex(findItemById) !== -1) {
    var idxOfExistingItem = targetList.items.findIndex(findItemById); // console.log('已存在與新增物件相同的重複物件 ');

    targetList.items[idxOfExistingItem].qty += newItem.qty;
  }

  if (targetList.items.length > 0 && targetList.items.findIndex(findItemById) === -1) {
    // console.log('清單中沒有找到目前要新增的物件，將物件寫入清單中 ');
    targetList.items.push(newItem);
  } // 如果沒有任何物件就直接加入清單


  if (targetList.items.length === 0) {
    targetList.items.push(newItem);
  }

  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].DELETE_ITEM_FROM_LIST, function (state, itemToDelete) {
  var listType = state.selectedListType;
  var indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單

  var targetList = state.createdLists[listType][indexOfSelectedList];

  var findItemById = function findItemById(existingItem, index) {
    // console.log('目前檢查的item:', existingItem, 'index: ', index);
    if (existingItem.id === itemToDelete.id // 相同 id
    && existingItem.diy === itemToDelete.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
    && existingItem.type === itemToDelete.type) return true;
    if (existingItem.id !== itemToDelete.id) return false;
  };

  var indexOfItemToDelete = targetList.items.findIndex(findItemById);
  targetList.items.splice(indexOfItemToDelete, 1);
  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].UPDATE_ITEM_IN_LIST, function (state, itemToUpdate) {
  var listType = state.selectedListType;
  var indexOfSelectedList = state.selectedList.split('.')[1]; // 找出是第幾個清單

  var targetList = state.createdLists[listType][indexOfSelectedList];
  console.log('Mutation: targetList', targetList);

  var findItemById = function findItemById(existingItem, index) {
    // console.log('目前檢查的item:', existingItem, 'index: ', index);
    if (existingItem.id === itemToUpdate.id // 相同 id
    && existingItem.diy === itemToUpdate.diy // 都是相同的 物件類型 (diy屬性會是 true or false )
    && existingItem.type === itemToUpdate.type) return true;
    if (existingItem.id !== itemToUpdate.id) return false;
  };

  var indexOfItemToUpdate = targetList.items.findIndex(findItemById);
  targetList.items[indexOfItemToUpdate] = itemToUpdate;
  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_LIST_DATA_FROM_LOCALSTORAGE, function (state, payload) {
  state.createdLists = payload; // console.log('已經將 localStorage 的資料寫入 state.listsData', state.createdLists);
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_SELECTED_ITEM_DATA, function (state, payload) {
  state.selectedItem = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_SELECTED_LIST_TYPE, function (state, payload) {
  state.selectedListType = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_DATA_IN_SELECTED_LIST, function (state, payload) {
  var createdLists = state.createdLists;
  var currentListType = state.selectedListType;
  var listsOfSelectedType = createdLists[currentListType];
  var currentIndex = state.selectedList.split('.')[1] || 0;
  var targetList = listsOfSelectedType[currentIndex];
  targetList.items = payload;
  window.localStorage.setItem('listData', JSON.stringify(createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].CREATE_NEW_LIST, function (state, payload) {
  var currentListType = state.selectedListType; // const existingLists = state.createdLists[currentListType];
  // console.log('目前的existingLists: ', existingLists);

  var newListItem = {
    name: payload,
    createdAt: new Date().toISOString,
    items: []
  };
  state.createdLists[currentListType].unshift(newListItem); // 需要為 collection.0

  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].REORDER_LISTS, function (state, reorderedLists) {
  // 將排序過後的清單寫回目前選擇的列表
  // 先找出目前選擇的列表
  var currentListType = state.selectedListType;
  var currentListsArr = state.createdLists[currentListType];
  var selectedList = state.selectedList;
  console.log('currentListsArr: ', currentListsArr);
  console.log('selectedList: ', selectedList); // 接著把 currentListsArr 複製到 map，以便接下來照著排序過後的 reorderedLists 寫回 Store 裡面

  var mapOfOriginalLists = new Map();
  currentListsArr.forEach(function (element) {
    mapOfOriginalLists.set(element.name, JSON.stringify(element));
  });
  var tempArrForReorderedLists = []; // 照著排序過後的 reorderedLists 寫回 Store 裡面

  for (var i = 0; i < reorderedLists.length; i++) {
    var listName = reorderedLists[i].name;
    var list = mapOfOriginalLists.get(listName); // 將取出的list資料還原成物件

    tempArrForReorderedLists.push(JSON.parse(list));
  } // console.log('完成的 tempArrForReorderedLists:', tempArrForReorderedLists);


  state.createdLists[currentListType] = tempArrForReorderedLists;
  console.log(' state.createdLists[currentListType] :', state.createdLists[currentListType]);
  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].UPDATE_LIST_NAME, function (state, payload) {
  var newListName = payload.newListName,
      oldListName = payload.oldListName;
  var currentListType = state.selectedListType;
  var currentListsArr = state.createdLists[currentListType];
  var idxOfTargetList = currentListsArr.findIndex(function (e) {
    return e.name === oldListName;
  });
  currentListsArr[idxOfTargetList].name = newListName;
  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].REMOVE_CURRENT_LIST, function (state, payload) {
  var targetListName = payload;
  var currentListType = state.selectedListType;
  var currentListsArr = state.createdLists[currentListType];
  var idxOfTargetList = currentListsArr.findIndex(function (e) {
    return e.name === targetListName;
  }); // return console.log('currentListsArr: ', currentListsArr);

  currentListsArr.splice(idxOfTargetList, 1);
  console.log('更新過的 currentListsArr: ', currentListsArr);
  setUpdatedFlagAndTimestap(state);
  window.localStorage.setItem('listData', JSON.stringify(state.createdLists));
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_SELECTED_LIST, function (state, payload) {
  state.selectedList = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_SELECTED_ITEM_TYPE, function (state, payload) {
  state.selectedItemType = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_LISTS_NAME, function (state, payload) {
  state.listNames = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_LISTS_SORTING_OPTION, function (state, payload) {
  state.listsSortingOption = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_LISTS_NAME, function (state, payload) {
  state.listNames = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_FLAG_IF_DATA_IS_UPDATED, function (state, payload) {
  if (typeof payload !== "boolean") throw new Error('payload must be boolean type');
  state.createdListsHasBeenUpdated = payload;
}), _defineProperty(_LIST$ADD_NEW_ITEM_TO, _listDataTypes["default"].SET_FLAG_IF_DATA_IS_UPLOADED, function (state, payload) {
  if (typeof payload !== "boolean") throw new Error('payload must be boolean type');
  if (payload === true) console.log('清單狀態設定為"已上傳到資料庫"');
  state.createdListsHasBeenUploaded = payload;
}), _LIST$ADD_NEW_ITEM_TO);

exports["default"] = _default;