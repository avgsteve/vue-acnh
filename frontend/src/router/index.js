import {
  createRouter, createWebHistory
} from "vue-router";
import { Toast } from 'vant';
import axios from 'axios';

import { store } from './../../store/';
import mainPage from '../pages/mainPage.vue';
import LIST from './../../store/modules/listData/listDataTypes';
import USER from './../../store/modules/user/userTypes';

const basicRoutes = [
  {
    path: "/",
    name: "mainPage",
    component: mainPage,
    props: true,
  },
  {
    path: "/auth",
    name: "authPage",
    component: () =>
      import( /* webpackChunkName: "About" */
        "../pages/authPage/authPage.vue")
  },
  {
    path: "/user",
    name: "userPage",
    component: () =>
      import( /* webpackChunkName: "About" */
        "../pages/userPage/userPage.vue")
  },
  {
    path: "/search",
    name: "searchPage",
    component: () =>
      import(
        "../pages/searchPage/searchPage.vue")
  },
  {
    path: "/items",
    name: "itemsPage",
    component: () =>
      import(
        "../pages/itemsPage/itemsPage.vue")
  },
  {
    path: "/creatures",
    name: "creaturesPage",
    component: () =>
      import(
        "../pages/creaturesPage/creaturesPage.vue")
  },
  {
    path: "/recipes",
    name: "recipesPage",
    component: () =>
      import(
        "../pages/recipePage/recipesPage.vue")
  },
  {
    path: "/clothing",
    name: "clothingPage",
    component: () =>
      import(
        "../pages/clothingPage/clothingPage.vue")
  },
  {
    path: "/lists",
    name: "listsPage",
    component: () =>
      import(
        "../pages/listsPage/listsPage.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import( /* webpackChunkName: "About" */
        "../components/About.vue")
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes
});

router.beforeEach((to, from, next) => {

  // 離開頁面之前檢查:
  // #1.資料是否被更新過 #2. 使用者是否有登入過
  // 如果有更新過且有登入的話，接著 #3.詢問是否要上傳更新過的資料到資料庫

  const ifListsHasBeenUpdated = store.getters[
    `listData/${LIST.GET_FLAG_IF_DATA_IS_UPDATED}`
  ];
  const ifListsHasBeenUploaded = store.getters[
    `listData/${LIST.GET_FLAG_IF_DATA_IS_UPLOADED}`
  ];
  const ifUserIsAuthenticated = store.getters[
    `user/${USER.GET_IF_AUTHENTICATED}`];


  if (ifListsHasBeenUpdated      // 清單被更新過
    && !ifListsHasBeenUploaded   // 清單未被上傳到資料庫
    && ifUserIsAuthenticated     // 使用者已經登入
  ) {

    Toast.loading({
      message: '自動儲存清單中...',
    });


    const listDataFromLocalStorage = store.getters[
      `listData/${LIST.GET_CREATED_LISTS}`];

    axios.post(
      '/api/me/listData',
      { listData: JSON.stringify(listDataFromLocalStorage) })
      .then(response => {
        console.log('response: ', response);

        // 透過 SET_LIST_IS_UPLOADED_AND_NOT_UPDATED: 
        // 同時 SET_FLAG_IF_DATA_IS_UPDATED 設為 false 和把 SET_FLAG_IF_DATA_IS_UPLOADED 設為 true，表示已經把修改過的清單資料上傳到資料庫中
        store.dispatch(`listData/${LIST.SET_LIST_IS_UPLOADED_AND_NOT_UPDATED}`);

        setTimeout(() => {

          Toast.success({
            message: '清單已經保存到雲端資料庫!',
          });
        }, 300);
        return setTimeout(() => {
          next();
        }, 600);
      });

  }

  next();

});


export default router;

// ref: https://www.mdeditor.tw/pl/g6Ng/zh-tw