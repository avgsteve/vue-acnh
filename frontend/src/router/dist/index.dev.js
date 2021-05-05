"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _vant = require("vant");

var _axios = _interopRequireDefault(require("axios"));

var _store = require("./../../store/");

var _mainPage = _interopRequireDefault(require("../pages/mainPage.vue"));

var _listDataTypes = _interopRequireDefault(require("./../../store/modules/listData/listDataTypes"));

var _userTypes = _interopRequireDefault(require("./../../store/modules/user/userTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var basicRoutes = [{
  path: "/",
  name: "mainPage",
  component: _mainPage["default"],
  props: true
}, {
  path: "/auth",
  name: "authPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/authPage/authPage.vue"));
    });
  }
}, {
  path: "/user",
  name: "userPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/userPage/userPage.vue"));
    });
  }
}, {
  path: "/search",
  name: "searchPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/searchPage/searchPage.vue"));
    });
  }
}, {
  path: "/items",
  name: "itemsPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/itemsPage/itemsPage.vue"));
    });
  }
}, {
  path: "/creatures",
  name: "creaturesPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/creaturesPage/creaturesPage.vue"));
    });
  }
}, {
  path: "/recipes",
  name: "recipesPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/recipePage/recipesPage.vue"));
    });
  }
}, {
  path: "/clothing",
  name: "clothingPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/clothingPage/clothingPage.vue"));
    });
  }
}, {
  path: "/lists",
  name: "listsPage",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/listsPage/listsPage.vue"));
    });
  }
}, {
  path: "/about",
  name: "about",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/About.vue"));
    });
  }
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: basicRoutes
});
router.beforeEach(function (to, from, next) {
  // 離開頁面之前檢查:
  // #1.資料是否被更新過 #2. 使用者是否有登入過
  // 如果有更新過且有登入的話，接著 #3.詢問是否要上傳更新過的資料到資料庫
  var ifListsHasBeenUpdated = _store.store.getters["listData/".concat(_listDataTypes["default"].GET_FLAG_IF_DATA_IS_UPDATED)];

  var ifListsHasBeenUploaded = _store.store.getters["listData/".concat(_listDataTypes["default"].GET_FLAG_IF_DATA_IS_UPLOADED)];

  var ifUserIsAuthenticated = _store.store.getters["user/".concat(_userTypes["default"].GET_IF_AUTHENTICATED)];

  if (ifListsHasBeenUpdated // 清單被更新過
  && !ifListsHasBeenUploaded // 清單未被上傳到資料庫
  && ifUserIsAuthenticated // 使用者已經登入
  ) {
      _vant.Toast.loading({
        message: '自動儲存清單中...'
      });

      var listDataFromLocalStorage = _store.store.getters["listData/".concat(_listDataTypes["default"].GET_CREATED_LISTS)];

      _axios["default"].post('/api/me/listData', {
        listData: JSON.stringify(listDataFromLocalStorage)
      }).then(function (response) {
        console.log('response: ', response); // 透過 SET_LIST_IS_UPLOADED_AND_NOT_UPDATED: 
        // 同時 SET_FLAG_IF_DATA_IS_UPDATED 設為 false 和把 SET_FLAG_IF_DATA_IS_UPLOADED 設為 true，表示已經把修改過的清單資料上傳到資料庫中

        _store.store.dispatch("listData/".concat(_listDataTypes["default"].SET_LIST_IS_UPLOADED_AND_NOT_UPDATED));

        setTimeout(function () {
          _vant.Toast.success({
            message: '清單已經保存到雲端資料庫!'
          });
        }, 300);
        return setTimeout(function () {
          next();
        }, 600);
      });
    }

  next();
});
var _default = router; // ref: https://www.mdeditor.tw/pl/g6Ng/zh-tw

exports["default"] = _default;