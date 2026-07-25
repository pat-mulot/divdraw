export default {
  namespaced: true,
  state: {
    msg_list: [],
  },

  actions: {
    set({ commit }, msg) {
      if (msg) {
        commit("SET_MSG_DATA", msg)
      }
    },
  },
  mutations: {
    SET_MSG_DATA(state, msgData) {
      if (msgData) {
        state.msg_list.push(msgData)
      }
    },
  },

  getters: {
    check(state) {
      if (state.msg_list.length > 0) {
        return true;
      }
      return false;
    },
    getList(state) {
      return state.msg_list;
    }
  },
}
