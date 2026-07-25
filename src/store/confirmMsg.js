export default {
  namespaced: true,
  state: {
    msg: null,
    showClass: "",
  },

  actions: {
    set({ commit }, msg) {
      commit("SET_MSG_DATA", msg)
    },
    show({ commit }) {
      commit("SET_SHOW", " show")
    },
    hide({ commit }) {
      commit("SET_SHOW", "")
    },
  },
  mutations: {
    SET_MSG_DATA(state, msgData) {
      if (msgData?.message) {
        state.msg = msgData;
      } else {
        state.msg = null;
      }
    },
    SET_SHOW(state, showClass) {
      state.showClass = showClass;
    },
  },

  getters: {
    check(state) {
      if (state.msg) {
        state.showClass = " show";
        return true;
      }
      state.showClass = "";
      return false;
    },
    getMsg(state) {
      return state.msg;
    },
    getShowClass(state) {
      return state.showClass;
    }
  },
}
