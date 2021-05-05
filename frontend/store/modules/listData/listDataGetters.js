import LIST from './listDataTypes';


export default {

  [LIST.GET_SELECTED_ITEM_DATA](state) {
    return state.selectedItem;
  },


  [LIST.GET_SELECTED_LIST_TYPE](state) {
    return state.selectedListType;
  },
  [LIST.GET_SELECTED_ITEM_TYPE](state) {
    return state.selectedItemType;
  },


  [LIST.GET_CREATED_LISTS](state) {
    return state.createdLists;
  },
  [LIST.GET_SELECTED_LIST](state) {
    return state.selectedList;
  },

  [LIST.GET_LISTS_OF_SELECTED_LIST_TYPE](state) {
    const createdLists = state.createdLists;
    const currentListType = state.selectedListType;
    const listsOfSelectedType = createdLists[currentListType];
    return listsOfSelectedType;
  },

  [LIST.GET_DATA_OF_SELECTED_LIST](state) {
    const createdLists = state.createdLists;
    const currentListType = state.selectedListType;
    const listsOfSelectedType = createdLists[currentListType];

    if (listsOfSelectedType.length === 0) {
      listsOfSelectedType.push({
        name: 'default list',
        createdAt: new Date().toISOString,
        items: []
      });
    }

    let currentIndex = state.selectedList.split('.')[1] || 0;
    if (!listsOfSelectedType[currentIndex])
      currentIndex = 0;
    // 因為切換不同type列表的時候index可能會不一樣，
    // 如果同樣的index找不到列表的話就要從第一個開始
    const data = listsOfSelectedType[currentIndex].items;

    // console.log('GET_DATA_OF_SELECTED_LIST: ', data);
    return data;
  },



  [LIST.GET_SELECTED_LIST_OBJECT](state) {
    const createdLists = state.createdLists;
    const currentListType = state.selectedListType;
    const listsOfSelectedType = createdLists[currentListType];
    // console.log('state.selectedList: ', state.selectedList);

    let currentIndex = state.selectedList.split('.')[1] || 0;
    if (!listsOfSelectedType[currentIndex])
      currentIndex = 0;
    // 因為切換不同type列表的時候index可能會不一樣，
    // 如果同樣的index找不到列表的話就要從第一個開始
    const data = listsOfSelectedType[currentIndex];

    // console.log('GET_DATA_OF_SELECTED_LIST: ', data);
    return data;
  },

  [LIST.GET_LISTS_SORTING_OPTION](state) {
    return state.listsSortingOption;
  },

  [LIST.GET_FLAG_IF_DATA_IS_UPDATED](state) {
    return state.createdListsHasBeenUpdated;
  },

  [LIST.GET_FLAG_IF_DATA_IS_UPLOADED](state) {
    return state.createdListsHasBeenUploaded;
  },

};