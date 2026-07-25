<template>
  <div class="home">

    <!-- <section class="welcome_section-container">

      <div class="elements-container">
        
      </div>

    </section> -->


    <!-- <section class="imgs_list-container">
      <article class="imgs_list-card">
        <div class="imgs_list-card-header">
          <div class="imgs_list-card-title-container">
            <h3>{{ $t("title_images_list") }}</h3>
          </div>
        </div>
        <BaseImgList
          :imgsList="getImagesList"
          :perPage="1"
          :perRow="{
            xs: 1,
            sm: 1,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 1,
          }"
          :rowsNb="1"
          class="images_list center"
        />
      </article>
    </section> -->

    <section class="imgs_list-container">
      <article class="imgs_list-card">
        <div class="imgs_list-card-header">
          <div class="imgs_list-card-title-container">
            <h3>{{ $t("title_images_list") }}</h3>
          </div>
        </div>
        <BaseImgList
          :imgsList="getImagesList"
          :perPage="1"
          :perRow="{
            xs: 1,
            sm: 1,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 1,
          }"
          :rowsNb="1"
          class="images_list center"
        />
      </article>
      <article class="imgs_list-card">
        <div class="imgs_list-card-header">
          <div class="imgs_list-card-title-container">
            <h3>{{ $t("title_icons_list") }}</h3>
          </div>
        </div>
        <BaseImgList
          :imgsList="getAllIconsList"
          :paginationRange="3"
          :perPage="20"
          :perRow="{
            xs: 3,
            sm: 4,
            m: 5,
            l: 6,
            xl: 7,
            xxl: 8,
          }"
          :rowsNb="4"
          :search="true"
          :defaultFilter="'reset'"
          :filterOptionsList="filterOptionsList"
          class="icons_list center"
        />
      </article>
      <article class="imgs_list-card">
        <div class="imgs_list-card-header">
          <div class="imgs_list-card-title-container">
            <h3>{{ $t("title_cursors_list") }}</h3>
          </div>
        </div>
        <BaseImgList
          :imgsList="getCursorsList"
          :perPage="9"
          :perRow="{
            xs: 3,
            sm: 4,
            m: 5,
            l: 6,
            xl: 7,
            xxl: 8,
          }"
          :search="true"
          class="cursors_list"
        />
      </article>
    </section>

    <button class="go_draw-btn-container">
      <router-link :to="{ path: `/${ this.$getLocale() ?? 'fr' }/creator` }" class="go_draw-btn">
        <div class="anim-items-container">
          <div class="arrow-container">
            <!-- <div class="arrow-base"></div>
            <div class="arrow-head"></div> -->
          </div>
          <div class="btn-bg"></div>
        </div>
        <div class="btn-text">
          <!-- Go Draw! -->
          <span class="g-letter">G</span>
          <span class="o-letter">o</span>
          <span class="separator"> </span>
          <span class="d-letter">D</span>
          <span class="r-letter">r</span>
          <span class="a-letter">a</span>
          <span class="w-letter">w</span>
          <span class="separator"> </span>
          <span class="i-letter">!</span>
        </div>
      </router-link>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseImgList from "@/components/base-img-list/BaseImgList.vue";

export default {
  name: "HomeView",
  
  components: {
    BaseImgList,
  },

  data() {
    return {
      imagesBaseDirectory : "@/assets/images",
      imagesList: [],
      currentPage: 1,
      pageSize: 3,
      defaultFilter: "reset",
      filterOptionsList: [
        {
          name : "--",
          text : "--",
          value : null,
        },
        {
          value: "shape",
          text: this.$t('shapes_filter'),
          name: "shape",
        },
        {
          value: "border",
          text: this.$t('borders_filter'),
          name: "border",
        },
        {
          value: "letter",
          text: this.$t('letters_filter'),
          name: "letters",
        },
      ],
    }
  },

  mounted() {
    console.log(
      "- créer un bouton 'go draw' au milieu de la 'vitrine' qui change de pos pour devenir fixed",
      "- créer une animation pour la vitrine",
      "- améliorer le front des titres de la home",
      "- gérer le bouton du burger ou le supprimer",
      "- ajouter un bouton fullscreen mode ?",
      "- idée de paysage ?",
      "- jurassic park ?",
      "- ghost busters ?",
    )
  },

  computed: {

    totalPages() {
      return Math.ceil(this.getIconsBordersList.length / this.pageSize);
    },

    getIconsList() {
      const imageFiles = require.context("@/assets/images/icons", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },

    getIconsShapesList() {
      const imageFiles = require.context("@/assets/images/icons/shapes", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },

    getIconsBordersList() {
      const imageFiles = require.context("@/assets/images/icons/borders", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },
    
    getCursorsList() {
      const imageFiles = require.context("@/assets/images/cursors", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },
    
    getLettersList() {
      const imageFiles = require.context("@/assets/images/letters", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },

    getImagesList() {
      const imageFiles = require.context("@/assets/images", false, /\.png$/);
      return this.getImagesSrcList(imageFiles);
    },

    getAllIconsList() {
      return [
        ...this.getIconsList,
        ...this.getIconsShapesList,
        ...this.getLettersList,
        ...this.getIconsBordersList
      ];
    },
  },

  methods: {

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    getImagesSrcList(imageFiles) {
      const imagesData = [];
      imageFiles.keys().forEach(key => {
        const fileName = key.replace(/^.*[\\/]/, '');
        const imageData = imageFiles(key);
        imagesData.push({ fileName, imageData });
      });
      return imagesData;

    },
  },
};
</script>

<style lang="scss" >
@import "@/assets/scss/main.scss";

* {
  color: var(--bk-70);
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.go_draw-btn-container {
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;;

  .go_draw-btn {
    height: 2.5rem;
    width: 5rem;
    position: relative;
    @include flex-center-row;

    .btn-text {
      font-weight: bold;
      position: relative;
      height: 100%;
      width: 100%;
      @include flex-center-row;
      box-shadow: 0 0 2rem var(--wt-50), 0 0 0.25rem var(--bk-50) inset;
      border: solid 1px transparent;
      background-color: transparent;
      transition:
        .2s background-color ease,
        .2s box-shadow ease,
        .2s border ease;

      &:hover {
        background-color: var(--wt-70);
        border: solid 1px var(--bk-30);
        box-shadow: 0 0 2rem var(--bk-30), 0 0 0.5rem var(--wt-70) inset;
      }

      * {
        color: var(--bk-70);
      }

      .g-letter,
      .o-letter,
      .d-letter,
      .r-letter,
      .a-letter,
      .w-letter,
      .i-letter {
        display: flex;
        transition: font-size .2s ease;
        transform: translate(0,0) scale(1);

        // &:hover {
        //   font-size: 1.5rem;
        //   animation: 0.5s letter-anim-2 0s ease forwards;
        // }
      }

      .separator {
        width: 0.125rem;
      }

      .g-letter {
        animation: 5s letter-anim-1 0s ease infinite;
        transform: translate(0,0) scale(1);
      }

      .d-letter {
        animation: 5s letter-anim-1 .15s ease infinite;
      }

      .i-letter {
        animation: 5s letter-anim-1 .3s ease infinite;
      }
    }

    transition: transform .2s ease;

    &:hover {
      transform: scale(1.3,1.1);

      .g-letter {
        animation: .5s letter-anim-2 0s ease forwards;
      }

      .d-letter {
        animation: .5s letter-anim-2 .15s ease forwards;
      }

      .i-letter {
        animation: .5s letter-anim-2 .3s ease forwards;
      }
    }

    @keyframes letter-anim-2 {
      0% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
      }
      10% {
        transform: translate(15%,-15%) scale(1.25);
        font-size: 1.25em;
      }
      20% {
        transform: translate(0,0) scale(1.15);
      }
      30% {
        transform: translate(-15%,-15%) scale(1.2);
      }
      40% {
        transform: translate(0,0) scale(0.9);
      }
      50% {
        transform: translate(-15%,15%) scale(1.15);
        font-size: 1.25em;
      }
      60% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
      }
      100% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
      }
    }

    @keyframes letter-anim-1 {
      0% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
      }
      1% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
        font-size: 0.5em;
      }
      2% {
        transform: translate(15%,-15%);
        font-size: 1.25em;
      }
      3% {
        transform: translate(0,0);
        // font-size: 1em;
      }
      4% {
        transform: translate(-15%,-15%);
        // font-size: 1.25em;
      }
      5% {
        transform: translate(0,0);
        // font-size: 0.9em;
        // font-size: 0.5em;
      }
      6% {
        transform: translate(-15%,15%);
        font-size: 1.25em;
      }
      7% {
        transform: translate(0,0) scale(1);
        font-size: 1em;
      }
      100% {
        transform: translate(0,0) scale(1);
      }
    }

    .anim-items-container {
      @include flex-center-row;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      overflow: hidden;
      height: 2.5rem;
      width: 5rem;
    }

    @keyframes btn-arrow-container-anim {
      0% {
        transform: translate(-50%,-50%);
      }
      25% {
        transform: translate(-50%,-50%);
      }
      50% {
        transform: translate(-50%,-50%);
      }
      75% {
        transform: translate(100%,-50%);
      }
      100% {
        transform: translate(-50%,-50%);
      }
    }

    .btn-bg {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
    }
  }
}

@keyframes btn-bg-anim {
  0% {
    transform: scale(1, 1);
  }
  15% {
  }
  25% {
    transform: scale(1.6, 1.3);
  }
  50% {
    transform: scale(0.8, 0.9);
  }
  70% {
    transform: scale(1.5, 1.25);
  }
  80% {
    transform: scale(0.9, 0.95);
  }
  100% {
    transform: scale(1.4, 1.2);
  }
}

.home {
  padding-bottom: 3rem;

  .welcome_section-container {
    height: calc(var(--view-height) - var(--header-height));
    width: 100%;
    @include flex-center-col;
    display: none;

    .elements-container {
      height: calc(100% - 2rem);
      width: calc(100% - 2rem);
      position: relative;
      border: solid 1px var(--bk-20);

    }
  }

  .imgs_list-container {
    width: 100%;
    margin: auto;

    @include screen-x-small {
      width: calc(100% - 1rem);
    }

    @include screen-small {
      width: calc(100% - 2rem);
    }

    @include screen-medium {
      width: calc(100% - 4rem);
    }

    @include screen-large {
      width: calc(100% - 8rem);
      max-width: var(--screen-l);
    }

    @include screen-x-large {
      max-width: var(--screen-l);
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/main.scss";

.imgs_list-container {

  .imgs_list-card {
    margin-bottom: 4rem;
    padding: 2rem 0;

    .imgs_list-card-header {

      .imgs_list-card-title-container {
        padding: 1rem;

        h3 {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
        }
      }
    }
          
    .icons_list {
      .base_img_list-wrapper {
        .base_img_list-item-container {
          .base_img_list-item {
            img {
              height: 3rem;
              width: 3rem;
            }
          }

          .cursors_list {
            img {
              height: 1.5rem;
              width: 1.5rem;
            }
          }
        }
      }
    }
    .cursors_list {
      .base_img_list-wrapper {
        .base_img_list-item-container {
          .base_img_list-item {
            img {
              height: 2rem;
              width: 2rem;
              max-height: 32px;
              max-width: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
