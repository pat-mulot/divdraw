<template>
  <div class="base_img_list hoverable">
    <div class="options-container">
      <div class="filter-menu">
        <div class="filter_type-btn">
          <baseSelect
            v-if="defaultFilter && filterOptionsList"
            :class="`action-btn divdraw`"
            :btnClass="'filter_type-selector-btn divdraw'"
            :text="`${ this.$t('reset_filter') }`"
            v-on:selected-option="setSelectedFilterOption"
            :multiple="true"
            :fromtest="'images list'"
          >
            <BaseSelectContent
              class="fix-center border"
            >
              <BaseSelectItem
                v-for="item in filterOptionsList"
                :key="item.value"
                :class="`action-btn text-on-icon divdraw`"
                :option="item"
              />
            </BaseSelectContent>
          </baseSelect>
          <div class="menu-dropdown-btn-corner"></div>
        </div>
      </div>
      <div v-if="search"
        class="search-menu"
      >
        <input
          type="text"
          :placeholder="`${ this.$t('reset_filter') }`"
          @input="handleSearchIcon"
        >
        <div class="search_icon-container">
          <div class="icon">
            <img :src="require(`@/assets/images/icons/search_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </div>
      </div>
    </div>
    <div class="base_img_list-container">
      <div class="page-switch-btn-container">
        <button
          v-if="showPaginationBtns"
          :class="`page-switch-btn previous${ this.currentPage === 1 ? ' disabled' : '' }`"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/chevron_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
      <BaseImgListWrapper
        v-if="getPaginatedList.length > 0"
        :imgsList="getPaginatedList"
        :currentPage="currentPage"
        :maxPerPage="getMaxPerPage"
        :perRow="getPerRow"
        :rowsNb="rowsNb"
        :perPage="perPage"
        :currentAnimationClass="currentAnimationClass"
      />
      <span v-else>:( Aucune résultat.</span>
      <div class="page-switch-btn-container">
        <button
          v-if="showPaginationBtns"
          :class="`page-switch-btn next${ this.currentPage === this.totalPages ? ' disabled' : '' }`"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/chevron_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
    </div>
    <div
      v-if="showPaginationBtns"
      class="base_img_list-footer"
    >
      <div class="page-btns-container">
        <button
          :class="`page-btn${ currentPage === 1 ? ' active' : '' }`"
          @click="handleClickOnPageBtn(1)"
        >
          <span>{{ 1 }}</span>
        </button>
        <span
          v-if="showSeparator.min"
          class="page-btn-separator"
        >...</span>
        <button
          v-for="page in getPageBtnsNumber" :key="page"
          :class="`page-btn${ currentPage === (page + 1) ? ' active' : '' }`"
          @click="handleClickOnPageBtn(page + 1)"
        >
          <span>{{ (page + 1) }}</span>
        </button>
        <span
          v-if="showSeparator.max"
          class="page-btn-separator"
        >...</span>
        <button
          :class="`page-btn${ currentPage === totalPages ? ' active' : '' }`"
          @click="handleClickOnPageBtn(totalPages)"
        >
          <span>{{ totalPages }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseImgListWrapper from "@/components/base-img-list/BaseImgListWrapper.vue";
import baseSelect from "@/components/form/selects/base-select/BaseSelect.vue";
import BaseSelectContent from "@/components/form/selects/base-select/BaseSelectContent.vue";
import BaseSelectItem from "@/components/form/selects/base-select/BaseSelectItem.vue";


export default {
  name: "BaseImgList",

  components: {
    BaseImgListWrapper,
    baseSelect,
    BaseSelectContent,
    BaseSelectItem,
  },

  props: {
    imgsList: Array,
    paginationRange: {type: Number, default: 5},
    rowsNb: {type: Number, default: 5},
    perPage: Number,
    perRow: Object,
    testest: String,
    search: Boolean,
    defaultFilter: String,
    filterOptionsList: Array,
  },

  data() {
    return {
      currentPage: 1,
      minPage: 1,
      maxPage: 0,
      pageNumbers: [],
      currentAnimationClass: "default",
      sortedImgsList: this.imgsList,
      selectedFilter: "",
    }
  },

  computed: {
                
    getFilterOptionValue() {
      if (this.filterOptionsList) {
        let optionValueToSet = this.defaultFilter;
        if (this.selectedFilter != "") {
          optionValueToSet = this.selectedFilter;
        }
        return this.filterOptionsList.find(option => option.value === optionValueToSet);
      }
      return [];
    },

    getPaginatedList() {
      return this.paginatedList();
    },

    getPerRow() {
      return {
        xs: (this.perRow?.xs ?? 3),
        sm: (this.perRow?.sm ?? 4),
        m: (this.perRow?.m ?? 5),
        l: (this.perRow?.l ?? 6),
        xl: (this.perRow?.xl ?? 7),
        xxl: (this.perRow?.xxl ?? 8),
      }
    },

    getPerPage() {
      if (this.perPage) {
        return this.perPage;
      }
      return (this.perRow * this.rowsNb);
    },

    showSeparator() {
      let showSeparatorMin = false, showSeparatorMax = false;
      if (this.minPage >= 2) {
        showSeparatorMin = true;
      } else {
        showSeparatorMin = false;
      }
      if (this.maxPage < this.totalPages - 1) {
        showSeparatorMax = true;
      } else {
        showSeparatorMax = false;
      }
      return {
        min: showSeparatorMin,
        max: showSeparatorMax,
      }
    },

    getPageBtnsNumber() {
      return this.pageNumbers;
    },

    totalImgsNumber() {
      return this.sortedImgsList.length;
    },

    totalPages() {
      return Math.ceil(this.sortedImgsList.length / this.getPerPage);
    },

    getList() {
      return this.sortedImgsList ?? [];
    },

    getMaxPerPage() {
      return this.sortedImgsList.length > this.getPerPage ? this.getPerPage : this.sortedImgsList.length;
    },

    showPaginationBtns() {
      return this.totalPages > 1;
    }
  },

  methods: {

    setSelectedFilterOption(filterOptions) {
      let allResults = [];
      for (let option of filterOptions) {
        if (!option.value) {
          allResults = this.imgsList;
          break;
        }
        allResults = [
          ...this.filterResultByName(option.value),
          ...allResults,
        ];
      }
      this.sortedImgsList = allResults;
      this.changePage(1);
    },

    handleSearchIcon(evt) {
      const searchString = evt.currentTarget.value;
      if (searchString && searchString != "") {
        this.sortedImgsList = this.filterResultByName(searchString);
      } else {
        this.sortedImgsList = this.imgsList;
      }
      this.changePage(1);
    },

    filterResultByName(filterName) {
      return this.imgsList.filter(item => item.fileName.includes(filterName));
    },

    handleClickOnPageBtn(pageNb) {
        this.currentAnimationClass = "default";
      this.changePage(pageNb);
    },

    changePage(pageNb) {
      this.currentPage = pageNb;
    },

    paginatedList() {
      const startIndex = (this.currentPage - 1) * this.getPerPage;
      const endIndex = startIndex + this.getPerPage;
      let listToReturn = [];
      if (this.sortedImgsList?.length > 0) {
        listToReturn = this.sortedImgsList.slice(startIndex, endIndex);
      }
      this.updatePageBtns();
      return listToReturn;
    },

    updatePageBtns() {
      this.pageNumbers = [];
      const
        halfRange = Math.ceil(this.paginationRange / 2),
        totalPageMin1 = this.totalPages - 1;
      this.minPage = 1;
      if (this.totalPages > this.paginationRange) {
        if (this.currentPage > halfRange) {
          this.minPage = this.currentPage - halfRange > 1 ? this.currentPage - halfRange : 1;
        }
      }
      this.maxPage = this.minPage + this.paginationRange > totalPageMin1 ? totalPageMin1 : this.minPage + this.paginationRange;
      if(this.minPage > this.maxPage - this.paginationRange) this.minPage = (this.maxPage - this.paginationRange) > 1 ? this.maxPage - this.paginationRange : 1;
      if (this.pageNumbers.length < this.paginationRange && this.maxPage > 1) {
        for (let pageNb = this.minPage; pageNb < this.maxPage; pageNb++) {
          this.pageNumbers.push(pageNb);
        }
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
        this.currentAnimationClass = "switch-right";
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1);
        this.currentAnimationClass = "switch-left";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.base_img_list {
  @include flex-center-col;
  width: 100%;

  .options-container {
    width: 100%;
    @include flex-center-col;

    @include screen-small {
      @include flex-center-row;
    }

    .filter-menu {
      @include flex-end-row;
      width: 100%;
      margin: 0.5rem var(--gap-1);
    
      @include screen-small {
        @include flex-start-row;
      }

      .filter_type-btn {

        .toogler-btn {
          width: 100%;
          min-width: 10rem;
          @include flex-between-row;
          height: var(--btn-size);

          .text-container {
            border: solid var(--border-sz-1) var(--bk-40);
            border-right: none;

            .text {
              border-right: solid var(--border-sz-1) var(--bk-40);
              
              &:first-child {
                border-right: none;
              }
            }
          }


          .toogler-btn-icon {
            border: solid var(--border-sz-1) var(--bk-30);
            box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
          }
        }
      }
    }

    .search-menu {
      @include flex-end-row;
      width: 100%;
      margin: 0.5rem var(--gap-1);

      @include screen-small {
        max-width: var(--screen-xs);
      }

      input {
        padding: var(--gap-1-4);
        height: var(--btn-size);
        background-color: transparent;
        border: none;
        border-bottom: solid var(--border-sz-2) var(--bk-50);
        width: 100%;
        @include screen-small {
          max-width: var(--screen-xs);
        }
      }

      .search_icon-container {
        height: var(--btn-size);
        width: var(--btn-size);
        padding: var(--gap-1-4);

        .icon {
          height: 100%;

          img {
            height: 100%;
            width: auto;
            object-fit: contain;
          }
        }

      }
    }
  }

  .page-switch-btn-container {
    display:flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 3;

    .page-switch-btn {
      @include flex-center-col;
      width: 2rem;
      height: 4rem;
      outline: none;
      border: none;
      border-color: transparent;
      background-color: transparent;
      padding: var(--gap-1-4);
      transition:
        border-color .2s ease,
        background-color .5s ease,
        transform .2s ease,
        box-shadow .2s ease;

      &.previous {
        border-top-left-radius: 4rem;
        border-bottom-left-radius: 4rem;
      }
      &.next {
        border-top-right-radius: 4rem;
        border-bottom-right-radius: 4rem;
      }
      .icon {
        max-height: 2rem;
      }

      img {
        height: 100%;
        width: 100%;
        transition: transform .2s ease;
      }

      &.active {
        font-weight: bold;
      }

      &:hover {
        background-color: transparent;
        box-shadow: 0 0 0.5rem var(--bk-30), 0 0 0.25rem var(--wt-50) inset;
        transform: scale(1.1);

        img {
          transition: transform .5s ease;
        }

        &.next {
          img {
            transform: scale(1.1) translateX(0.25rem);
            transition: transform .5s ease;
          }
        }

        &.previous {
          img {
            transform: scale(1.1) translateX(-0.25rem);
            transition: transform .5s ease;
          }
        }
      }

      &:active {
        background-color: var(--bk-30);
        transform: scale(0.9);
      }

      &.disabled {
        opacity: 0.5;
        cursor: initial;
        transform: scale(0.9);

        &:hover {
          border: none;
          box-shadow: none;
        }
      }
    }
  }

  .page-btn {
    position: relative;
    line-height: 0;
    @include flex-center-col;
    height: calc(var(--gap-1-1) * 1.5);
    width: calc(var(--gap-1-1) * 1.5);
    border-radius: 50%;
    outline: none;
    border: none;
    background-color: transparent;
    border-color: transparent;
    padding: var(--gap-1-4);
    transition:
      text-decoration .2s ease,
      background-color .2s ease,
      transform .2s ease,
      box-shadow .2s ease;

    img {
      height: 100%;
      width: 100%;
    }

    &.active {
      font-weight: bold;
      transform: scale(1.2);
    }

    &:hover {
      transform: scale(1.3);
      font-weight: bold;
    }

    &.disabled {
      background-color: var(--btn-bg-1-disabled);
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .base_img_list-header {
    @include flex-around-row;
    width: 100%;
  }

  .base_img_list-footer {
    @include flex-around-row;
    width: 100%;

    .page-btns-container {
      @include flex-center-row;
      margin: 0 var(--gap-1-2);
      width: 100%;

      .page-btn-separator {
        opacity: 0.7;
      }
    }
  }

  &.center {
    .base_img_list-wrapper {
      justify-content: center;
    }
  }

  &.start {
    .base_img_list-wrapper {
      justify-content: flex-start;
    }
  }

  &.end {
    .base_img_list-wrapper {
      justify-content: flex-end;
    }
  }

  &.between {
    .base_img_list-wrapper {
      justify-content: space-between;
    }
  }

  .base_img_list-container {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    width: 100%;
  }

  &.hoverable {

    .base_img_list-wrapper {

      .base_img_list-item {

        .image-container {
          
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          margin: 0 auto;
          background-color: var(--bk-05);
          box-shadow: 0 0 0.5rem var(--bk-50), 0 0 0.25rem var(--wt-50) inset;
          transform: scale(1);
          transition:
            .1s transform ease,
            .1s box-shadow ease
          ;

          img {
            transform: scale(1);
            transition: 0.5s transform ease;
          }
        }

        .image-container {

          &:hover {
            transform: scale(1.2);
            box-shadow: 0 0 0.75rem var(--bk-30), 0 0 0.5rem var(--wt-100) inset;

            img {
              transform: scale(1.05);
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
