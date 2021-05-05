"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userTypes = _interopRequireDefault(require("./userTypes"));

var _USER$SET_NAME$USER$I;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_USER$SET_NAME$USER$I = {}, _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].SET_NAME, function (state, payload) {
  state.userName = payload;
}), _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].IS_BEING_AUTHENTICATED, function (state, payload) {
  if (typeof payload !== "boolean") throw Error('Payload must be boolean');
  state.userIsAuthenticated = payload;
}), _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].SET_IF_AUTHENTICATED, function (state, payload) {
  state.userIsAuthenticated = payload;
}), _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].SET_AUTHENTICATION_VALID, function (state, payload) {
  state.userAuthIsValidUntil = payload;
}), _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].SET_ITEM_LISTS, function (state, payload) {
  state.userItemLists = payload;
}), _defineProperty(_USER$SET_NAME$USER$I, _userTypes["default"].SET_DATA_OF_CURRENT_USER, function (state, payload) {
  // 每當使用者登入或是透過Cookie向後端取得使用者資料的時候(payload !== null)
  // 就將登入時間寫入 localStorage，表示使用者曾經登入過，可以藉此向後端再請求資料取得list data
  if (payload !== null) localStorage.setItem('lastLoggedInTime', new Date().toISOString());
  state.userData = payload;
}), _USER$SET_NAME$USER$I);

exports["default"] = _default;