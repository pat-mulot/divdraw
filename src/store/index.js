import { createStore } from "vuex";
import flashMsg from "@/store/flashMsg";
import confirmMsg from "@/store/confirmMsg";
import loader from "@/store/loader";
import language from "@/store/language";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    flashMsg,
    confirmMsg,
    loader,
    language,
  }
})
