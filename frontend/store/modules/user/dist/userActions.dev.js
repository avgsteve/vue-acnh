"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _userTypes = _interopRequireDefault(require("./userTypes"));

var _listDataTypes = _interopRequireDefault(require("./../listData/listDataTypes"));

var _USER$SET_NAME$USER$S;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_USER$SET_NAME$USER$S = {}, _defineProperty(_USER$SET_NAME$USER$S, _userTypes["default"].SET_NAME, function (_ref, payload) {
  var commit = _ref.commit,
      dispatch = _ref.dispatch;
  console.log('發出dispatch: USER.SET_NAME. Payload: ', payload);
  commit(_userTypes["default"].SET_NAME, payload);
}), _defineProperty(_USER$SET_NAME$USER$S, _userTypes["default"].SET_IF_AUTHENTICATED, function (_ref2, payload) {
  var commit = _ref2.commit,
      dispatch = _ref2.dispatch;
  console.log('發出dispatch: USER.SET_IF_AUTHENTICATED. Payload: ', payload);
  if (payload === true) // ↓ 讓 App.vue 在掛載的時候可以檢查是否有登入過
    localStorage.setItem('lastLoggedInTime', new Date().toISOString());
  commit(_userTypes["default"].SET_IF_AUTHENTICATED, payload);
}), _defineProperty(_USER$SET_NAME$USER$S, _userTypes["default"].SET_AUTHENTICATION_VALID, function (_ref3, payload) {
  var commit = _ref3.commit,
      dispatch = _ref3.dispatch;
  console.log('發出dispatch: USER.SET_AUTHENTICATION_VALID. Payload: ', payload);
  commit(_userTypes["default"].SET_AUTHENTICATION_VALID, payload);
}), _defineProperty(_USER$SET_NAME$USER$S, _userTypes["default"].SET_DATA_OF_CURRENT_USER, function (_ref4, payload) {
  var commit = _ref4.commit,
      dispatch = _ref4.dispatch;
  commit(_userTypes["default"].SET_DATA_OF_CURRENT_USER, payload);
}), _defineProperty(_USER$SET_NAME$USER$S, _userTypes["default"].GET_CURRENT_USER_DATA_WITH_COOKIE, function (_ref5, payload) {
  var commit = _ref5.commit,
      dispatch = _ref5.dispatch;
  return _axios["default"].get('/api/me/listData').then(function (response) {
    var currentUser = response.data;
    console.log('ACTION :GET_CURRENT_USER_DATA_WITH_COOKIE 取得的資料', currentUser); // #2 在Store中更新使用者的驗證狀態和資料，
    // 如果API傳回的currentUser是 null 的話，action payload 就會是 false, 
    // 也就不會把狀態設定成已登入

    dispatch("".concat(_userTypes["default"].SET_IF_AUTHENTICATED), !currentUser ? false : true);
    dispatch("".concat(_userTypes["default"].SET_DATA_OF_CURRENT_USER), !currentUser ? null : currentUser); // #3 設定list data之前先檢查 localStorage有沒有  listData，
    // 有的話比對 API取得的 listData 跟 localStorage 的 listData資料 哪一個比較新

    var listDataFromLocalStorage = localStorage.getItem('listData');
    var listDataFromDB = currentUser.listData;
    var lastestListDataForStore;

    if (listDataFromLocalStorage && listDataFromDB) {
      // 將比較新的資料寫入Store
      if (listDataFromDB.updatedAt > listDataFromLocalStorage.updatedAt) lastestListDataForStore = listDataFromDB;
      lastestListDataForStore = listDataFromLocalStorage;
      dispatch("listData/".concat(_listDataTypes["default"].SET_LIST_DATA_FROM_LOCALSTORAGE), lastestListDataForStore, {
        root: true
      });
      return;
    } // 如果只有資料庫或是 localStorage其中之一有listData資料的話
    // 就將目前有的資料寫入 Store；都沒有的話就寫入 null


    dispatch("listData/".concat(_listDataTypes["default"].SET_LIST_DATA_FROM_LOCALSTORAGE), listDataFromLocalStorage || listDataFromDB || null, {
      root: true
    });
  })["catch"](function (error) {
    console.log('error:', error);
  });
}), _USER$SET_NAME$USER$S);

exports["default"] = _default;