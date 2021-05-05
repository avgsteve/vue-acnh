"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _listDataTypes = _interopRequireDefault(require("./listDataTypes"));

var _LIST$GET_SELECTED_IT;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_LIST$GET_SELECTED_IT = {}, _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_SELECTED_ITEM_DATA, function (state) {
  return state.selectedItem;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_SELECTED_LIST_TYPE, function (state) {
  return state.selectedListType;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_SELECTED_ITEM_TYPE, function (state) {
  return state.selectedItemType;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_CREATED_LISTS, function (state) {
  return state.createdLists;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_SELECTED_LIST, function (state) {
  return state.selectedList;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_LISTS_OF_SELECTED_LIST_TYPE, function (state) {
  var createdLists = state.createdLists;
  var currentListType = state.selectedListType;
  var listsOfSelectedType = createdLists[currentListType];
  return listsOfSelectedType;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_DATA_OF_SELECTED_LIST, function (state) {
  var createdLists = state.createdLists;
  var currentListType = state.selectedListType;
  var listsOfSelectedType = createdLists[currentListType];

  if (listsOfSelectedType.length === 0) {
    listsOfSelectedType.push({
      name: 'default list',
      createdAt: new Date().toISOString,
      items: []
    });
  }

  var currentIndex = state.selectedList.split('.')[1] || 0;
  if (!listsOfSelectedType[currentIndex]) currentIndex = 0; // 因為切換不同type列表的時候index可能會不一樣，
  // 如果同樣的index找不到列表的話就要從第一個開始

  var data = listsOfSelectedType[currentIndex].items; // console.log('GET_DATA_OF_SELECTED_LIST: ', data);

  return data;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_SELECTED_LIST_OBJECT, function (state) {
  var createdLists = state.createdLists;
  var currentListType = state.selectedListType;
  var listsOfSelectedType = createdLists[currentListType]; // console.log('state.selectedList: ', state.selectedList);

  var currentIndex = state.selectedList.split('.')[1] || 0;
  if (!listsOfSelectedType[currentIndex]) currentIndex = 0; // 因為切換不同type列表的時候index可能會不一樣，
  // 如果同樣的index找不到列表的話就要從第一個開始

  var data = listsOfSelectedType[currentIndex]; // console.log('GET_DATA_OF_SELECTED_LIST: ', data);

  return data;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_LISTS_SORTING_OPTION, function (state) {
  return state.listsSortingOption;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_FLAG_IF_DATA_IS_UPDATED, function (state) {
  return state.createdListsHasBeenUpdated;
}), _defineProperty(_LIST$GET_SELECTED_IT, _listDataTypes["default"].GET_FLAG_IF_DATA_IS_UPLOADED, function (state) {
  return state.createdListsHasBeenUploaded;
}), _LIST$GET_SELECTED_IT);

exports["default"] = _default;