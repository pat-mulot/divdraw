import { createRouter, createWebHashHistory } from "vue-router";
import config from '@/config';
import i18n from "@/locales/i18n.js";
import store from "@/store";
import storage from "@/plugins/storage";

const routes = [
  {
    path: "/",
    redirect: `/${i18n.global.locale.value}/`,
  },
  // {
  //   path: config.base,
  //   redirect: `${ config.base }${i18n.global.locale.value}`,
  // },
  {
    path: `/:lang/`,
    name: `home`,
    component: () => import("@/views/home/HomeView.vue"),
  },
  {
    path: `/:lang/creator`,
    name: `creator`,
    component: () => import(/* webpackChunkName: "creator" */"@/views/creator/CreatorView.vue"),
  },
]

const router = createRouter({
  mode: 'history',
  base: config.base,
  history: createWebHashHistory(config.base),
  routes
})

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = store.getters["language/locale"] ? store.getters["language/locale"] : storage.get("locale") ? storage.get("locale") : i18n.global.locale.value;
  }
  store.dispatch("language/set", language);
  // if (to.meta.middleware) {
  //   const middleware = Array.isArray(to.meta.middleware)
  //     ? to.meta.middleware
  //     : [to.meta.middleware];
  //   const context = {
  //     from,
  //     next,
  //     router,
  //     to,
  //   };
  //   const nextMiddleware = nextFactory(context, middleware, 1);
  //   return middleware[0]({ ...context, next: nextMiddleware });
  // }
  return next();
});

// function nextFactory(context, middleware, index) {
//   const subsequentMiddleware = middleware[index];
//   if (!subsequentMiddleware) return context.next;
//   return (...parameters) => {
//     context.next(...parameters);
//     const nextMiddleware = nextFactory(context, middleware, index + 1);
//     subsequentMiddleware({ ...context, next: nextMiddleware });
//   };
// }

export default router
