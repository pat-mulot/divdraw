import { createI18n } from "vue-i18n";
import storage from "@/plugins/storage";

import fr from "@/locales/languages/fr.json";
import en from "@/locales/languages/en.json";

let defaultLocale = storage.get("locale") ?? process.env.VUE_APP_DEFAULT_LOCALE;

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages: {
        fr,
        en,
    }
});

export default i18n;