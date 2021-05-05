import mutations from './listDataMutation';
import actions from './listDataActions';
import getters from './listDataGetters';

export default {
  namespaced: true,
  state() {
    return {
      selectedItem: {},
      listsTypes: ['collection', 'wishList'],
      selectedListType: "collection",
      itemTypes: ['item', 'recipe'],
      selectedItemType: "item",
      createdLists: {
        collection: [
          // {
          //   name: 'test-collection',
          //   items: [],
          //   createdAt: "2021-04-25T19:24:39.841Z"
          // },
          // {
          //   name: '測試collection',
          //   items: [],
          //   createdAt: "2021-04-25T19:24:39.841Z"
          // }
        ],
        wishList: [
          // {
          // name: 'test-wishList',
          // items: [],
          // createdAt: "2021-04-25T19:24:39.841Z"
          // }
        ],
        lastUpdated: ""
      },
      selectedList: "", //ex: 'collection.0'
      listsSortingOption: "",
      // 資料被修改後的 flag，用來提示資料是否被修改過，以及是否已經上傳到資料庫作為備份資料
      createdListsHasBeenUpdated: false,
      createdListsHasBeenUploaded: false,

    };
  },
  mutations,
  actions,
  getters
};
