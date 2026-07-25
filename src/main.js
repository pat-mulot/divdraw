import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';

// init trads / i18n : 
import i18n from "@/locales/i18n.js";

import router from '@/router';

// fontawesome :
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

const app = createApp(App);
app.config.globalProperties.$getLocale = () => {
    return store.getters["language/locale"];
};
app
    .use(store)
    .use(router)
    .use(i18n)
    .directive("clickoutside", {
        mounted: (element, binding) => {
            element.clickOutsideEvent = (evt) => {
                if (!(element === evt.target || element.contains(evt.target))) {
                    binding.value(evt, element);
                }
            }
            document.body.addEventListener('click', element.clickOutsideEvent);
            document.body.addEventListener('touchstart', element.clickOutsideEvent);
            return true;
        },
        unmounted(element) {
            document.body.removeEventListener('click', element.clickOutsideEvent);
            document.body.removeEventListener('touchstart', element.clickOutsideEvent);
        }
    })
    .component("fa", FontAwesomeIcon)
    .mount('#app');

