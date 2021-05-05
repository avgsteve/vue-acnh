import mutations from './globalStateMutation';
import actions from './globalStateActions';
import getters from './globalStateGetters';

export default {
  namespaced: true,
  state() {
    return {
      navbarAtBottomIsShowing: true,
      listPopupIsShowing: false,
      dataForListPopup: {}

    };
  },
  mutations,
  actions,
  getters
};
