import i18n from "@/locales/i18n";
import storage from "@/plugins/storage";

export default {
    namespaced: true,
    state: {
        locale: null,
        flag_src: null,
    },
    actions: {
        set({ commit }, locale = process.env.VUE_APP_DEFAULT_LOCALE) {
            commit("SET_LOCALE", locale);
        },
    },
    mutations: {
        SET_LOCALE(state, locale) {
            if (locale) {
                storage.set("locale", locale);
                i18n.global.locale.value = locale;
                state.locale = locale;
                state.flag_src = require(`@/assets/images/country-flags/${locale}.svg`);
            }
        },
    },
    getters: {
        locale(state) {
            return state.locale;
        },
        flag(state) {
            return state.flag_src;
        },
    },
}
