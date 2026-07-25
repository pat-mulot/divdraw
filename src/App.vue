<template :style="cssAdressBarHeight" class="dm">

  <MainHeader
    :darkModeEnabled="darkModeEnabled"
    v-on:dark-mode="setDarkMode"
    :fixed="headerFixed"
    :hide="hideHeader"
    ref="mainHeaderComponent"
  />
  <main :class="`page-container`">
    <router-view
      class="view"
      :isMobile="isMobile"
    />
  </main>
  <MainFooter />
  <BaseFlashMsgWrapper />
  <BaseFullscreenLoader :loading="loading" />
  <BaseConfirmFullscreenModal>
  </BaseConfirmFullscreenModal>
</template>

<script>
/* eslint-disable */

import i18n from "@/locales/i18n";
import MainHeader from "@/components/header/MainHeader.vue";
import MainFooter from "@/components/footer/MainFooter.vue";
import BaseFlashMsgWrapper from "@/components/flash-msg/BaseFlashMsgWrapper.vue";
import BaseConfirmFullscreenModal from "@/components/modals/BaseConfirmFullscreenModal.vue";
import storage from "@/plugins/storage.js";
import BaseFullscreenLoader from "@/components/loaders/BaseFullscreenLoader.vue";

export default {
  global: {
    plugins: [i18n],
  },
  components: {
    MainHeader,
    MainFooter,
    BaseFlashMsgWrapper,
    BaseFullscreenLoader,
    BaseConfirmFullscreenModal,
  },
  data() {
    return {
      headerFixed: true, // set false if needed
      darkModeEnabled: false,
      loading: false,
      previousScrollYPos: 0,
      hideHeader: false,
      viewHeight: 0,
      viewWidth: 0,
      isLandscapeView: false,
      //
      translatingElements: [],
      isMobile: false,
    };
  },

  created() {
    // console.log("TODO : ");
    // console.log("jules verne, da vinci, archimed");
    // console.log("- THE GREAT GUITARIST BOOK")
    // console.log("- Créer un bouton de redimension de group (comme photoshop où tu choisis la dimension et tu valide puis ça recalcule tout ensuite)")
    // console.log("- Réparer le bouton % / proportion")
    // console.log("- keypress bouton shift ?")
    // console.log("- bouton shift ?")
    // console.log("- ctrl + Z et historique (boutons de retour/rétablir)")
    // console.log("- historique")
    // console.log("- bouton figer")
    // console.log("- bouton lock pour figer la position")
    // console.log("- bouton show/hide sur chaque élém")
    // console.log("- bouton grouper")
    // console.log("- intégrer des background image dans les éléments")
    // console.log("- bordure selectionnable que d'un côté ou certains selectionnés mais pas tous")
    // console.log("- lignes ? et lignes courbes ou angulaires ? voir avoir point précédent")
    // console.log("- pouvoir utiliser les btn size que haut, que bas, que droite, que gauche et idem pour positions")
    // console.log("- exporter/importer")
    // console.log("- mirroir")
    // console.log("- forme trapeze")
    // console.log("- créer un bouton settings pour les performances")
    // console.log("- ....");
    this.checkDarkMode();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("orientationchange", this.handleOrientationChange);
    window.addEventListener("resize", this.handleResize);
  },
  
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("orientationchange", this.handleOrientationChange);
    window.removeEventListener("resize", this.handleResize);
  },

  mounted() {
    this.initViewSizes();
    this.hideOrShowHeaderOnScroll(0);
        // store.dispatch("confirmMsg/set", {
        //   class: "success",
        //   value: i18n.global.t("elements_save_cancel_success"),
        //   timed: true,
        // })
  },

  computed: {
    isDarkModeEnabled() {
      return this.darkModeEnabled;
    },
    
    cssAdressBarHeight() {
      return {
        "--view-height": this.viewHeight + "px",
        "--view-width": this.viewWidth + "px",
      };
    },
  },
  
  methods: {

    initViewSizes() {
      let maxHeight = Math.max(
        window.innerHeight || 0,
        window.outerHeight || 0
      );
      let minHeight = Math.min(
        window.innerHeight || 0,
        window.outerHeight || 0
      );
      if (maxHeight > minHeight) {
        this.viewHeight = minHeight;
      } else {
        this.viewHeight = maxHeight;
      }
      let maxWidth = Math.max(window.innerWidth || 0, window.outerWidth || 0);
      let minWidth = Math.min(window.innerWidth || 0, window.outerWidth || 0);
      if (maxWidth > minWidth) {
        this.viewWidth = minWidth;
      } else {
        this.viewWidth = maxWidth;
      }
      this.updateCssVars();
    },

    handleResize() {
      this.initViewSizes();
    },

    handleOrientationChange() {
      this.isLandscapeView = this.getLandscapeView();
      let height = this.viewHeight;
      let width = this.viewWidth;
      this.viewHeight = width;
      this.viewWidth = height;
      this.updateCssVars();
    },

    updateCssVars() {
      let headerHeight = document.querySelector("header.main_header")?.offsetHeight ?? 0;
      document.querySelector(":root").style = `
        --view-height: ${this.viewHeight}px;
        --view-width: ${this.viewWidth}px;
        --header-height: ${headerHeight}px;
      `;
      this.isMobile = this.viewWidth < 768;
    },

    getLandscapeView() {
      return window.screen.orientation.angle === 90;
    },

    setDarkMode(value) {
      let bodyElm = document.querySelector("body");
      if (value) {
        if (!bodyElm.classList.contains("dm")) {
          bodyElm.classList.add("dm");
        }
        storage.set("dark_mode", value);
        this.darkModeEnabled = value;
      } else {
        if (bodyElm.classList.contains("dm")) {
          bodyElm.classList.remove("dm");
        }
        if (storage.get("dark_mode")) {
          storage.unset("dark_mode");
        }
        this.darkModeEnabled = false;
      }
    },

    checkDarkMode() {
      let dm = storage.get("dark_mode");
      if (dm) {
        this.setDarkMode(true);
      }
    },

    handleScroll(evt) {
      evt.preventDefault();
      this.hideOrShowHeaderOnScroll(window.scrollY);
    },

    hideOrShowHeaderOnScroll(windowScrollY) {
      if (windowScrollY > this.previousScrollYPos) {
        this.hideHeader = true;
      } else {
        this.hideHeader = false;
      }
      this.previousScrollYPos = windowScrollY;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

html {
  background-color: black;
  box-sizing: border-box;
  cursor: url("@/assets/images/cursors/cursor.png"), auto;

  body {
    background-color: var(--main-bg-color);
    transition: background-color 0.5s ease;

    h1 {
      color: var(--color-dark-1);
      font-weight: bold;
    }
    h2,
    h3 {
      color: var(--color-dark-2);
      font-weight: bold;
    }

    #app {
      min-height: var(--view-height);
      max-width: 100vw;
      overflow: hidden;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: var(--base-color-1);
      @include flex-between-col;

      // .main-background {
      //   display: flex;
      //   height: 100%;
      //   width: 100%;
      //   // background-image: url('@/assets/image.svg');
      //   background-image: var(--maing-bg-img-src);
      //   background-color: var(--bk-100);
      //   background-position: center;
      //   background-repeat: no-repeat;
      //   background-size: cover;
      //   position: fixed;
      //   top: 0;
      //   left: 0;
      //   opacity: 0.5;
      // }

      main.page-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
        position: relative;

        .view {
          margin-top: var(--header-height);
          @include display-page-anim;
        }
      }
    }
  }
}

.loader-icon {
  display: flex;
  animation: 5s loader-anim linear infinite;
  font-size: 2rem;
  @keyframes loader-anim {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.translate-y {
  transform: translateY(0);
  opacity: 1;
  transition: var(--anim-duration-4) transform ease,
    var(--anim-duration-4) opacity ease;
  &.down {
    transform: translateY(100%);
    opacity: 0;
  }
  &.up {
    transform: translateY(-100%);
    opacity: 0;
  }
}
* {
  text-shadow: 1px 1px 1px var(--wt-10), 1px -1px 1px var(--wt-10),
    -1px -1px 1px var(--wt-10), -1px 1px 1px var(--wt-10);
}

li.dropdown-item.divdraw img,
.dropdown-wrapper .toogler-btn.divdraw .img-container img,
.icon img.img-icon.divdraw  {
  opacity: 0.7;
}

.dm {
  .icon img.img-icon.divdraw ,
  li.dropdown-item.divdraw img,
  img.divdraw,
  .dropdown-wrapper .toogler-btn.divdraw .img-container img {
    filter: invert(100);
  }
}

</style>
