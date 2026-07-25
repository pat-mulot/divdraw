export default {
  namespaced: true,
  state: {
    loading: false,
    requestsPending: 0,
  },
  actions: {
    show({ commit }) {
      commit("SET_SHOW");
    },
    hide({ commit }) {
      commit("SET_HIDE");
    },
    pending({ commit }) {
      commit("SET_PENDING");
    },
    done({ commit }) {
      commit("SET_DONE");
    },
  },
  mutations: {
    SET_SHOW(state) {
      state.loading = true;
    },
    SET_HIDE(state) {
        state.loading = false;
    },
    SET_PENDING(state) {
      if (state.requestsPending === 0) {
        this.commit("loader/SET_SHOW");
      }
      state.requestsPending++;
    },
    SET_DONE(state) {
      if (state.requestsPending >= 1) {
        state.requestsPending--;
      }

      if (state.requestsPending <= 0) {
        this.commit("loader/SET_HIDE");
      }
    }
  },
  getters: {
    check(state) {
      // console.log("getting loading state");
      // console.log(state.loading);
        return state.loading;
    },
  },
}
