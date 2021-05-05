import axios from 'axios';
import ITEMS from './itemsDataTypes';
import LANGUAGE from './../languageSetting/languageSettingTypes';

export default {

  async [ITEMS.FETCH_TRANSLATED_ITEM_DATA]({ commit, dispatch }) {
    return axios.get(
      '/api/ac/items/translation-data',
      // 'http://localhost:3003/api/items',
      {
        headers: {
          'Test-Head': 'Vue.js'
        }
      }
    ).then(response => {
      const data = response.data;

      dispatch(`languageSetting/${LANGUAGE.SET_TRANSLATION_DATA}`, data, { root: true });

      // console.log('header: ', response.headers);
      commit(ITEMS.SET_FETCHED_ITEM_DATA, data);
      commit(ITEMS.SET_ITEMS_FOR_QUERY, data);

    });
  },
  // 透過現有的資料，篩選出所有資料的"種類"做為顯示選單的資料
  [ITEMS.SET_ITEM_CATEGORIES]({ commit, state }) {

    // console.log('執行 action: SET_ITEM_CATEGORIES ');

    const data = state.itemsDataWithTranslation;
    let setForCategory = new Set();
    let setForNameOfSources = new Set();

    for (let i = 0; i < data.length; i++) {

      if (setForCategory.has(data[i].category)) {
        continue;
      }

      if (data[i].category === 'patterns') continue;
      if (data[i].category === 'villagers') continue;

      setForCategory.add(data[i].category);
    }

    // 找出 source 的重複
    // for (let i = 0; i < data.length; i++) {
    //   let source = data[i].source[0];
    //   if (setForNameOfSources.has(source)) {
    //     continue;
    //   }
    //   setForNameOfSources.add(source);
    // }

    let options = Array.from(setForCategory);
    let source = Array.from(setForNameOfSources);
    let sourceObj = {};
    for (let index = 0; index < source.length; index++) {
      sourceObj[source[index]] = source[index];
    }


    options.unshift('all');
    // console.log('找出的source', source);
    // console.log('找出的source obj', sourceObj);

    commit(ITEMS.SET_ITEM_CATEGORIES, options);
  },
  // 在使用者按下分類選單選擇的分類之後，設定store的選單設定，且同時篩選出相對應的分類資料
  [ITEMS.SET_SELECTED_CATEGORY]({ commit, state, dispatch }, payload) {
    // ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
    // console.log('執行 action: SET_SELECTED_CATEGORY, payload: ', payload);

    if (payload === 'all') {
      commit(ITEMS.SET_SELECTED_CATEGORY, null); // 表示不使用filter
    } else {
      commit(ITEMS.SET_SELECTED_CATEGORY, payload);
    }

    dispatch(`${ITEMS.RECALCULATE_ITEMS_FOR_QUERY}`, 'Search Category option Updated');
  },
  [ITEMS.SET_SELECTED_SORTING_OPTION]({ commit, state, dispatch }, payload) {
    // ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
    // console.log('執行 action: SET_SELECTED_SORTING_OPTION, payload: ', payload);


    if (payload === 'noSort') {
      commit(ITEMS.SET_SELECTED_SORTING_OPTION, null);
      // 表示不使用filter
    } else {
      commit(ITEMS.SET_SELECTED_SORTING_OPTION, payload);
    }
    dispatch(`${ITEMS.RECALCULATE_ITEMS_FOR_QUERY}`, 'Search Sorting option Updated');

  },
  [ITEMS.SET_QUERY_KEYWORD]({ commit, state, dispatch }, payload) {
    // ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions
    // console.log('執行 action: SET_QUERY_KEYWORD, payload: ', payload);

    // 更新 keyword
    commit(ITEMS.SET_QUERY_KEYWORD, payload);
    // 更新篩選的資料
    dispatch(`${ITEMS.RECALCULATE_ITEMS_FOR_QUERY}`, 'Search Keyword Updated');

  },
  [ITEMS.RECALCULATE_ITEMS_FOR_QUERY]({ commit, state }, payload) {
    // ref: https://vuex.vuejs.org/guide/actions.html#dispatching-actions

    // console.log('(action) dispatch "RECALCULATE_ITEMS_FOR_QUERY"');
    // console.log('state:', state);
    const categoryFilter = state.selectedCategory;
    const sortingFilter = state.selectedSortingOption;
    const itemQueryKeywords = Array.from(state.itemQueryKeywords);

    // console.log('RECALCULATE_ITEMS_FOR_QUERY 裡面的 categoryFilter: ', categoryFilter);
    // console.log('(action) RECALCULATE_ITEMS_FOR_QUERY 裡面的 sortingFilter: ', sortingFilter);
    // console.log('RECALCULATE_ITEMS_FOR_QUERY 裡面的 itemQueryKeywords: ', itemQueryKeywords);

    // 每次排序/搜尋的時候要拿原始資料&目前已有篩選條件，重新篩選過一次，
    // 而不是拿已經被篩選過的資料再篩選，否則會造成切換篩選條件的時候資料被重複套用篩選條件，造成資料越來越少的問題

    let originalData = state.itemsDataWithTranslation;
    let itemsDataToFilter = Array.from(state.itemsDataWithTranslation);

    // 1) 依照類別篩選
    if (categoryFilter)
      itemsDataToFilter = originalData.filter(e => {
        return e.category === categoryFilter;
      });


    // 2) 透過N組關鍵字去篩選N次資料，每一次篩選都會將上一次篩選後的資料範圍再縮小
    // console.log('要搜尋的keywords: ', itemQueryKeywords);
    if (itemQueryKeywords.length > 0) {
      for (let i = 0; i < itemQueryKeywords.length; i++) {

        if (itemsDataToFilter.length === 0) {
          console.log('被多次篩選後的資料，已經無內容可再進行關鍵字搜尋');
          return;
        }
        let keyword = itemQueryKeywords[i];
        itemsDataToFilter = itemsDataToFilter.filter(item => {
          if (
            item.nameEn.includes(keyword) ||
            item.nameTw.includes(keyword) ||
            item.nameCn.includes(keyword))
            return item;
        });
      }
    }

    // 3) 如果有設定排序條件的話就對篩選過的資料進行排序
    if (sortingFilter) {

      console.log('開始排序, sortingFilter:', sortingFilter);
      if (sortingFilter === "alphabetically")
        itemsDataToFilter.sort((a, b) => {
          if (a.nameEn < b.nameEn) return -1;
          if (a.nameEn > b.nameEn) return 1;
        });

      if (sortingFilter === "byStrokeAscend")
        itemsDataToFilter.sort((a, b) => {
          let nameA = a.nameTw.toString();
          let nameB = b.nameTw.toString();
          // console.log({ nameA, nameB });
          let result = nameA.localeCompare(nameB, "zh-hant");
          // console.log('localeCompare的結果: ', result);
          return result;
        });


      if (sortingFilter === "byBuyingPriceAscend")
        itemsDataToFilter.sort((a, b) => {
          // a.price.buy = 0;
          if (a.price.buy < b.price.buy) return -1;
          if (a.price.buy > b.price.buy) return 1;
        });


      if (sortingFilter === "byBuyingPriceDescend")
        itemsDataToFilter.sort((a, b) => {
          // a.price.buy = 0;
          if (a.price.buy < b.price.buy) return 1;
          if (a.price.buy > b.price.buy) return -1;
        });

      if (sortingFilter === "bySellingPriceAscend")
        itemsDataToFilter.sort((a, b) => {
          // if (a.price.sell === -1)
          //   a.price.sell = 0;
          if (a.price.sell < b.price.sell) return -1;
          if (a.price.sell > b.price.sell) return 1;
        });


      if (sortingFilter === "bySellingPriceDescend")
        itemsDataToFilter.sort((a, b) => {
          // if (a.price.sell === -1)
          //   a.price.sell = 0;
          if (a.price.sell < b.price.sell) return 1;
          if (a.price.sell > b.price.sell) return -1;
        });

    }

    // console.log('(action:)篩選後的資料數量:', itemsDataToFilter.length);
    commit(ITEMS.SET_ITEMS_FOR_QUERY, itemsDataToFilter);
  },

  [ITEMS.SET_ITEM_DETAILS_CATEGORIES]({ commit, state }) {
    // console.log('執行action: SET_ITEM_DETAILS_CATEGORIES');

    return axios.get(
      '/api/ac/items/detailed-data/categories',
      // 'http://localhost:3003/api/items',
      {
        headers: {
          'Test-Head': 'Vue.js: fetch categories of all data'
        }
      }
    ).then(response => {
      const data = response.data;

      // localStorage.setItem('allItemsDetailDataInStorage', JSON.stringify(data));

      commit(ITEMS.SET_ITEM_DETAILS_CATEGORIES, data.sourceSheet);

      // console.log('已經處理完成 all data categories ', data.sourceSheet);
    });
  },

  // 3) 設定/取得查詢結果的資料
  [ITEMS.SET_CURRENT_ITEM_CATEGORY]({ commit, state }, payload) {

    commit(ITEMS.SET_CURRENT_TAGS, payload);
  },

  // 4) 設定/取得查詢結果的資料
  [ITEMS.SET_CURRENT_TAGS]({ commit, state }, payload) {
    commit(ITEMS.SET_CURRENT_TAGS, payload);
  },

  // 5) 篩選要顯示的資料
  [ITEMS.SET_FILTERED_ITEMS]({ commit, state }, payload) {

    commit(ITEMS.SET_FILTERED_ITEMS, payload);
  },
};

