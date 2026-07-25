<template>
  <div id="creator" ref="creator_view">
    <div class="tmp-container" style="visibility: hidden">
      <div style="position: absolute; z-index: -1">
        <div id="source"></div>
      </div>
    </div>
    <!-- ---------- TOP MENU ---------- -->
    <div class="top-menus-wrapper">
      <div class="top-menus-wrap">
        <ScalingMenu
          :scale="scaleValue"
          v-on:set-scale="setScaleValue"
        />
      </div>
      <GeneralMenu
        ref="general_menu"
        :itemsNb="elementsListArr.length"
        :itemsLimit="itemsLimit"
        v-on:get-img="getImg"
        v-on:aspect-ratio="setAspectRatio"
        v-on:enable-grid="setGridEnabled"
        v-on:selected-cursor="setSelectedCursor"
        v-on:save-elements="saveElement"
        v-on:enable-magnet="setMagnetEnable"
        :saved="datasSaved"
        :containerSize="containerSize"
        :currentCursor="selectedCursor"
        :gridInterval="magnetRange"
        v-on:set-grid-interval="setGridInterval"
        v-on:add-element="addElement"
        v-on:remove-element="handleClickOnDeleteElement"
        v-on:remove-all-element="handleClickOnDeleteAllElements"
        v-on:copy-element="copyElement"
        v-on:set-hidden-grid-values="setHiddenGridValues"
        v-on:histRedo="histRedo"
        v-on:histUndo="histUndo"
        :historyDatas="historyDatas"
        :isMobile="isMobile"
        :currentSelectedItem="getCurrentElement"
        v-on:render-file-menu="handleClickOnRender"
        v-on:export-file-menu="handleClickOnExport"
        v-on:load-file-menu="loadAs"

      />
    </div>
    <!-- ---------- FRAME CONTAINER ---------- -->
    <div class="frame-wrapper">
      <!-- ---------- LEFT MENU ---------- -->
      <div
        v-if="loaded"
        class="tools-list-container"
      >
        <button
          :class="`
            show-btn
            ${this.oppenedMenu === 'DocumentMenu' ? ' active' : ''}
          `"
          @click.prevent="handleClickOnShowHideLeftMenu('DocumentMenu')"
          @touchstart.prevent="handleClickOnShowHideLeftMenu('DocumentMenu')"
        >
        <!-- ------------- DOCUMENT MENU ------------- -->
          <div class="icon">
            <img :src="require(`@/assets/images/icons/file_picture_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
        <DocumentMenu
          ref="DocumentMenu"
          :containerSize="containerSize"
          :frameBgColor="frameBgColor"
          :frameOpacity ="frameOpacity"
          :colorsList="colorsList"
          v-on:document-size="updateDocumentSize"
          :exportSizeCoef="exportSizeCoef"
          v-on:set-frame-bg-color="setFrameBgColor"
          v-on:set-frame-opacity="setFrameOpacity"
          :oppenedMenu="oppenedMenu"
          v-on:close-side-menus="setOppenedMenu"
          :maintainRatio="maintainExportSizeRatio"
          v-on:export-size="updateExportSize"
          v-on:menu-input-focus="handleMenuInputFocus"
          v-on:set-export-aspect-ratio="setExportAspectRatio"
        />
        <!-- ------------- COLOR & BORDERS MENU ------------- -->
        <button
          :class="`
            show-btn
            ${
              (
                this.isElementMenuBtnDisabled
                || getCurrentElement.merged
                || getCurrentElement.isImg
              ) ? ' disabled' : this.oppenedMenu === 'BorderElementsMenu' ? ' active' : ''}
          `"
          :disabled="
            isElementMenuBtnDisabled
            || getCurrentElement.merged
            || getCurrentElement.isImg
          "
          @click.prevent="handleClickOnShowHideLeftMenu('BorderElementsMenu')"
          @touchstart.prevent="handleClickOnShowHideLeftMenu('BorderElementsMenu')"
        >
          <div class="icon">
            <img class="img-icon divdraw"
              :src="require(`@/assets/images/icons/borders/border_icon.png`) ?? ''"
            />
          </div>
        </button>
        <BorderElementsMenu
          :currentSelectedItem="getCurrentElement"
          v-on:set-element-border-enable="setElementBorderEnable"
          v-on:set-element-border-only-enable="setElementBorderOnlyEnable"
          v-on:set-border-color="setBorderColor"
          v-on:set-border-width="setBorderWidth"
          v-on:set-border-type="setBorderType"
          :colorsList="colorsList"
          v-on:close-side-menus="setOppenedMenu"
          :oppenedMenu="oppenedMenu"
          v-on:color-element="colorElement"
          v-on:opacity-element="setOpacityElement"
        />
        <!-- ------------- PROPERTIES MENU ------------- -->
        <button
          :class="`
            show-btn
            ${this.isElementMenuBtnDisabled ? ' disabled' : this.oppenedMenu === 'PropertiesElementsMenu' ? ' active' : ''}
          `"
          :disabled="isElementMenuBtnDisabled"
          @click.prevent="handleClickOnShowHideLeftMenu('PropertiesElementsMenu')"
          @touchstart.prevent="handleClickOnShowHideLeftMenu('PropertiesElementsMenu')"
        >
          <div class="icon tools-title-close-icon">
            <img :src="require(`@/assets/images/icons/element_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
        <PropertiesElementsMenu
          :currentSelectedItem="getCurrentElement"
          :containerSize="containerSize"
          v-on:move-element-btn="moveElementBtn"
          v-on:move-element-left="moveElementLeft"
          v-on:move-element-top="moveElementTop"
          :oppenedMenu="oppenedMenu"
          v-on:close-side-menus="setOppenedMenu"
          v-on:menu-input-focus="handleMenuInputFocus"
          v-on:size-element-btn="sizeElementBtn"
          v-on:size-element-width="sizeElementWidth"
          v-on:size-element-height="sizeElementHeight"
          v-on:rotate-element-btn="rotateElementBtn"
          v-on:rotate-element="rotateElementText"
        />
        <!-- ------------- SHAPES MENU ------------- -->
        <button
          :class="`
            show-btn
            ${
              this.isElementMenuBtnDisabled 
              || getCurrentElement.merged
              || getCurrentElement.isImg
              ? ' disabled' : this.oppenedMenu === 'ShapeElementsMenu' ? ' active' : ''}
          `"
          :disabled="
            isElementMenuBtnDisabled
            || getCurrentElement.merged
            || getCurrentElement.isImg
          "
          @click.prevent="handleClickOnShowHideLeftMenu('ShapeElementsMenu')"
          @touchstart.prevent="handleClickOnShowHideLeftMenu('ShapeElementsMenu')"
        >
          <div class="icon">
            <img class="img-icon divdraw"
              :src="require(`@/assets/images/icons/shapes_icon_bk.png`) ?? ''"
            />
          </div>
        </button>
        <ShapeElementsMenu
          :currentSelectedItem="getCurrentElement"
          v-on:shape-angle-element-btn="shapeAngleElementBtn"
          v-on:shape-angle-element="shapeTriangleElement"
          v-on:element-shape-selector="selectElementShape"
          v-on:shape-round-element-btn="shapeRoundElementBtn"
          v-on:shape-round-element="shapeRoundElement"
          v-on:close-side-menus="setOppenedMenu"
          :oppenedMenu="oppenedMenu"
          v-on:set-line-width="setElementLineWidth"
        />
        <!-- ------------- GROUP MENU ------------- -->
        <div class="group_menu">
          <button
            :class="`
              show-btn
              ${ this.oppenedMenu === 'GroupElementsMenu' ? ' active' : ''}
            `"
            @click.prevent="handleClickOnShowHideLeftMenu('GroupElementsMenu')"
            @touchstart.prevent="handleClickOnShowHideLeftMenu('GroupElementsMenu')"
          >
            <div class="icon">
              <img class="img-icon divdraw"
                :src="require(`@/assets/images/icons/group_icon.png`) ?? ''"
              />
            </div>
          </button>
          <button
            :class="`
              valid_group-btn
              ${ this.selectedCursor === 'group' ? ' active' : ''}
            `"
            @click.prevent="setSelectedCursor('cursor')"
            @touchstart.prevent="setSelectedCursor('cursor')"
          >
            <div class="icon">
              <img class="img-icon divdraw"
                :src="require(`@/assets/images/icons/check_icon.png`) ?? ''"
              />
            </div>
          </button>
        </div>
        <GroupElementsMenu
          v-on:delete-group-elements="removeGroupElements"
          v-on:set-group-hide="setGroupElementHide"
          v-on:merge-grouped-elements="mergeGroupedElements"
          :currentGroupInfos="getCurrentGroupInfos"
          :currentElement="getCurrentElement"
          v-on:close-side-menus="setOppenedMenu"
          :oppenedMenu="oppenedMenu"
          v-on:set-selected-item="handleMousedownOnElement"
          v-on:remove-group-element="removeElementFromGroup"
          :elementsList="getEnabledElementsList"
          v-on:set-lock-status="setLockElementsStatus"
          v-on:unmerge-grouped-elements="unmergeGroupedElements"
          v-on:selected-cursor="setSelectedCursor"
          :currentCursor="selectedCursor"
          v-on:copy-img="copyImg"
          v-on:copy-group="copyGroup"
          v-on:create-new-group="createNewElementGroup"
        />
      </div>
      <div
        id="elements_frame-container"
        :class="getCursorClass"
        ref="elements_frame_container"
        @[canMoveElement]="handleMouseMove"
        @[canToucheMoveElement]="handleMouseMove"
        @mouseup="handleMouseMoveEnd"
        @touchend="handleMouseMoveEnd"
        >
        <div
          ref="elements_frame"
          class="elements-frame"
        >
          <div
            class="elements-container"
            ref="elements_container"
            xmlns="http://www.w3.org/1999/xhtml"
            :style="`
              min-height:${ this.containerSize.height }px;
              min-width:${ this.containerSize.width }px;
              transform: scale(${ this.scaleValue });
              top: ${ this.getTopPosition }px;
              left: ${ this.getLeftPosition }px;
            `"
            @mousedown.prevent="handleClickOnContainer"
            @touchstart.prevent="handleClickOnContainer"
          >
            <div
              class="frame-background"
              :style="`
                background-color: ${ frameBgColor };
                opacity: ${ frameOpacity };
              `"
            >
            </div>
            <div v-if="gridEnabled" class="grid-container">
              <div
                v-for="value, index of grid.left"
                :key="value"
                :class="`y-grid-row${
                  (this.currentPos.left == value || this.currentPos.right == value)
                    ? ' active'
                    : ''
                }`"
                :style="`left:calc(${value}px); height:${this.containerSize.height}px;`"
              >
                <div class="grid_value" v-if="!hiddenGridValues.left.includes(index)">{{ value }}</div>
              </div>
              <div
                v-for="value, index of grid.top"
                :class="`x-grid-row${
                  (this.currentPos.top == value || this.currentPos.bottom == value)
                    ? ' active'
                    : ''
                }`"
                :key="value"
                :style="`top:calc(${value}px); width:${this.containerSize.width}px;`"
              >
                <div class="grid_value" v-if="!hiddenGridValues.top.includes(index)">{{ value }}</div>
              </div>
            </div>
              <BaseElement
                v-for="item in this.elementsListArr"
                :key="item.id"
                :class="`
                  ${elementHoverId == item.id ? ' hover' : ''}
                  ${item.hide ? ' hidden' : ''}
                 normal_element`"
                :ref="'element_' + item.id"
                :datas="item"
                :scale="scaleValue"
                v-on:rotate-element="initRotateElementOnMouse"
                v-on:moving-element="initMoveElementOnMouse"
                v-on:sizing-element="initSizeElementOnMouse"
                v-on:sizing-angle-element="initSizeElementAngleOnMouse"
                :selectedCursor="selectedCursor"
                v-on:shape-element-angle="initShapeElementOnMouse"
                v-on:shape-element-round="initShapeElementOnMouse"
                v-on:set-css-props="setCssProps"
                :minSize="minSize"
                :isCtrlKeyPressed="selectedCursor === 'move'"
                v-on:set-move-cursor="setMoveCursor"
                v-on:mousedown-element="handleMousedownOnElement"
                v-on:mouseup-element="handleMouseupOnElement"
                :selectedGroupId="selectedGroupId"
                v-on:set-group-cursor="setGroupCursor"
                :isSelected="item.id == selectedElementId"
                :maxIndex="getElementsList[getElementsList.length - 1].css.zIndex + 1"
              />
          </div>
        </div>
        <ScrollBar
          v-on:set-scroll-position="initScrollPosition"
          @mouseup="handleScrollDocumentEnd"
          @touchend="handleScrollDocumentEnd"
          v-on:set-scroll-end="handleScrollDocumentEnd"
          :scrollPosition="scrollPosition.top"
          :containerSize="(containerSize.height - this.scrollbarWidth) * this.scaleValue"
          :scaleValue="scaleValue"
          v-on:set-scrollbar-size="setScrollBarSize"
          v-on:hide-scroll-handler="hideScrollHandler"
          :type="'top'"
          :containerPos="`right: 0; top: 0;`"
          :containerWidth="scrollbarWidth + 8"
          :containerHeight="(maxFrameHeight - this.scrollbarWidth + 8)"
        />
        <ScrollBar
          v-on:set-scroll-position="initScrollPosition"
          @mouseup="handleScrollDocumentEnd"
          @touchend="handleScrollDocumentEnd"
          v-on:set-scroll-end="handleScrollDocumentEnd"
          :scrollPosition="scrollPosition.left"
          :containerSize="(containerSize.width - this.scrollbarWidth) * this.scaleValue"
          :scaleValue="scaleValue"
          v-on:set-scrollbar-size="setScrollBarSize"
          v-on:hide-scroll-handler="hideScrollHandler"
          :type="'left'"
          :containerPos="`bottom: 0; left: 0;`"
          :containerWidth="(maxFrameWidth - this.scrollbarWidth + 8)"
          :containerHeight="scrollbarWidth + 8"
        />
      </div>
      <!-- -------------- LISTE DES ELEMENTS -------------- -->
      <ItemsList
        :datas="getEnabledElementsList"
        :itemsNb="getEnabledElementsList.length"
        :itemsLimit="itemsLimit"
        :selectedElementId="selectedElementId"
        v-on:set-selected-item="handleMousedownOnElement"
        v-on:set-element-index-btn="setElementIndexBtn"
        v-on:delete-elements="removeListElements"
        v-on:set-element-index="setElementIndex"
        v-on:set-element-hover-start="setElementHoverStart"
        v-on:set-element-hover-end="setElementHoverEnd"
        v-on:set-lock-status="setLockElementsStatus"
        v-on:set-element-hide="setElementHide"
        :selectedGroupId="selectedGroupId"
        :currentGroupInfos="getCurrentGroupInfos"
        v-on:create-new-group="createNewElementGroup"
        v-on:delete-group-elements="removeGroupElements"
        v-on:merge-grouped-elements="mergeGroupedElements"
        v-on:unmerge-grouped-elements="unmergeGroupedElements"
      />
    </div>
    <ExportForm 
      :show="showExportModal"
      :type="exportModalType"
      v-on:show-export-form="showHideExportForm"
      :selectedFileType="fileExtension"
      :selectedFileName="fileName"
      v-on:export-file="exportFile"
      :containerSize="containerSize"
      :maintainRatio="maintainExportSizeRatio"
      :exportSizeCoef="exportSizeCoef"
      v-on:export-size="updateExportSize"
      v-on:menu-input-focus="handleMenuInputFocus"
      v-on:set-export-aspect-ratio="setExportAspectRatio"
      v-on:set-export-settings="setExportSettings"
    />
    <div
      v-if="scrollbarWidth > 0 && showScrollHandler"
      class="scroll-bar-corner-cursor"
    >
      <button
        :class="`
          scroll-bar-corner-cursor-btn
          ${ this.selectedCursor === 'grab' ? ' active' : '' }
        `"
        @click.prevent="cornerCursorBtn"
        @touchstart.prevent="cornerCursorBtn"
      >
        <div class="icon">
          <img class="img-icon divdraw"
            :src="require(`@/assets/images/icons/hand_icon.png`) ?? ''"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import store from "@/store";
import storage from "@/plugins/storage.js";
import i18n from "@/locales/i18n";
// Utils :
import sizingUtils from "@/assets/js/utils/sizingUtils.js";
import shapeUtils from "@/assets/js/utils/shapeUtils.js";
import historyHelper from "@/assets/js/helpers/historyHelper.js";
// Top menus
import ScalingMenu from "@/views/creator/menus/ScalingMenu.vue";
import GeneralMenu from "@/views/creator/menus/GeneralMenu.vue";
// Left menus
import DocumentMenu from "@/views/creator/menus/left-tools-menu/DocumentMenu.vue";
import PropertiesElementsMenu from "@/views/creator/menus/left-tools-menu/PropertiesElementsMenu.vue";
import ShapeElementsMenu from "@/views/creator/menus/left-tools-menu/ShapeElementsMenu.vue";
import BorderElementsMenu from "@/views/creator/menus/left-tools-menu/BorderElementsMenu.vue";
import GroupElementsMenu from "@/views/creator/menus/left-tools-menu/GroupElementsMenu.vue";

import BaseElement from "@/views/creator/BaseElement.vue";
import ScrollBar from "@/views/creator/ScrollBar.vue";
import ItemsList from "@/views/creator/ItemsList.vue";
import ExportForm from "@/views/creator/ExportForm.vue";

export default {
  name: "CreatorView",
  components: {
    BaseElement,
    ScrollBar,
    ItemsList,
    ScalingMenu,
    GeneralMenu,
    DocumentMenu,
    GroupElementsMenu,
    PropertiesElementsMenu,
    ShapeElementsMenu,
    BorderElementsMenu,
    ExportForm,
  },
  props: {
    viewHeight: Number,
    viewWidth: Number,
    isMobile: Boolean,
  },
  data() {
    return {
      oppenedMenu: "",
      inMenuInputFocus: false,
      itemsLimit: 99,
      selectedElementId: 0,
      previousSelectedElementId: 0,
      lastElementId: 0,
      // snap
      isMovingElement: false,
      isSizingElement: false,
      isSizingAngleElement: false,
      isRotatingElement: false,
      isShapingElement: false,
      previousPosX: 0,
      previousPosY: 0,
      startPos: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      currentPos: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
      elementDatas: [],
      canDeselect: true,
      aspectRatio: false,
      maxHeight: 20,
      maxWidth: 20,
      loaded: false,
      selectedCursor: "cursor",
      previousCursor: "cursor",
      currentShape: "square",
      elementsListArr: [],
      datasSaved: false,
      containerSize: {
        height: 0,
        width: 0,
      },
      maxFrameHeight: 0,
      maxFrameWidth: 0,
      gridEnabled: false,
      grid: {
        top: 0,
        left: 0,
      },
      dirCasesDelta: {
        top: {
          caseValue: 0,
          isHeight: true,
        },
        right: {
          caseValue: 2,
          isWidth: true,
        },
        bottom: {
          caseValue: 4,
          isHeight: true,
        },
        left: {
          caseValue: 6,
          isWidth: true,
        },
      },
      magnetEnabled: false,
      posFixed: {
        top: false,
        right: false,
        bottom: false,
        left: false,
      },
      magnetRange: 8,
      currentCursorT: 0,
      currentCursorL: 0,
      scaleValue : 1,
      scaledFrameSize: {
        height: 0,
        width: 0,
      },
      frameBgColor: "transparent",
      frameOpacity: 1,
      exportSizeCoef: {
        width: 1,
        height: 1,
      },
      maintainExportSizeRatio: true,
      fileName: "divimage",
      fileExtension: "png",
      colorsList: [
        "#cc0000",
        "#f57900",
        "#edd400",
        "#73d216",
        "#3465a4",
        "#75507b",
        "#c17d11",
        "#555753",
        "#d3d7cf",
        "#000000",
        "#ffffff",
        "#32796c",
        "#3aaf7b",
        "#a40000",
        "#8f5902",
      ],
      elementHoverId: 0,
      scrollPosition: {
        top: 0,
        left: 0,
      },
      previousScrollPosition: {
        top: null,
        left: null,
      },
      isScrolling: false,
      scrollBarSize: {
        left: 0,
        top: 0,
      },
      scrollBarSizeFix: {
        left: 0,
        top: 0,
      },
      elementsFramePos: {
        top: 0,
        left: 0,
      },
      scrollbarWidth: 24,
      scrollDir: 1,
      hiddenGridValues: {
        top: [],
        left: [],
      },
      minSize: 4,
      keyPressed: [],
      historyDatas: {
        index: 0,
        length: 0,
      },
      isHoveringElement: false,
      // TODO Deplacer dans des const
      directionsList : ["top", "right", "bottom", "left"],
      pressKeysList: [
        "Escape",
        "Control",
        "Shift",
        "Alt",
        "AltGraph",
        "Enter",
        "Delete",
        "z",
        "Z",
      ],
      currentSelectedGroupedElements: [], // pas sur
      groupElementsList: [], // pas sur
      lastGroupId: 0,
      selectedGroupId: null,
      cursorState: "",
      containerRect : null,
      showExportModal: false,
      exportModalType: "",
      showScrollHandler: false,
    };
  },
  created() {
    store.dispatch("loader/pending");
    this.loaded = false;
  },

  mounted() {
    this.$nextTick(() => {
      this.loaded = true;
      if (this.$refs["elements_frame_container"]) {
        this.maxFrameHeight = this.$refs["elements_frame_container"].offsetHeight;
        this.maxFrameWidth = this.$refs["elements_frame_container"].offsetWidth;
        if (this.$refs["elements_frame"]) {
          this.containerSize.height = parseInt(this.maxFrameHeight - 16);
          this.containerSize.width = parseInt(this.maxFrameWidth - 16);
          this.containerRect = this.$refs["elements_container"].getBoundingClientRect();
        }
      }
      this.checkSavedElements();
      store.dispatch("loader/done");
      window.addEventListener("resize", this.windowResizeEvent);
      window.addEventListener("keydown", this.handleKeyDown)
      window.addEventListener("keyup", this.handleKeyUp)
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.windowResizeEvent);
    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("keyup", this.handleKeyUp)
  },

  computed: {

    getCursorClass() {
      let cursorClass = "";
      if (this.selectedCursor === "grab") {
        if (this.isScrolling) {
          cursorClass = "grabbing";
        } else {
          cursorClass = "grab";
        }
      } else if (this.selectedCursor === "move" && this.isHoveringElement) {
        if (this.isMovingElement) {
          cursorClass = "moving";
        } else {
          cursorClass = "move";
        }
      } else if (this.selectedCursor === "group") {
        if (this.cursorState != "") {
          cursorClass = "group-" + this.cursorState;
        } else {
          cursorClass = "";
        }
      }
      return cursorClass;
    },

    getTopPosition() {
      if ((this.maxFrameHeight - (this.containerSize.height * this.scaleValue)) > 0) {
        return (this.maxFrameHeight - (this.containerSize.height * this.scaleValue)) / 2
      }
      return this.elementsFramePos.top;
    },

    getLeftPosition() {
      if ((this.maxFrameWidth - (this.containerSize.width * this.scaleValue)) > 0) {
        return (this.maxFrameWidth - (this.containerSize.width * this.scaleValue)) / 2
      }
      return this.elementsFramePos.left;
    },

    isElementMenuBtnDisabled() {
      if (this.getCurrentElement && !this.getCurrentElement.lock_status) {
        return false;
      } else {
        return true;
      }
    },
    
    canMoveElement() {
      return this.isScrolling ||
        this.isMovingElement ||
        this.isSizingElement ||
        this.isRotatingElement ||
        this.isShapingElement ||
        this.isSizingAngleElement
        ? "mousemove"
        : null;
    },

    canToucheMoveElement() {
      return this.isScrolling ||
        this.isMovingElement ||
        this.isSizingElement ||
        this.isRotatingElement ||
        this.isShapingElement ||
        this.isSizingAngleElement
        ? "touchmove"
        : null;
    },
    
    canScrollDocument() {
      return this.isScrolling
        ? "mousemove"
        : null;
    },

    canToucheScrollDocument() {
      return this.isScrolling
        ? "touchmove"
        : null;
    },

    getElementsList() {
      return this.elementsListArr;
    },

    getEnabledElementsList() {
      const newList = this.elementsListArr.filter(function(objet) {
          return objet.merged === false;
      });
      return newList;
    },

    getCurrentElement() {
      if (this.selectedElementId > 0) {
        return this.getElementById(this.selectedElementId);
      }
      return null;
    },

    getCurrentGroupInfos() {
      if (this.selectedCursor === "group") {
        if (this.selectedGroupId > 0) {
          return this.groupElementsList.find(group => group.id === this.selectedGroupId);
        }
        return {id: null, elements_list: []};
      } else if (this.selectedGroupId) {
        return this.groupElementsList.find(group => group.id === this.selectedGroupId);
      }
      return {id: null, elements_list: []};
    },
  },
  methods: {

    cornerCursorBtn(datas) {
      if (this.selectedCursor === "grab") {
        this.selectedCursor = this.previousCursor;
        this.previousCursor = "grab";
      } else {
        this.previousCursor = this.selectedCursor;
        this.selectedCursor = "grab";
      }
    },

    setHistoryData(datas) {
      if (datas) {
        historyHelper.addToHistory(datas);
        this.updateHistoryValues();
      }
    },

    updateHistoryValues() {
        this.historyDatas = {
          index : historyHelper.currentIndex,
          length : historyHelper.history.length,
        }
    },

    histUndo() {
      const datas = historyHelper.undoAction();
      if (datas) {
        this.elementsListArr = datas.elements_list;
        this.groupElementsList = datas.groups_list;
        this.updateHistoryValues();
      }
    },

    histRedo() {
      const datas = historyHelper.redoAction();
      if (datas) {
        this.elementsListArr = datas.elements_list;
        this.groupElementsList = datas.groups_list;
        this.updateHistoryValues();
      }
    },

    // "Escape",
    // "Control",
    // "Shift",
    // "Alt",
    // "AltGraph",
    // "Enter",
    // "Delete",

    handleKeyDown(evt) {
      if (this.pressKeysList.includes(evt.key) && !this.keyPressed.includes(evt.key)) {
        this.keyPressed.push(evt.key);
        if (evt.key === "Escape") {
          this.unselectItem();
        }
        if (evt.key === "Alt") {
          this.previousCursor = this.selectedCursor;
          this.selectedCursor = "grab";
        }
        if (this.keyPressed.includes("Control") && (this.keyPressed.includes("z") || this.keyPressed.includes("Z")) && this.keyPressed.includes("Shift")) {
          this.histRedo();
        } else if (this.keyPressed.includes("Control") && (this.keyPressed.includes("z") || this.keyPressed.includes("Z"))) {
          this.histUndo();
        } else if (evt.key === "Control") {
          this.previousCursor = this.selectedCursor;
          this.selectedCursor = "move";
        } else if (evt.key === "Shift") {
          this.previousCursor = this.selectedCursor;
          this.selectedCursor = "group";
        }
      }
    },

    handleKeyUp(evt) {
      if (this.pressKeysList.includes(evt.key) && this.keyPressed.includes(evt.key)) {
        const keyIndex = this.keyPressed.indexOf(evt.key);
        if (keyIndex !== -1) {
          if (evt.key === "Alt") {
            this.selectedCursor = this.previousCursor;
            this.previousCursor = "";
          }
          if (evt.key === "Control") {
            if (this.selectedCursor === "move") {
              this.selectedCursor = this.previousCursor;
              this.previousCursor = "";
            }
          }
          if (evt.key === "Delete" && !this.inMenuInputFocus) {
            if (this.selectedElementId) {
              this.removeElements([this.selectedElementId])
              this.updateElementsListArray();
              this.setHistoryData({
                elements_list: this.elementsListArr,
                groups_list: this.groupElementsList,
              });
            }
          }
          if (evt.key === "Shift") {
            if (this.selectedCursor === "group") {
              this.selectedCursor = this.previousCursor;
              this.previousCursor = "group";
            }
          }
          this.keyPressed.splice(keyIndex, 1);
        }
      }
    },

    setMoveCursor(isOn) {
      this.isHoveringElement = isOn;
    },

    setLockElementsStatus(itemsIdsList) {
      if (itemsIdsList && itemsIdsList.length > 0) {
        for (let itemId of itemsIdsList) {
          const element = this.getElementById(itemId);
          if (element) {
            if (element.lock_status) {
              element.lock_status = false;
            } else {
              element.lock_status = true;
              this.unselectItem();
            }
          }
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setElementHide(itemsIdsList) {
      if (itemsIdsList && itemsIdsList.length > 0) {
        for (let itemId of itemsIdsList) {
          const element = this.getElementById(itemId);
          if (element) {
            if (element.hide) {
              element.hide = false;
            } else {
              element.hide = true;
              this.unselectItem();
            }
          }
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setGroupElementHide(groupId) {
      const elementGroup = this.groupElementsList.find(group => group.id === groupId);
      if (elementGroup) {
        if (elementGroup.elements_list?.length > 0) {
          if (elementGroup.hide) {
            elementGroup.hide = false;
          } else {
            elementGroup.hide = true;
          }
          for (let itemId of elementGroup.elements_list) {
            const element = this.getElementById(itemId);
            if (element) element.hide = elementGroup.hide;
          }
        }
      }
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
    },

    setElementLineWidth(lineWidth) {
      if (lineWidth < this.minSize) lineWidth = this.minSize;
      this.getCurrentElement.line_width = lineWidth;
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
    },

    setHiddenGridValues(datas) {
      this.hiddenGridValues[datas.type] = datas.values;
    },

    // -------------------------------------------------- //
    // -------- ITEM SIZE ------------------------------ //
    // ------------------------------------------------ //
    windowResizeEvent(evt) {
      evt.preventDefault();
      this.updateMaxFrameSizeDatas();
    },

    updateMaxFrameSizeDatas() {
      if (this.$refs["elements_frame_container"]) {
        this.maxFrameHeight = this.$refs["elements_frame_container"].offsetHeight;
        this.maxFrameWidth = this.$refs["elements_frame_container"].offsetWidth;
      }
    },

    // LEFT TOOLS MENU :
    handleClickOnShowHideLeftMenu(name) {
      if (this.oppenedMenu != name) {
        this.setOppenedMenu(name);
      } else {
        this.setOppenedMenu("");
      }
    },

    setOppenedMenu (menu) {
      this.oppenedMenu = menu;
    },

    handleMenuInputFocus(status) {
      this.inMenuInputFocus = status;
    },

    // -------------------------------------------------- //
    // -------- ELEMENTS BORDER ------------------------ //
    // ------------------------------------------------ //
    setElementBorderEnable() {
      if (this.getCurrentElement) {
        if (this.getCurrentElement.border_enabled) {
          this.getCurrentElement.border_enabled = false;
        } else {
          this.getCurrentElement.border_enabled = true;
          if (this.getCurrentElement.border_only_enabled) {
            this.getCurrentElement.border_only_enabled = false;
          }
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setElementBorderOnlyEnable(value) {
      if (this.getCurrentElement) {
        if (this.getCurrentElement.border_only_enabled) {
          this.getCurrentElement.border_only_enabled = false;
        } else {
          this.getCurrentElement.border_only_enabled = true;
          if (this.getCurrentElement.border_enabled) {
            this.getCurrentElement.border_enabled = false;
          }
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setBorderColor(color) {
      if (this.getCurrentElement) {
        this.getCurrentElement.border_color = color;
        if (!this.colorsList.includes(color)) this.colorsList.push(color);
        if (this.colorsList.length > 64) this.colorsList.splice(0, 1);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setBorderWidth(size) {
      if (this.getCurrentElement) {
        this.getCurrentElement.border_width = size;
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setBorderType(type) {
      if (this.getCurrentElement) {
        // setting "all" type before every thing and continue
        if (type === "all") {
          if (this.getCurrentElement.border_types.includes("all")) {
            let typeIndex = this.getCurrentElement.border_types.indexOf("all");
            this.getCurrentElement.border_types.splice(typeIndex, 1);
          } else {
            this.getCurrentElement.border_types = [type];
          }
        } else {
          // getting the previous types list
          if (this.getCurrentElement.border_types.length > 0) {
            if (this.getCurrentElement.border_types.includes("all")) {
              let typeIndex = this.getCurrentElement.border_types.indexOf("all");
              this.getCurrentElement.border_types.splice(typeIndex, 1);
            }
            if (this.getCurrentElement.border_types.includes(type)) {
              let typeIndex = this.getCurrentElement.border_types.indexOf(type);
              this.getCurrentElement.border_types.splice(typeIndex, 1);
            } else {
              this.getCurrentElement.border_types.push(type);
            }
          }
          if (this.getCurrentElement.border_types.length === 0) {
            this.getCurrentElement.border_types = ["all"];
          }
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },
    
    setScaleValue(value) {
      if (
        this.scaleValue > value
        || this.scaleValue < value
      ) {
        this.scaleValue = value;
      }
      let frameElement = this.$refs["elements_container"];
      this.scaledFrameSize = {
        height: frameElement.offsetHeight,
        width: frameElement.offsetWidth,
      }
    },

    // -------------------------------------------------- //
    // -------------- UTILS ---------------------------- //
    // ------------------------------------------------ //
    getDirDatasfromName(direction, name = "regular") {
      let dirIndex = this.directionsList.indexOf(direction);
      if (name == "regular") {
        dirIndex += 0;
      } else if (name == "opposite") {
        dirIndex += 2;
      } else if (name == "previous") {
        dirIndex -= 1;
      } else if (name == "next") {
        dirIndex += 1;
      }
      if (dirIndex < 0) {
        dirIndex = dirIndex + 4;
      } else if (dirIndex > 3) {
        dirIndex = dirIndex - 4;
      }
      return {
        name : this.directionsList[dirIndex],
        number : dirIndex,
      };
    },
    
    getDirNameFromNum(dirIndex) {
      if (dirIndex > 3) dirIndex -= 4;
      if (dirIndex < 0) dirIndex += 4;
      return this.directionsList[dirIndex];
    },

    getDirNumFromName(dirName) {
      return this.directionsList.indexOf(dirName);
    },

    getDirDatas(currentDirName) {
      let currentDirDatas = this.getDirDatasfromName(currentDirName)
      let currentDirNum = currentDirDatas.number
      let directionsDatas = {}
      let dirTypes = ["regular", "next", "opposite", "previous"];
      for (let dirIndex = 0; dirIndex < 4; dirIndex++) {
        if (!directionsDatas[dirTypes[dirIndex]]) directionsDatas[dirTypes[dirIndex]] = {};
        directionsDatas[dirTypes[dirIndex]] = this.getDirDatasfromName((currentDirNum + dirIndex), (dirTypes[dirIndex]));
      }
      return directionsDatas;
    },
    
    // -------------------------------------------------- //
    // -------- DOCUMENT SETTINGS ---------------------- //
    // ------------------------------------------------ //
    checkSavedElements() {
      let elements = storage.get("elements_list");
      if (elements) {
        this.elementsListArr = elements;
        if (storage.get("last_element_id")) this.lastElementId = storage.get("last_element_id") ?? 0;
        if (storage.get("last_group_id")) this.lastGroupId = storage.get("last_group_id") ?? 0;
        let groups = storage.get("groups_list");
        if (groups) {
          this.groupElementsList = groups;
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
        this.updateElementsListArray();
        this.datasSaved = true;
      }
      let containerSizeSaved = storage.get("container_size");
      if (containerSizeSaved) {
        this.containerSize = containerSizeSaved;
      }
      let scaleSaved = storage.get("scale");
      if (scaleSaved) {
        this.scaleValue = scaleSaved;
      }
    },

    saveElement() {
      if (this.datasSaved) {
        store.dispatch("confirmMsg/set", {
          class: "success",
          message: i18n.global.t("elements_save_cancel_success"),
          confirm_callback: ()=> {
            storage.unset("elements_list");
            storage.unset("last_element_id");
            storage.unset("groups_list");
            storage.unset("last_group_id");
            storage.unset("container_size");
            storage.unset("scale");
            storage.unset("export_size_coef");
            storage.unset("frame_bg_color");
            storage.unset("frame_opacity");
            this.datasSaved = false;
          },
        })
      } else {
        if (this.elementsListArr.length > 0) {
          storage.set("elements_list", this.elementsListArr);
          storage.set("last_element_id", this.lastElementId);
          if (this.groupElementsList.length > 0) {
            storage.set("groups_list", this.groupElementsList);
            storage.set("last_group_id", this.lastGroupId);
          }
        }
        storage.set("container_size", this.containerSize);
        storage.set("scale", this.scaleValue);
        storage.set("export_size_coef", this.exportSizeCoef);
        storage.set("frame_bg_color", this.frameBgColor);
        storage.set("frame_opacity", this.frameOpacity);
        this.datasSaved = true;
        store.dispatch("flashMsg/set", {
          class: "success",
          value: i18n.global.t("elements_save_success"),
          timed: true,
        })
      }
    },

    handleScrollDocumentEnd(evt) {
      this.isScrolling = false;
      this.previousScrollPosition = {
        top: null,
        left: null,
      };
      this.scrollDir = 1;
    },

    handleScrollDocument(evt) {
      let client = {};
      let clientDif = {};
      let maxRange = 0;
      for (let scrollType in this.previousScrollPosition) {
        if (this.previousScrollPosition[scrollType]) {
          if (scrollType === "top") {
            client[scrollType] = evt.touches ? evt.touches[0].clientY : evt.clientY;
            maxRange = this.containerSize.height * this.scaleValue - this.maxFrameHeight - 16;
          } else {
            client[scrollType] = evt.touches ? evt.touches[0].clientX : evt.clientX;
            maxRange = this.containerSize.width * this.scaleValue - this.maxFrameWidth;
          }
          clientDif[scrollType] = client[scrollType] - this.previousScrollPosition[scrollType];
          this.scrollPosition[scrollType] += clientDif[scrollType] * this.scrollDir;
          if (this.scrollPosition[scrollType] < 0) {
            this.scrollPosition[scrollType] = 0;
          }
          if (this.scrollPosition[scrollType] > (this.scrollBarSize[scrollType] + this.scrollBarSizeFix[scrollType])) {
            this.scrollPosition[scrollType] = (this.scrollBarSize[scrollType] + this.scrollBarSizeFix[scrollType]);
          }
          const percentPos = (this.scrollPosition[scrollType] / (this.scrollBarSize[scrollType] + this.scrollBarSizeFix[scrollType]));
          this.elementsFramePos[scrollType] = (maxRange * percentPos * -1);
          this.previousScrollPosition[scrollType] = client[scrollType];
        }
      }
    },

    initScrollPosition(datas) {
      if (!this.isScrolling) this.isScrolling = true;
      for (let type in datas) {
        this.previousScrollPosition[type] = datas[type];
      }
    },

    setScrollBarSize(datas) {
      this.scrollBarSize[datas.type] = datas.size - 16;
      this.scrollBarSizeFix[datas.type] = datas.size_to_return;
    },

    hideScrollHandler(status = false) {
      this.showScrollHandler = status;
    },

    setSelectedCursor(value) {
      if (value === "group") {
        this.unselectItem();
      } else {
        this.selectedGroupId = null;
      }
      this.selectedCursor = value;
    },

    updateExportSize(datas) {
      this.exportSizeCoef = datas;
    },

    setExportAspectRatio() {
      this.maintainExportSizeRatio = !this.maintainExportSizeRatio;
    },

    setExportSettings(datas) {
      if (datas.type === "filename") {
        this.fileName = datas.value;
      } else if (datas.type === "extension") {
        this.fileExtension = datas.value;
      }
    },

    updateDocumentSize(datas) {
      let value = datas.value;
      this.containerSize[datas.type] = value;
      this.updateMaxFrameSizeDatas();
      this.scrollPosition.top = 0;
      this.scrollPosition.left = 0;
      this.elementsFramePos.top = 0;
      this.elementsFramePos.left = 0;
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
      setTimeout(() => {
        this.$refs["general_menu"].updateGrid();
      }, 100);
    },

    setAspectRatio(value) {
      this.aspectRatio = value;
    },

    setGridEnabled(datas) {
      this.gridEnabled = datas.enable;
      this.grid.top = datas.y;
      this.grid.left = datas.x;
    },

    setGridInterval(value) {
      this.magnetRange = value;
    },

    setMagnetEnable(datas) {
      this.magnetEnabled = datas;
    },
    
    // BACKGROUND STYLE : --------------------------------------
    setFrameBgColor(bgColor) {
      this.frameBgColor = bgColor;
        if (!this.colorsList.includes(bgColor)) this.colorsList.push(bgColor);
        if (this.colorsList.length > 64) this.colorsList.splice(0, 1);
    },

    setFrameOpacity(value) {
      this.frameOpacity = value / 100;
    },

    // ELEMENT COLOR : --------------------------------------
    colorElement(bgColor) {
      if (this.getCurrentElement) {
        this.getCurrentElement.css.bg = bgColor;
        if (!this.colorsList.includes(bgColor)) this.colorsList.push(bgColor);
        if (this.colorsList.length > 64) this.colorsList.splice(0, 1);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setOpacityElement(value) {
      if (this.getCurrentElement) {
        this.getCurrentElement.css.opacity = value / 100;
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    // ITEM MOVE : --------------------------------------
    handleMouseMoveEnd(evt) {
      evt.preventDefault();
      if (this.isMovingElement) {
        this.handleDragElementEnd(evt);
      } else if (this.isSizingElement || this.isSizingAngleElement) {
        this.handleSizeElementEnd(evt);
      } else if (this.isRotatingElement) {
        this.handleRotateElementEnd(evt);
      } else if (this.isShapingElement) {
        this.handleShapeElementEnd(evt);
      }
    },

    handleShapeElementEnd() {
      this.isShapingElement = false;
      if (!this.canDeselect) {
        setTimeout(() => {
          this.canDeselect = true;
        }, 250);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    handleRotateElementEnd() {
      this.isRotatingElement = false;
      if (!this.canDeselect) {
        setTimeout(() => {
          this.canDeselect = true;
        }, 250);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    handleSizeElementEnd() {
      this.isSizingElement = false;
      this.isSizingAngleElement = false;
      if (!this.canDeselect) {
        this.currentPos = {
          top : null,
          right : null,
          bottom : null,
          left : null,
        }
        this.posFixed = {
          top : false,
          right : false,
          bottom : false,
          left : false,
        }
        setTimeout(() => {
          this.canDeselect = true;
        }, 250);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    initMoveElementOnMouse(datas) {
      if (!this.isMovingElement) {
        this.isMovingElement = true;
        if (datas.moveY) {
          this.previousPosY = datas.moveY;
        }
        if (datas.moveX) {
          this.previousPosX = datas.moveX;
        }
      }
    },

    initRotateElementOnMouse(datas) {
      if (!this.isRotatingElement) {
        this.isRotatingElement = true;
        if (datas.moveY) {
          this.previousPosY = datas.moveY;
        }
        if (datas.moveX) {
          this.previousPosX = datas.moveX;
        }
        this.elementDatas = datas;
      }
    },

    initShapeElementOnMouse(datas) {
      if (!this.isShapingElement) {
        this.isShapingElement = true;
        if (datas.moveY) {
          this.previousPosY = datas.moveY;
        }
        if (datas.moveX) {
          this.previousPosX = datas.moveX;
        }
        this.elementDatas = datas;
      }
    },

    handleMouseMove(evt) {
      evt.preventDefault();
      if (this.isScrolling) {
        this.handleScrollDocument(evt);
      } else if (this.isMovingElement) {
        this.handleDragElement(evt);
      } else if (this.isSizingElement || this.isSizingAngleElement) {
        this.handleSizeElement(evt);
      } else if (this.isRotatingElement) {
        this.handleRotateElement(evt);
      } else if (this.isShapingElement) {
        if (this.elementDatas.shape == "triangle") {
          this.handleShapeAngleElement(evt);
        } else if (this.elementDatas.shape == "round") {
          this.handleShapeRoundElement(evt);
        }
      }
    },

    handleDragElement(evt) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.canDeselect = false;
        let client = {
          top: evt.touches ? evt.touches[0].clientY : evt.clientY,
          left: evt.touches ? evt.touches[0].clientX : evt.clientX,
        };
        let clientDif = {
          top: (client.top - this.previousPosY) / this.scaleValue,
          left: (client.left - this.previousPosX) / this.scaleValue,
        };
        let fixGridWidth = {top: -1, left: -1}; // TODO GERER LE DECALAGE DU A L'EPAISSEUR DE LA GRILLE
        let cursor = {
          top : this.getCurrentElement.css.top,
          left : this.getCurrentElement.css.left,
        };
        let selectedDirsArr = ["top", "left"];
        if (this.magnetEnabled) {
          for (let dir of selectedDirsArr) {
            let gridName = dir;
            if (gridName && this.grid[gridName]) {
              for (let grid of this.grid[gridName]) {
                if (
                  grid + this.magnetRange / 2 > cursor[gridName]
                  && grid - this.magnetRange / 2 < cursor[gridName]
                ) {
                  if (Math.abs(this.startPos[dir]) > this.magnetRange / 2) {
                    clientDif[gridName] = this.startPos[dir];
                    this.startPos[dir] = null;
                    this.currentPos[dir] = null;
                  } else {
                    this.startPos[gridName] += clientDif[dir];
                    this.currentPos[dir] = grid;
                    clientDif[gridName] = grid - cursor[gridName] + fixGridWidth[gridName]; // TODO GERER LE DECALAGE DU A L'EPAISSEUR DE LA GRILLE
                  }
                  break;
                }
              }
            }
          }
        }
        // if element is in group
        if (this.getCurrentElement.group_id && this.selectedGroupId && this.selectedGroupId > 0) {
          // getting all elements from group
          const groupElement = this.groupElementsList.find(group => group.id === this.getCurrentElement.group_id);
          if (groupElement && groupElement.elements_list.length > 0 ) {
            for (let elementId of groupElement.elements_list) {
              const groupedElement = this.getElementById(elementId);
              if (groupedElement) {
                groupedElement.css.top += clientDif.top;
                groupedElement.css.left += clientDif.left;
              }
            }
          }
        } else {
          this.getCurrentElement.css.top += clientDif.top;
          this.getCurrentElement.css.left += clientDif.left;
        }
        this.previousPosY = client.top;
        this.previousPosX = client.left;
      }
    },

    moveElementBtn(datas) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.setPosition("top", this.getCurrentElement.css.top + datas.moveY);
        this.setPosition("left", this.getCurrentElement.css.left + datas.moveX);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    moveElementLeft(value) {
      if (typeof value === "number" && !isNaN(value)) {
        this.setPosition("left", value);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    moveElementTop(value) {
      if (typeof value === "number" && !isNaN(value)) {
        this.setPosition("top", value);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setPosition(type, value) {
      if (this.getCurrentElement) {
        let max = {
          top: this.containerSize.height,
          left: this.containerSize.width,
        };
        if (value > max[type]) value = max[type];
        if (value < 0) value = 0;
        this.getCurrentElement.css[type] = parseFloat(value.toFixed(1));
      }
    },

    handleDragElementEnd() {
      this.isMovingElement = false;
      if (!this.canDeselect) {
        setTimeout(() => {
          this.canDeselect = true;
        }, 250);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    // ITEM SHAPE : --------------------------------------
    selectElementShape(shapeType) {
      if (this.getCurrentElement) {
        if (shapeType == "triangle") {
          this.getCurrentElement.angle_ratio.top_left = 50;
          this.getCurrentElement.angle_ratio.top_right = 50;
        } else if (shapeType == "trapeze") {
          this.getCurrentElement.angle_ratio.top_left = 25;
          this.getCurrentElement.angle_ratio.top_right = 25;
        } else if (shapeType == "losange") {
          this.getCurrentElement.angle_ratio.top_left = 50;
          this.getCurrentElement.angle_ratio.top_right = 50;
          this.getCurrentElement.angle_ratio.bottom_left = 50;
          this.getCurrentElement.angle_ratio.bottom_right = 50;
        } else if (shapeType == "hexagone") {
          this.getCurrentElement.angle_ratio.top_left = 25;
          this.getCurrentElement.angle_ratio.top_right = 25;
          this.getCurrentElement.angle_ratio.bottom_left = 25;
          this.getCurrentElement.angle_ratio.bottom_right = 25;
        } else if (shapeType == "round") {
          this.getCurrentElement.round_ratio.tl = 50;
          this.getCurrentElement.round_ratio.tr = 50;
          this.getCurrentElement.round_ratio.br = 50;
          this.getCurrentElement.round_ratio.bl = 50;
          this.getCurrentElement.shape = "round";
        } else if (shapeType == "half_round") {
          this.getCurrentElement.round_ratio.tl = 50;
          this.getCurrentElement.round_ratio.tr = 50;
          this.getCurrentElement.shape = "half_round";
        }
        this.setElementShapeState(shapeType);
      } else {
        store.dispatch("flashMsg/set", {
          class: "warning",
          value: i18n.global.t("no_element_selected"),
          timed: true,
        })
      }
    },

    setElementShapeState(shapeToSet) {
      if(
        this.getCurrentElement &&
        this.getCurrentElement.angle_ratio.top_left === 0 &&
        this.getCurrentElement.angle_ratio.top_right === 0 &&
        this.getCurrentElement.angle_ratio.bottom_left === 0 &&
        this.getCurrentElement.angle_ratio.bottom_right === 0 &&
        this.getCurrentElement.round_ratio.tl === 0 &&
        this.getCurrentElement.round_ratio.tr === 0 &&
        this.getCurrentElement.round_ratio.br === 0 &&
        this.getCurrentElement.round_ratio.bl === 0 &&
        shapeToSet !== "square" &&
        shapeToSet !== "line"
      ) shapeToSet = "square";
      if (this.getCurrentElement) {
        if (shapeToSet === "round") {
          if (
            this.getCurrentElement.round_ratio.tl > 0
            || this.getCurrentElement.round_ratio.tr > 0
            || this.getCurrentElement.round_ratio.br > 0
            || this.getCurrentElement.round_ratio.bl > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.top_left = 0;
            this.getCurrentElement.angle_ratio.top_right = 0;
            this.getCurrentElement.angle_ratio.bottom_left = 0;
            this.getCurrentElement.angle_ratio.bottom_right = 0;
          }
        }
        if (shapeToSet === "half_round") {
          if (
            this.getCurrentElement.round_ratio.tl > 0
            || this.getCurrentElement.round_ratio.tr > 0
            || this.getCurrentElement.round_ratio.br > 0
            || this.getCurrentElement.round_ratio.bl > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.top_left = 0;
            this.getCurrentElement.angle_ratio.top_right = 0;
            this.getCurrentElement.angle_ratio.bottom_left = 0;
            this.getCurrentElement.angle_ratio.bottom_right = 0;
          }
        }
        else if (shapeToSet == "trapeze") {
          if (
            this.getCurrentElement.angle_ratio.top_left > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.bottom_left = 0;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          } else if (
            this.getCurrentElement.angle_ratio.top_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.bottom_right = 0;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          } else if (
            this.getCurrentElement.angle_ratio.bottom_left > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.top_left = 0;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          } else if (
            this.getCurrentElement.angle_ratio.bottom_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.angle_ratio.top_right = 0;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          }
        }
        else if (shapeToSet == "losange") {
          if (
            this.getCurrentElement.angle_ratio.top_left > 0
            || this.getCurrentElement.angle_ratio.top_right > 0
            || this.getCurrentElement.angle_ratio.bottom_left > 0
            || this.getCurrentElement.angle_ratio.bottom_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          }
        }
        else if (shapeToSet == "hexagone") {
          if (
            this.getCurrentElement.angle_ratio.top_left > 0
            || this.getCurrentElement.angle_ratio.top_right > 0
            || this.getCurrentElement.angle_ratio.bottom_left > 0
            || this.getCurrentElement.angle_ratio.bottom_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
          }
        }
        else if (shapeToSet === "triangle") {
          if (
            this.getCurrentElement.angle_ratio.top_left > 0
            || this.getCurrentElement.angle_ratio.top_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
            this.getCurrentElement.angle_ratio.bottom_left = 0;
            this.getCurrentElement.angle_ratio.bottom_right = 0;
          } else 
          if (
            this.getCurrentElement.angle_ratio.bottom_left > 0
            || this.getCurrentElement.angle_ratio.bottom_right > 0
          ) {
            this.getCurrentElement.shape = shapeToSet;
            this.getCurrentElement.round_ratio.tl = 0;
            this.getCurrentElement.round_ratio.tr = 0;
            this.getCurrentElement.round_ratio.br = 0;
            this.getCurrentElement.round_ratio.bl = 0;
            this.getCurrentElement.angle_ratio.top_left = 0;
            this.getCurrentElement.angle_ratio.top_right = 0;
          }
        }
        else if (shapeToSet === "square") {
          this.getCurrentElement.shape = shapeToSet;
          this.getCurrentElement.angle_ratio.top_left = 0;
          this.getCurrentElement.angle_ratio.top_right = 0;
          this.getCurrentElement.angle_ratio.bottom_left = 0;
          this.getCurrentElement.angle_ratio.bottom_right = 0;
          this.getCurrentElement.round_ratio.tl = 0;
          this.getCurrentElement.round_ratio.tr = 0;
          this.getCurrentElement.round_ratio.br = 0;
          this.getCurrentElement.round_ratio.bl = 0;
        }
        else if (shapeToSet === "line") {
          this.getCurrentElement.border_enabled = false;
          this.getCurrentElement.border_only_enabled = false;
          this.getCurrentElement.shape = shapeToSet;
          this.getCurrentElement.angle_ratio.top_left = 0;
          this.getCurrentElement.angle_ratio.top_right = 0;
          this.getCurrentElement.angle_ratio.bottom_left = 0;
          this.getCurrentElement.angle_ratio.bottom_right = 0;
          this.getCurrentElement.round_ratio.tl = 0;
          this.getCurrentElement.round_ratio.tr = 0;
          this.getCurrentElement.round_ratio.br = 0;
          this.getCurrentElement.round_ratio.bl = 0;
        }
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    setCssProps(datas) {
      let element = this.getElementById(datas.element_id)
      if (element) {
        element[datas.type] = datas.props
      }
    },

    // SHAPE ROUND :
    shapeRoundElementBtn(datas) {
      if (this.getCurrentElement) {
        let roundValueToSet = shapeUtils.getLimitedValueToSet(
          this.getCurrentElement.round_ratio[datas.type] + datas.value
        );
        let roundValues = shapeUtils.getRoundValues(
          roundValueToSet,
          this.getCurrentElement,
          datas.type,
          datas.sub_type
        );
        for (let typeToSet in roundValues) {
          this.getCurrentElement.round_ratio[typeToSet] = roundValues[typeToSet];
        }
        this.setElementShapeState("round");
      }
    },

    shapeRoundElement(datas) {
      if (this.getCurrentElement && typeof datas.value === "number" && !isNaN(datas.value)) {
        this.getCurrentElement.round_ratio[datas.type] = datas.value;
      }
      this.setElementShapeState("round");
    },

    handleShapeRoundElement(evt) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.canDeselect = false;
        let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        let yDifValue = clientY - this.previousPosY;
        let xDifValue = clientX - this.previousPosX;
        let type = this.elementDatas.direction;
        let rotate = this.getCurrentElement.css.rotate;
        let dir = 1;
        if (rotate >= 0 && rotate < 45) {
          if (type == "tr") {
            xDifValue = xDifValue * -1;
          }
          if (type == "br") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "bl") {
            yDifValue = yDifValue * -1;
          }
        } else if (rotate >= 45 && rotate < 90) {
          if (type == "tr") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "br") {
            yDifValue = yDifValue * -1;
          }
          if (type == "tl") {
            xDifValue = xDifValue * -1;
          }
        } else if (rotate >= 90 && rotate < 135) {
          if (type == "tr") {
            yDifValue = yDifValue * -1;
          }
          if (type == "br") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "bl") {
            xDifValue = xDifValue * -1;
          }
        } else if (rotate >= 135 && rotate < 180) {
          if (type == "tl") {
            yDifValue = yDifValue * -1;
          }
          if (type == "tr" && type == "br") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "tl") {
            xDifValue = xDifValue * -1;
          }
        } else if (rotate >= 180 && rotate < 225) {
          if (type == "bl") {
            yDifValue = yDifValue * -1;
          }
          if (type == "br") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "tr") {
            xDifValue = xDifValue * -1;
          }
        } else if (rotate >= 225 && rotate < 270) {
          if (type == "br") {
            yDifValue = yDifValue * -1;
          }
          if (type == "tr") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "tl") {
            xDifValue = xDifValue * -1;
          }
        } else if (rotate >= 270 && rotate < 360) {
          if (type == "tr") {
            yDifValue = yDifValue * -1;
          }
          if (type == "br") {
            yDifValue = yDifValue * -1;
            xDifValue = xDifValue * -1;
          }
          if (type == "bl") {
            xDifValue = xDifValue * -1;
          }
        }
        if (
          (rotate >= 90 && rotate < 180) ||
          (rotate >= -270 && rotate < -180)
        ) {
          xDifValue = xDifValue * -1;
        } else if (
          (rotate >= 180 && rotate < 270) ||
          (rotate >= -180 && rotate < -90)
        ) {
          xDifValue = xDifValue * -1;
          yDifValue = yDifValue * -1;
        } else if (
          (rotate >= 270 && rotate < 360) ||
          (rotate >= -90 && rotate < 0)
        ) {
          yDifValue = yDifValue * -1;
        }
        if (yDifValue * yDifValue > xDifValue * xDifValue) {
          dir = yDifValue < 0 ? -1 : 1;
        } else {
          dir = xDifValue < 0 ? -1 : 1;
        }
        let y = yDifValue * (1 - rotate / 90);
        let x = xDifValue * (rotate / 90);
        let moveValue = Math.sqrt(yDifValue * yDifValue + xDifValue * xDifValue) * dir;
        let size = (this.getCurrentElement.css.width + this.getCurrentElement.css.height) / 2;
        let roundValueToSet = shapeUtils.getLimitedValueToSet(
          this.getCurrentElement.round_ratio[type] + ((moveValue * 100) / size)
        );
        let roundValues = shapeUtils.getRoundValues(
          roundValueToSet,
          this.getCurrentElement,
          type,
          "full"
        );
        for (let typeToSet in roundValues) {
          this.getCurrentElement.round_ratio[typeToSet] = roundValues[typeToSet];
        }
        this.previousPosY = clientY;
        this.previousPosX = clientX;
      }
      this.setElementShapeState("round");
    },

    // SHAPE ANGLE :
    shapeAngleElementBtn(datas) {
      if (this.getCurrentElement) {
        let type = datas.type;
        let valueToSet = this.getCurrentElement.angle_ratio[datas.type] + datas.value;
        let angleValues = shapeUtils.getAngleValues(
          valueToSet,
          this.getCurrentElement,
          type
        );
        for (let typeToSet in angleValues) {
          this.getCurrentElement.angle_ratio[typeToSet] = angleValues[typeToSet];
        }
        this.setElementShapeState(shapeUtils.getAngleShapeToSet(this.getCurrentElement))
      }
    },

    shapeTriangleElement(datas) {
      if (this.getCurrentElement && typeof datas.value === "number" && !isNaN(datas.value)) {
        let angleValues = shapeUtils.getAngleValuesToSet(
          datas.value,
          datas.type,
          {
            top_left : this.getCurrentElement.angle_ratio.top_left,
            top_right: this.getCurrentElement.angle_ratio.top_right,
          }
        );
        for (let typeToSet in angleValues) {
          this.getCurrentElement.angle_ratio[typeToSet] = angleValues[typeToSet];
        }
      }
      this.setElementShapeState(shapeUtils.getAngleShapeToSet(this.getCurrentElement))
    },

    handleShapeAngleElement(evt) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.canDeselect = false;
        let currentElement = this.getCurrentElement;
        let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        let yDifValue = clientY - this.previousPosY;
        let xDifValue = clientX - this.previousPosX;
        let type = this.elementDatas.direction;
        let rotate = this.getCurrentElement.css.rotate;
        let dir = 1;
        if (
          (rotate >= 90 && rotate < 180) ||
          (rotate >= -270 && rotate < -180)
        ) {
          xDifValue = xDifValue * -1;
        } else if (
          (rotate >= 180 && rotate < 270) ||
          (rotate >= -180 && rotate < -90)
        ) {
          xDifValue = xDifValue * -1;
          yDifValue = yDifValue * -1;
        } else if (
          (rotate >= 270 && rotate < 360) ||
          (rotate >= -90 && rotate < 0)
        ) {
          yDifValue = yDifValue * -1;
        }
        if (yDifValue * yDifValue > xDifValue * xDifValue) {
          dir = yDifValue < 0 ? -1 : 1;
        } else {
          dir = xDifValue < 0 ? -1 : 1;
        }
        let y = yDifValue * (1 - rotate / 90);
        let x = xDifValue * (rotate / 90);
        if (type == "top_right") dir = dir * -1;
        let moveValue = Math.sqrt(yDifValue * yDifValue + xDifValue * xDifValue) * dir;
        let angleValues = {
          top_left : this.getCurrentElement.angle_ratio.top_left,
          top_right: this.getCurrentElement.angle_ratio.top_right,
        };
        if (type === "top_middle") {
          angleValues.top_left = shapeUtils.getAngleValuesToSet(
            shapeUtils.getLimitedValueToSet(this.getCurrentElement.angle_ratio["top_left"] + ((moveValue * 100) / this.getCurrentElement.css.width)),
            "top_left",
            {
              top_left : this.getCurrentElement.angle_ratio.top_left,
              top_right: this.getCurrentElement.angle_ratio.top_right,
            }
          ).top_left;
          angleValues.top_right = shapeUtils.getAngleValuesToSet(
            shapeUtils.getLimitedValueToSet(this.getCurrentElement.angle_ratio["top_right"] - ((moveValue * 100) / this.getCurrentElement.css.width)),
            "top_right",
            {
              top_left : this.getCurrentElement.angle_ratio.top_left,
              top_right: this.getCurrentElement.angle_ratio.top_right,
            }
          ).top_right;
        } else if (type === "bottom_middle") {
          angleValues.bottom_left = shapeUtils.getAngleValuesToSet(
            shapeUtils.getLimitedValueToSet(this.getCurrentElement.angle_ratio["bottom_left"] + ((moveValue * 100) / this.getCurrentElement.css.width)),
            "bottom_left",
            {
              bottom_left : this.getCurrentElement.angle_ratio.bottom_left,
              bottom_right: this.getCurrentElement.angle_ratio.bottom_right,
            }
          ).bottom_left;
          angleValues.bottom_right = shapeUtils.getAngleValuesToSet(
            shapeUtils.getLimitedValueToSet(this.getCurrentElement.angle_ratio["bottom_right"] - ((moveValue * 100) / this.getCurrentElement.css.width)),
            "bottom_right",
            {
              bottom_left : this.getCurrentElement.angle_ratio.bottom_left,
              bottom_right: this.getCurrentElement.angle_ratio.bottom_right,
            }
          ).bottom_right;

        } else {
          let currentValue = ((moveValue * 100) / this.getCurrentElement.css.width);
          if (this.getCurrentElement?.angle_ratio[type] + currentValue < 0) {
            if (type === "top_left") {
              type = "bottom_left";
            } else if (type === "top_right") {
              type = "bottom_right";
            }
            currentValue *= -1;
          } else {
            if (type === "top_left" && this.getCurrentElement?.angle_ratio["bottom_left"] > 0) {
              currentValue *= -1;
              type = "bottom_left";
            } else if (type === "top_right" && this.getCurrentElement?.angle_ratio["bottom_right"] > 0) {
              currentValue *= -1;
              type = "bottom_right";
            }
          }
          let valueToSet = this.getCurrentElement.angle_ratio[type] + currentValue;
          angleValues = shapeUtils.getAngleValues(
            valueToSet,
            this.getCurrentElement,
            type
          );
        }
        for (let typeToSet in angleValues) {
          this.getCurrentElement.angle_ratio[typeToSet] = angleValues[typeToSet];
        }
        this.previousPosY = clientY;
        this.previousPosX = clientX;
        this.setElementShapeState(shapeUtils.getAngleShapeToSet(this.getCurrentElement))
      }
    },

    // -------------------------------------------------- //
    // -------- ITEM SIZE ------------------------------ //
    // ------------------------------------------------ //
    initSizeElementAngleOnMouse(datas) {
      if (!this.isSizingAngleElement) {
        this.isSizingAngleElement = true;
        if (datas.moveY) {
          this.previousPosY = datas.moveY;
        }
        if (datas.moveX) {
          this.previousPosX = datas.moveX;
        }
        this.elementDatas = datas;
        this.elementDatas["origine"] = {
          top: this.getCurrentElement.css.top,
          left: this.getCurrentElement.css.left,
          height: this.getCurrentElement.css.height,
          width: this.getCurrentElement.css.width,
        };
      }
    },

    initSizeElementOnMouse(datas) {
      if (!this.isSizingElement && this.getCurrentElement) {
        this.isSizingElement = true;
        if (datas.moveY) {
          this.previousPosY = datas.moveY;
        }
        if (datas.moveX) {
          this.previousPosX = datas.moveX;
        }
        this.elementDatas = datas;
        this.elementDatas["origine"] = {
          top: this.getCurrentElement.css.top,
          left: this.getCurrentElement.css.left,
          height: this.getCurrentElement.css.height,
          width: this.getCurrentElement.css.width,
        };
      }
    },

    getMagnetPosDatas(
      selectedDirsArr,
      clientDif,
      cursor,
      caseEighth
    ) {
      let
        previous = {},
        next = {};
      const scale = this.scaleValue;
      for (let dir of selectedDirsArr) {
        dir = sizingUtils.getDirNameFromCase(caseEighth, dir);
        const gridName = sizingUtils.getAxeNameFromDir(dir);
        let minDif = this.grid[gridName][1] / 2;
        const cursorPos = cursor[gridName] / scale;
        const maxValue = this.grid[gridName][this.grid[gridName].length - 1];
        let minValueMinToCheck = (minDif > 2) ? minDif - 2 : minDif;
        let minValueMaxToCheck = (minDif > 2) ? minDif + 2 : minDif;
        if (cursorPos <= minValueMinToCheck) {
          if (this.startPos[dir] > minDif - 1) {
            clientDif[gridName] = this.startPos[dir];
            this.startPos[dir] = null;
            this.currentPos[dir] = null;
          } else {
            if (this.startPos[dir] < 0 && clientDif[gridName] > 0) {
              this.startPos[dir] = 0;
            }
            this.startPos[dir] += clientDif[gridName];
            this.currentPos[dir] = 0;
            clientDif[gridName] = -1 * (cursorPos);
          }
          break;
        } else if (cursorPos >= maxValue) {
          if (this.startPos[dir] < (minValueMaxToCheck * -1)) {
            clientDif[gridName] = this.startPos[dir];
            this.startPos[dir] = null;
            this.currentPos[dir] = null;
          } else {
            if (this.startPos[dir] > 0 && clientDif[gridName] < 0) {
              this.startPos[dir] = 0;
            }
            this.currentPos[dir] = 0;
            this.startPos[dir] += clientDif[gridName];
            clientDif[gridName] = 0;
          }
          break;
        } else {
          if (gridName && this.grid[gridName]) {
            previous[gridName] = 0;
            next[gridName] = this.grid[gridName][this.grid[gridName].length - 1];
            for (let grindIndex = 0;  grindIndex < this.grid[gridName].length; grindIndex++) {
              let gridValue = this.grid[gridName][grindIndex];
              if (cursorPos > gridValue) {
                previous[gridName] = gridValue;
                next[gridName] = this.grid[gridName][grindIndex + 1];
              } else if (cursorPos < gridValue) {
                next[gridName] = gridValue;
                previous[gridName] = this.grid[gridName][grindIndex - 1];
              }
              let range = (next[gridName] - previous[gridName]);
              if ((range / 3) > (16 * scale)) {
                range = range / 3;
              } else {
                range = range / 2;
              }
              if (Math.abs(cursorPos - gridValue) < range) {
                if ((clientDif[gridName] * scale) > 0) {
                  range = this.grid[gridName][grindIndex + 1] - gridValue;
                } else {
                  range = gridValue - this.grid[gridName][grindIndex - 1];
                }
                if ((range / 3) > (16 * scale)) {
                  range = range / 3;
                } else {
                  range = range / 2;
                }
                if (this.startPos[dir] && Math.abs(this.startPos[dir]) > range) {
                  clientDif[gridName] = this.startPos[dir];
                  this.startPos[dir] = null;
                  // this.currentPos[dir] = null;
                } else {
                  this.startPos[dir] += clientDif[gridName];
                  this.currentPos[dir] = gridValue;
                  clientDif[gridName] = (gridValue - cursorPos);
                }
                break;
              }
            }
          }
        }
      }
      return {
        cursor: cursor,
        client_dif: clientDif,
      }
    },

    handleSizeElement(evt) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        let rect = this.$refs["elements_container"].getBoundingClientRect();
        let currentHandler = this.elementDatas.handler;
        let handlerRect = currentHandler.getBoundingClientRect();
        let cursorY = (handlerRect.top + (handlerRect.height / 2) - rect.top);
        let cursorX = (handlerRect.left + (handlerRect.width / 2) - rect.left);
        let cursor = {
          top : (handlerRect.top + (handlerRect.height / 2) - rect.top),
          left : (handlerRect.left + (handlerRect.width / 2) - rect.left),
        };
        this.canDeselect = false;
        let client = {
          top: (evt.touches ? evt.touches[0].clientY : evt.clientY),
          left: (evt.touches ? evt.touches[0].clientX : evt.clientX),
        };
        let clientDif = {
          top: (client.top - this.previousPosY) / this.scaleValue,
          left: (client.left - this.previousPosX) / this.scaleValue,
        };
        if (Math.abs(clientDif.top) > 0 || Math.abs(clientDif.left) > 0) {
          let selectedDirsStr = this.elementDatas.direction;
          let selectedDirsArr = selectedDirsStr.split("_");
          let rotate = this.getCurrentElement.css.rotate;
          if (rotate < 0) rotate = 360 + rotate;
          let rotate90 = rotate - (parseInt(rotate / 90) * 90);
          let caseEighth = parseInt(rotate / 45);
          // récupération des infos de direction en fonction du cas
          let axisNames = {
            axis_0 : sizingUtils.getCurrentAxisFromDirAndAngle(selectedDirsArr[0], caseEighth),
          }
          if (selectedDirsArr[1]) {
            axisNames["axis_1"] = sizingUtils.getCurrentAxisFromDirAndAngle(selectedDirsArr[1], caseEighth);
          } else {
            axisNames["axis_1"] = axisNames.axis_0 == "top" ? "left" : "top";
          }
          if (this.magnetEnabled) {
            let magnetPosDatas = this.getMagnetPosDatas(
              selectedDirsArr,
              clientDif,
              cursor,
              caseEighth
            );
            cursor = magnetPosDatas.cursor;
            clientDif = magnetPosDatas.client_dif
          }
          let sizingAxesDatas = {
            top : {
              size : Math.abs(clientDif.top),
              direction : (clientDif.top > 0) ? 1 : -1
            },
            left : {
              size : Math.abs(clientDif.left),
              direction : (clientDif.left > 0) ? 1 : -1
            },
          }
          // Permet de récupérer la seconde dimension donnée dans le cas des corners,
          // ou la dimension opposée de celle selectionnée dans le cas des borders
          let resizingDatasNames = sizingUtils.getAngleDatasFromDirAndAngle(selectedDirsArr, rotate);
          let quarterAngleRadians = (rotate90 < 45) ? rotate90 * (Math.PI / 180) : (90 - rotate90) * (Math.PI / 180);
          // Récupération des propriété de l'élément courrant pour les calculs
          let objValuesToSet = {
            top: this.getCurrentElement.css.top,
            left: this.getCurrentElement.css.left,
            height: this.getCurrentElement.css.height,
            width: this.getCurrentElement.css.width,
          }
          let offsets = {};
          offsets = sizingUtils.getCalculatedSizeDatas(
            {
              prim: resizingDatasNames.prim.size_name,
              sec: resizingDatasNames.sec.size_name,
            },
            quarterAngleRadians,
            sizingAxesDatas,
            axisNames,
            caseEighth,
            selectedDirsStr,
            selectedDirsArr[1] ? true : false
          );
          if (!this.aspectRatio) {
            objValuesToSet[resizingDatasNames.prim.dir_name] += offsets[resizingDatasNames.prim.dir_name];
            objValuesToSet[resizingDatasNames.sec.dir_name] += offsets[resizingDatasNames.sec.dir_name];
          }
          const aspectRatioCoef = this.aspectRatio ? 2 : 1;
          objValuesToSet[resizingDatasNames.prim.size_name] += (offsets[resizingDatasNames.prim.size_name] * aspectRatioCoef);
          objValuesToSet[resizingDatasNames.sec.size_name] += (offsets[resizingDatasNames.sec.size_name] * aspectRatioCoef);
          let
            minHeight = this.getCurrentElement.min_height,
            minWidth = this.getCurrentElement.min_width;
          if (objValuesToSet.height > minHeight && objValuesToSet.width > minWidth) {
            this.elementDatas.origine.top = objValuesToSet.top;
            this.elementDatas.origine.height = objValuesToSet.height;
            this.elementDatas.origine.left = objValuesToSet.left;
            this.elementDatas.origine.width = objValuesToSet.width;
            // setting news datas to current element
            this.getCurrentElement.css.top = objValuesToSet.top;
            this.getCurrentElement.css.height = objValuesToSet.height;
            this.getCurrentElement.css.left = objValuesToSet.left;
            this.getCurrentElement.css.width = objValuesToSet.width;
          }
          // setting previous pos
          this.previousPosY = client.top;
          this.previousPosX = client.left;
        }
      }
    },

    sizeElementBtn(datas) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.sizeElement(datas.height, datas.width);
      }
    },

    sizeElement(offsetHeight = null, offsetWidth = null) {
      if (this.getCurrentElement) {
        if (offsetHeight) {
          let newHeight = this.getCurrentElement.css.height + offsetHeight;
          if (newHeight > 2 && newHeight < this.containerSize.height) {
            this.setSize("height", newHeight);
          }
        }
        if (offsetWidth) {
          let newWidth = this.getCurrentElement.css.width + offsetWidth;
          if (newWidth > 2 && newWidth < this.containerSize.width) {
            this.setSize("width", newWidth);
          }
        }
      }
    },

    sizeElementWidth(value) {
      if (typeof value === "number" && !isNaN(value)) {
        this.setSize("width", value);
      }
    },

    sizeElementHeight(value) {
      if (typeof value === "number" && !isNaN(value)) {
        this.setSize("height", value);
      }
    },

    setSize(type, value) {
      if (this.getCurrentElement) {
        this.getCurrentElement.css[type] = parseFloat(value.toFixed(2));
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    // ITEM ROTATION : --------------------------------------
    handleRotateElement(evt) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.canDeselect = false;
        let currentElement = this.getCurrentElement.css;
        let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        let yDifValue = clientY - this.previousPosY;
        let xDifValue = clientX - this.previousPosX;
        let type = this.elementDatas.direction;
        let angleAdd = 0;
        let angleY = Math.atan(yDifValue / xDifValue) * (180 / Math.PI);
        let angleX = Math.atan(xDifValue / yDifValue) * (180 / Math.PI);
        switch (type) {
          case "top_right": {
            angleAdd = 45;
            break;
          }
          case "right_bottom": {
            angleAdd = -45;
            break;
          }
          case "bottom_left": {
            angleAdd = -135;
            break;
          }
          case "left_top": {
            angleAdd = 135;
            break;
          }
        }
        if (xDifValue < 0) {
          angleAdd += 180;
        }
        currentElement.rotate = parseFloat((angleY + angleAdd).toFixed(1));
      }
    },

    rotateElementBtn(value) {
      if (this.selectedElementId && this.selectedElementId > 0) {
        this.rotateElement(value);
      }
    },

    rotateElementText(value) {
      this.setRotate(value);
    },

    rotateElement(value = 0) {
      if (this.getCurrentElement) {
        let newRotate = this.getCurrentElement.css.rotate + value;
        if (newRotate >= -360 && newRotate <= 360) {
          this.setRotate(newRotate);
        }
      }
    },

    setRotate(value) {
      if (this.getCurrentElement) {
        if (value === 360 || value == -360) value = 0;
        this.getCurrentElement.css["rotate"] = parseFloat(value.toFixed(2));
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },
    
    // -------------------------------------------------- //
    // -------- ITEM INDEX POSITION -------------------- //
    // ------------------------------------------------ //
    setElementIndexBtn(datas) {
      const element = this.getElementById(datas.id);
      if (element) {
        this.setElementIndex({
          element_id: datas.id,
          z_index: element.css.zIndex + datas.value,
        });
      }
    },

    setElementIndex(datas) {
      const
        fromElement = this.getElementById(datas.element_id),
        toElement = this.elementsListArr.find(objet => objet.css.zIndex === datas.z_index);
      if (fromElement && toElement) {
        const
          fromIndex = fromElement.css.zIndex,
          toIndex = toElement.css.zIndex;
        for (let element of this.elementsListArr) {
          if (fromIndex > toIndex) {
            if (element.css.zIndex < fromIndex && element.css.zIndex >= toIndex) element.css.zIndex++
          } else {
            if (element.css.zIndex > fromIndex && element.css.zIndex <= toIndex) element.css.zIndex--;
          }
        }
        fromElement.css.zIndex = toIndex;
        this.updateElementsListArray();
      }
    },

    setZindexElement(element, value) {
      if (
        value <= this.elementsListArr.length &&
        value >= 0
      ) {
        element.css.zIndex = value;
      }
    },
    
    // -------------------------------------------------- //
    // -------- ITEM SELECTION ------------------------- //
    // ------------------------------------------------ //
    setElementHoverStart(elementId) {
      this.elementHoverId = elementId;
    },

    setElementHoverEnd(elementId) {
      this.elementHoverId = 0;
    },

    getElementById(elementId) {
      return this.elementsListArr.find(objet => objet.id === elementId);
    },

    setSelectedItem(itemId) {
      if (itemId === 0 || !itemId) {
        this.selectedElementId = null;
      }
      else if (this.selectedElementId != itemId) {
        this.previousSelectedElementId = this.selectedElementId;
        this.selectedElementId = itemId;
      }
    },

    unselectItem() {
        this.setSelectedItem(0);
        this.currentPos.top = 0;
        this.currentPos.left = 0;
        if (
          this.oppenedMenu != "GroupElementsMenu"
          && this.oppenedMenu != "DocumentMenu"
        ) {
          this.oppenedMenu = "";
        }
    },

    handleClickOnContainer(evt) {
      evt.preventDefault();
      if (this.selectedCursor === "grab") {
        this.scrollDir = -1;
        this.initScrollPosition({
          top: evt.touches ? evt.touches[0].clientY : evt.clientY,
          left: evt.touches ? evt.touches[0].clientX : evt.clientX,
        })
      }
      if (
        evt.target.classList.contains("grid_value") ||
        evt.target.classList.contains("x-grid-row") ||
        evt.target.classList.contains("y-grid-row") ||
        evt.target.classList.contains("frame-background") ||
        evt.target.classList.contains("elements-container") ||
        evt.target.classList.contains("grid-container")
      ) {
        this.unselectItem();
        this.selectedGroupId = 0;
      }
    },

    setSelectedItemFromList(itemId) {
      this.handleMousedownOnElement({
        evt: null,
        item_id: itemId,
        group_id: null,
      });
    },

    handleMousedownOnElement(datas) {
      const
        evt = datas.evt ?? null,
        itemId = datas.item_id,
        groupId = datas.group_id;
      if (this.selectedCursor === "move") {
        this.setSelectedItem(itemId);
        if (evt) {
          this.initMoveElementOnMouse({
            moveY: evt.touches ? evt.touches[0].clientY : evt.clientY,
            moveX: evt.touches ? evt.touches[0].clientX : evt.clientX,
          });
        }
      } else if (this.selectedCursor === "group") {
        this.handleGroupElements(itemId, groupId);
      } else {
        // check if same element clicked
        if (itemId == this.selectedElementId) {
          if (this.selectedGroupId > 0 && !this.isMovingElement) {
            this.selectedGroupId = 0;
          } else if (
            !this.isMovingElement &&
            !this.isSizingElement &&
            !this.isSizingAngleElement &&
            !this.isRotatingElement &&
            !this.isShapingElement &&
            this.canDeselect
          ) {
            this.unselectItem();
            this.selectedGroupId = 0;
          } else {
            this.setSelectedItem(itemId);
          }
        } else {
          const currentElement = this.getElementById(itemId);
          if (currentElement && currentElement.group_id && currentElement.group_id > 0) {
            this.selectedGroupId = currentElement.group_id;
          } else if (this.selectedGroupId > 0) {
            this.selectedGroupId = 0;
          }
          this.setSelectedItem(itemId);
        }
      }
    },

    handleMouseupOnElement(datas) {
      this.startPos.top = null;
      this.startPos.right = null;
      this.startPos.bottom = null;
      this.startPos.left = null;
    },
    
    // -------------------------------------------------- //
    // -------- GROUP ELEMENTS ------------------------- //
    // ------------------------------------------------ //
    setGroupCursor(groupingState) {
      this.cursorState = groupingState;
    },

    createNewElementGroup(setCursor = true) {
      this.unselectItem();
      if (setCursor && this.selectedCursor != "group" && this.$refs["general_menu"]) {
        this.$refs["general_menu"].handleClickOnCursorType("group");
      }
      this.lastGroupId++;
      const newGroup = {
        id: this.lastGroupId,
        name: `group_${ this.lastGroupId }`,
        elements_list: [],
      };
      this.groupElementsList.push(newGroup);
      this.selectedGroupId = newGroup.id;
      return newGroup;
    },

    removeGroupElements(groupDatas) {
      if (groupDatas && groupDatas.id && groupDatas.elements_list) {
        this.removeElements(groupDatas.elements_list);
        this.removeGroup(groupDatas.id);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    unmergeGroupedElements(elemId) {
      const currentElement = this.getElementById(elemId);
      if (currentElement.elements_list?.length) {
        let currentGroupId = null;
        for (let element of currentElement.elements_list) {
          if (!currentGroupId) currentGroupId = element.group_id;
          const elementToUnMerge = this.getElementById(element.id) ?? null;
          if (elementToUnMerge) elementToUnMerge.merged = false;
        }
        this.selectedGroupId = currentGroupId;
      }
      this.removeElements([elemId]);
      this.updateElementsListArray();
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
    },

    mergeGroupedElements(groupId) {
      const currentGroup = this.groupElementsList.find(group => group.id === groupId);
      if (currentGroup && currentGroup.elements_list?.length > 0) {
        let style = {
          height: 0,
          width: 0,
          bg: "#3465a4",
          position: "absolute",
          top: 0,
          left: 0,
          translateX: -50,
          translateY: -50,
          rotate: 0,
          zIndex: 0,
          opacity: 1,
        };
        this.containerRect = this.$refs["elements_container"].getBoundingClientRect();
        this.lastElementId++;
        let newElement = {
          name: "element_" + this.lastElementId,
          id: "element_" + this.lastElementId,
          css: style,
          min_width: 56,
          min_height: 56,
          lock_status: false,
          elements_list: [],
          group_id: null,
          group: false,
          hide: false,
          isImg: true,
          disabled: false,
          merged: false,
        };
        newElement.class = "";
        newElement.name = "element_" + this.lastElementId;
        newElement.id = this.lastElementId;
        newElement.css.zIndex = this.lastElementId;
        let
          currentzIndex = 0,
          currentwidth = 0,
          currentheight = 0,
          currentTop = null,
          currentLeft = null,
          currentBottom = null,
          currentRight = null;
        let index = 1;
        for (let elementId of currentGroup.elements_list) {
          let elem = this.getElementById(elementId);
          let domElem = this.$refs[`element_${elementId}`][0].$el;
          if (currentzIndex < elem.css.zIndex) currentzIndex = elem.css.zIndex;
          let rect = domElem.getBoundingClientRect();
          if (!currentTop) {
            currentTop = rect.top + window.scrollY;
          }
          if (rect.top + window.scrollY < currentTop) {
            currentTop = rect.top + window.scrollY;
          }
          if (!currentLeft) {
            currentLeft = rect.left + window.scrollX;
          }
          if (rect.left + window.scrollX < currentLeft) {
            currentLeft = rect.left + window.scrollX;
          }
          if (!currentBottom) currentBottom = rect.bottom + window.scrollY;
          if (rect.bottom + window.scrollY > currentBottom) {
            currentBottom = rect.bottom + window.scrollY;
          }
          if (!currentRight) currentRight = rect.right + window.scrollX;
          if (rect.right + window.scrollX > currentRight) {
            currentRight = rect.right + window.scrollX;
          }
          if ((currentBottom - currentTop) > currentheight) currentheight = (currentBottom - currentTop);
          if ((currentRight - currentLeft) > currentwidth) {
            currentwidth = (currentRight - currentLeft);
          }
          elem.merged = true;
          newElement.elements_list.push(elem);
          index++;
        }
        const
          heightToSet = currentheight / this.scaleValue,
          widthToSet = currentwidth / this.scaleValue;
        const
          topToSet = (currentTop / this.scaleValue) - ((this.containerRect.top) / this.scaleValue) + (heightToSet / 2),
          leftToSet = (currentLeft / this.scaleValue) - ((this.containerRect.left) / this.scaleValue) + (widthToSet / 2);
        newElement.css.height = heightToSet;
        newElement.css.width = widthToSet;
        newElement.css.top = topToSet;
        newElement.css.left = leftToSet;
        newElement.css.zIndex = currentzIndex;
        for (let innerElement of newElement.elements_list) {
          innerElement.parent_props.ctnr_top = (currentTop / this.scaleValue) - ((this.containerRect.top) / this.scaleValue);
          innerElement.parent_props.ctnr_left = (currentLeft / this.scaleValue) - ((this.containerRect.left) / this.scaleValue);
          innerElement.parent_props.id = this.lastElementId;
        }
        this.elementsListArr.push(newElement);
        const interval = setInterval(() => {
          if (this.$refs["element_" + this.lastElementId]) {
            clearInterval(interval);
            this.setSelectedItem(this.lastElementId);
            this.setSelectedCursor("cursor");
            this.setHistoryData({
              elements_list: this.elementsListArr,
              groups_list: this.groupElementsList,
            });
          }
        }, 50);
      }
      this.setSelectedCursor("cursor");
    },

    removeElementFromGroup(datas, currentElement = null, currentGroup = null) {
      const
        itemIdsList = datas.item_ids_list,
        groupId = datas.group_id;
      if (!currentGroup) currentGroup = this.groupElementsList.find(group => group.id === groupId);
      // if the element is in group, getting the current group
      if (currentGroup) {
        if (itemIdsList?.length > 0) {
          for (let itemIndex = itemIdsList.length - 1; itemIndex >= 0; itemIndex--) {
            const itemId = itemIdsList[itemIndex];
            // if (!currentElement) currentElement = this.getElementById(itemId);
            if (!currentElement) currentElement = this.elementsListArr.find(item => item.id === itemId);
            if (currentElement) {
              // removing group id from element
              currentElement.group_id = null;
              this.$nextTick(() => {
                // get element index to remove
                const elementIndexToRemove = currentGroup.elements_list.indexOf(itemId);
                // removing element from group list
                if (elementIndexToRemove !== -1) {
                  currentGroup.elements_list.splice(elementIndexToRemove, 1);
                }
              });
            }
          }
          // // checking if group's elements list is empty
          // if (currentGroup.elements_list.length === 0) {
          //   // removing group from groups list
          //   this.removeGroup(groupId);
          // }
        }
      }
    },

    removeGroup(groupId) {
      // removing group from groups list
      this.groupElementsList = this.groupElementsList.filter(group => group.id !== groupId);
      // unsetting selected group
      this.selectedGroupId = null;
    },

    addingElementToGroup(group, element) {
      // adding group id from element
      element.group_id = group.id;
      // adding element id to group
      if (!group.elements_list.includes(element.id)) group.elements_list.push(element.id);
    },

    handleGroupElements(itemId, groupId) {
      const currentElementClicked = this.getElementById(itemId);
      if (currentElementClicked) {
        // checking if the element is a group or an item
        if (groupId) {
          if (groupId === this.selectedGroupId) {
            // if the element is in group, getting the current group
            const currentGroup = this.groupElementsList.find(group => group.id === groupId);
            if (currentGroup) {
              this.removeElementFromGroup({item_ids_list: [itemId], group_id: groupId}, currentElementClicked, currentGroup);
              this.setHistoryData({
                elements_list: this.elementsListArr,
                groups_list: this.groupElementsList,
              });
            }
          } else {
            this.selectedGroupId = groupId;
          }
        }
        // else the element is not a group
        else {
          // checking if a current group is selected
          if (this.selectedGroupId) {
            // getting the current group
            const currentGroup = this.groupElementsList.find(group => group.id === this.selectedGroupId);
            if (currentGroup) {
              // adding group id from element
              this.addingElementToGroup(currentGroup,currentElementClicked);
              this.setHistoryData({
                elements_list: this.elementsListArr,
                groups_list: this.groupElementsList,
              });
            }
          }
          // else no group selected
          else {
            // creating a new group with current item clicked inside
            const newGroup = this.createNewElementGroup();
            this.addingElementToGroup(newGroup,currentElementClicked);
              this.setHistoryData({
                elements_list: this.elementsListArr,
                groups_list: this.groupElementsList,
              });
          }
        }
      }
    },

    updateElementsListArray() {
      this.elementsListArr.sort((itemA, itemB) => itemA.css.zIndex - itemB.css.zIndex);
    },
    
    // -------------------------------------------------- //
    // -------- EXPORT / RENDER ------------------------- //
    // ------------------------------------------------ //
    handleClickOnExport() {
      if (this.showExportModal) {
        this.showExportModal = false;
        this.exportModalType = "";
      } else {
        this.showExportModal = true;
        this.exportModalType = "export";
      }
    },

    handleClickOnRender() {
      if (this.showExportModal) {
        this.showExportModal = false;
        this.exportModalType = "";
      } else {
        this.showExportModal = true;
        this.exportModalType = "render";
      }
    },

    loadAs(file) {
      const reader = new FileReader();
      store.dispatch("loader/pending");
      reader.onload = () => {
        try {
          const fileContent = JSON.parse(reader.result);
          if (fileContent) {
            setTimeout(()=>{
              this.exportSizeCoef = fileContent.export_size_coef;
              this.frameBgColor = fileContent.frame_bg_color;
              this.containerSize = fileContent.container_size;
              this.frameOpacity = fileContent.frame_opacity;
              this.elementsListArr = fileContent.elements_list;
              this.lastElementId = fileContent.last_element_id;
              this.groupElementsList = fileContent.groups_list;
              this.lastGroupId = fileContent.last_group_id;
              this.scaleValue = fileContent.scale;
              this.setHistoryData({
                elements_list: this.elementsListArr,
                groups_list: this.groupElementsList,
              });
              this.updateElementsListArray();
              store.dispatch("loader/done");
            }, 500)
          }
        } catch (error) {
          store.dispatch("flashMsg/set", {
            class: "danger",
            value: i18n.global.t("load_as_error_msg"),
            timed: true,
          })
        }
      };
      reader.readAsText(file);
    },

    showHideExportForm() {
      this.showExportModal = false;
    },

    exportFile(datas) {
      if (datas.export_type === "render") {
        this.getImg();
      } else if (datas.export_type === "export") {
        this.saveAs();
      }
    },

    saveAs() {
      const datasToSaveAs = JSON.stringify({
        export_size_coef: structuredClone(this.exportSizeCoef),
        frame_bg_color: structuredClone(this.frameBgColor),
        container_size: structuredClone(this.containerSize),
        frame_opacity: structuredClone(this.frameOpacity),
        elements_list: structuredClone(this.elementsListArr),
        last_element_id: structuredClone(this.lastElementId),
        groups_list: structuredClone(this.groupElementsList),
        last_group_id: structuredClone(this.lastGroupId),
        scale: structuredClone(this.scaleValue),
      });
      store.dispatch("loader/pending");
      let downloadLinkTmp = document.createElement("a");
      downloadLinkTmp.href = `data:text/json;charset=utf-8,${encodeURIComponent(datasToSaveAs)}`;
      downloadLinkTmp.download = this.fileName + ".dvdraw";
      setTimeout(() => {
        downloadLinkTmp.click();
        store.dispatch("loader/done");
      }, 500);
    },

    // ITEM SNAPSHOT : --------------------------------------
    getImg(exportType) {

      // return this.getImgTMP();

        // // Obtenez une référence à tous les divs que vous souhaitez convertir en SVG
        // const divs = document.querySelectorAll('.votre-classe-div');
        // // Créez un élément SVG
        // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // // Parcourez chaque div et créez un élément SVG correspondant
        // divs.forEach(div => {
        //     // Créez un élément SVG approprié en fonction des propriétés du div
        //     const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        //     svgElement.setAttribute('x', div.style.left);
        //     svgElement.setAttribute('y', div.style.top);
        //     svgElement.setAttribute('width', div.style.width);
        //     svgElement.setAttribute('height', div.style.height);
        //     svgElement.setAttribute('fill', div.style.backgroundColor);

        //     // Ajoutez l'élément SVG à votre SVG global
        //     svg.appendChild(svgElement);
        // });
        // // Ajoutez votre SVG généré à votre document
        // document.body.appendChild(svg);


      let
        difTop = 0,
        difLeft = 0;
      if (!exportType) exportType = this.fileExtension;
      store.dispatch("loader/pending");
      let containerStyle = `
        position: relative;
        top: -${ difTop / 2 }px;
        left: -${ difLeft / 2 }px;
        height: 100%;
        width: 100%;
        transform: scaleX(${ this.exportSizeCoef.width }) scaleY(${ this.exportSizeCoef.height });
        background-color: ${ this.frameBgColor };
        transform-origin: top left;
      `;
      let source = `
        <div xmlns="http://www.w3.org/1999/xhtml" style="${containerStyle}">
      `;
      // Background ...
      source += `<div class="BACKGROUND" style="
        height: ${ this.containerSize.height }px;
        width: ${ this.containerSize.width }px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${ this.frameBgColor };
        opacity: ${ (this.frameOpacity / 100) };
      "></div>`;
      // Elements ...
      for (let elemIndex in this.getElementsList) {
        const elem = this.getElementsList[elemIndex];
        if (!elem.merged && !elem.hide) {
          if (elem.isImg) {
            const img = this.$refs[`element_${ elem.id }`][0].$el?.querySelector("img");
              source += `
                <div class="ELEMENT-${ elemIndex }" style="
                  box-sizing: border-box;
                  ${ elem.element_style }
                ">
                  <div class="ELEMENT-${ elemIndex }-CONTENT" style="
                    position:relative;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    box-sizing: border-box;
                  ">
                      <img
                        src="${ img.src }"
                        style="
                          height: 100%;
                          width: 100%;
                      " />
                  </div>
                </div>
              `;  
          } else {
            source += `
              <div class="ELEMENT-${ elemIndex }" style="
                box-sizing: border-box;
                ${ elem.element_style }
              ">
                <div class="ELEMENT-${ elemIndex }-CONTENT" style="
                  position:relative;
                  height: 100%;
                  width: 100%;
                  overflow: hidden;
                  box-sizing: border-box;
                ">
              `;
              if (elem.element_items_style.css.background) source += `<div style="${ elem.element_items_style.css.background }"></div>`;
              if (elem.element_items_style.css.bottom) source += `<div style="${ elem.element_items_style.css.bottom }"></div>`;
              if (elem.element_items_style.css.top) source += `<div style="${ elem.element_items_style.css.top }"></div>`;
              if (elem.element_items_style.css.left) source += `<div style="${ elem.element_items_style.css.left }"></div>`;
              if (elem.element_items_style.css.right) source += `<div style="${ elem.element_items_style.css.right }"></div>`;
            source += `</div></div>`;
          }
        }
      }
      document.getElementById("source").innerHTML = source.replace(" ","");
      let downloadLinkTmp = null;

      setTimeout(() => {
        try {
          if (exportType === "svg") {
            // SVG :
            let svgString = `
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="${this.containerSize.width * this.exportSizeCoef.width}"
                height="${this.containerSize.height * this.exportSizeCoef.height}"
              >
                <foreignObject
                  width="100%"
                  height="100%"
                >
                  <div xmlns="http://www.w3.org/1999/xhtml" style="${containerStyle}">${ source }</div></div>
                </foreignObject>
              </svg>
            `;
            downloadLinkTmp = document.createElement("a");
            downloadLinkTmp.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
            downloadLinkTmp.download = this.fileName + "." + exportType;
            downloadLinkTmp.click();
            store.dispatch("loader/done");
          } else if (exportType === "png") {
            // PNG :
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = this.containerSize.height * this.exportSizeCoef.height;
            canvas.width = this.containerSize.width * this.exportSizeCoef.width;
            let tempImg = document.createElement("img");
            tempImg.src = "data:image/svg+xml," + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg"
                width="${ this.containerSize.width * this.exportSizeCoef.width }"
                height="${ this.containerSize.height * this.exportSizeCoef.height }"
              >
                <foreignObject 
                  style="
                    width: ${this.containerSize.width}px;
                    height: ${this.containerSize.height}px;
                  "
                >
                  ${ source }</div>
                </foreignObject>
              </svg>
            `);
            tempImg.onload = () => {
              if (context) {
                context.drawImage(tempImg, 0, 0);
                downloadLinkTmp = document.createElement("a");
                downloadLinkTmp.href = canvas.toDataURL("image/png");
                downloadLinkTmp.download = this.fileName + "." + exportType;
                downloadLinkTmp.click();
                store.dispatch("loader/done");
              }
            }
          }
        } catch (error) {
          console.error("Une erreur est survenue lors du dessin de l'image sur le canvas :", error);
        }
        store.dispatch("loader/done");
      }, 500);
      
    },

    addElement(evt) {
      evt.preventDefault();
      if (this.elementsListArr.length > this.itemsLimit) {
        store.dispatch("flashMsg/set", {
          class: "warning",
          value: i18n.global.t("elements_nb_limit_error"),
          timed: true,
        })
        return;
        // TODO MESSAGE
      }
      if (!evt.currentTarget.classList.contains("disabled")) {
        let style = this.getBaseStyle();
        this.lastElementId++;
        let newElement = {
          name: "element_" + this.lastElementId,
          id: "element_" + this.lastElementId,
          css: style,
          shape: this.currentShape,
          angle_ratio: { top_left: 0, top_right: 0 , bottom_left: 0, bottom_right: 0, },
          round_ratio: { tl: 0, tr: 0, br: 0, bl: 0 },
          // TODO : tout mettre dans une clé border : {}
          border_enabled: false,
          border_only_enabled: false,
          border_color: "black",
          border_width: 16,
          // ....
          min_width: 56,
          min_height: 56,
          border_types: ["all"],
          line_width: this.minSize,
          lock_status: false,
          elements_list: [],
          group_id: null,
          group: false,
          hide: false,
          isImg: false,
          disabled: false,
          merged: false,
          parent_props: {
            ctnr_top: 0,
            ctnr_left: 0,
            id: 0,
          },
        };
        newElement.class = "";
        newElement.name = "element_" + this.lastElementId;
        newElement.id = this.lastElementId;
        newElement.css.zIndex = this.lastElementId;
        this.elementsListArr.push(newElement);
        const interval = setInterval(() => {
          if (this.$refs["element_" + this.lastElementId]) {
            clearInterval(interval);
            this.setSelectedItem(this.lastElementId);
          }
        }, 50);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    copyGroup(groupId = null) {
      if (!groupId) groupId = this.selectedGroupId;
      const currentGroup = this.groupElementsList.find(group => group.id === groupId);
      const newGroup = this.createNewElementGroup(false);
      for (let elemId of currentGroup.elements_list) {
        const copiedElement = this.copyElement(this.getElementById(elemId));
        this.addingElementToGroup(newGroup,copiedElement);
      }
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
      return newGroup;
    },

    copyImg(elemId) {
      let newElement = structuredClone(this.getElementById(elemId));
      const currentGroupId = newElement.elements_list[0].group_id;
      const newGroup = this.copyGroup(currentGroupId);
      if (newGroup && newGroup.elements_list?.length > 0) {
        this.lastElementId++;
        newElement.name = "element_" + this.lastElementId;
        newElement.id = this.lastElementId;
        newElement.css.zIndex = this.lastElementId;
        for (let elementId of newGroup.elements_list) {
          let elem = this.getElementById(elementId);
          newElement.elements_list.push(elem);
        }
        this.elementsListArr.push(newElement);
        const interval = setInterval(() => {
          if (this.$refs["element_" + this.lastElementId]) {
            clearInterval(interval);
            this.setSelectedItem(this.lastElementId);
            this.setSelectedCursor("cursor");
            this.setHistoryData({
              elements_list: this.elementsListArr,
              groups_list: this.groupElementsList,
            });
          }
        }, 50);
      }
    },

    copyElement(elementToCopy = null) {
      this.lastElementId++;
      let style = this.getBaseStyle();
      const newElement = structuredClone(elementToCopy ? elementToCopy : this.getCurrentElement);
      if (newElement) {
        newElement.class = "";
        newElement.name = "element_" + this.lastElementId;
        newElement.id = this.lastElementId;
        newElement.css.zIndex = this.lastElementId;
        newElement.element_items_style.id = this.lastElementId;
        this.elementsListArr.push(newElement);
        if (newElement.group_id && newElement.group_id > 0) {
          // getting the current group
          const currentGroup = this.groupElementsList.find(group => group.id === newElement.group_id);
          if (currentGroup) {
            // adding group id from element
            this.addingElementToGroup(currentGroup,newElement);
          }
        }
        const interval = setInterval(() => {
          if (this.$refs["element_" + this.lastElementId]) {
            clearInterval(interval);
            this.setSelectedItem(this.lastElementId);
          }
        }, 50);
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      } else {
        store.dispatch("flashMsg/set", {
          class: "warning",
          value: i18n.global.t("no_element_selected"),
          timed: true,
        })
      }
      return newElement;
    },

    getBaseStyle() {
      let baseSize = 64;
      let biggestSize = (this.containerSize.width > this.containerSize.height) ? this.containerSize.height / 3 : this.containerSize.width / 3;
      if (biggestSize > baseSize) {
        baseSize = parseInt(this.containerSize.height / 3)
      }
      return {
        height: baseSize,
        width: baseSize,
        bg: "#3465a4",
        position: "absolute",
        top: this.containerSize.height / 2,
        left: this.containerSize.width / 2,
        translateX: -50,
        translateY: -50,
        rotate: 0,
        zIndex: 1,
        opacity: 1,
      };
    },

    handleClickOnDeleteElement(evt) {
      let itemId = this.selectedElementId;
      if (itemId && !evt.currentTarget.classList.contains("disabled")) {
        this.removeElements([itemId]);
        this.updateElementsListArray();
        this.setHistoryData({
          elements_list: this.elementsListArr,
          groups_list: this.groupElementsList,
        });
      }
    },

    handleClickOnDeleteAllElements(evt) {
      if (this.elementsListArr.length > 0) {
        store.dispatch("confirmMsg/set", {
          class: "success",
          message: i18n.global.t("delete_all_elements_confirm_msg"),
          confirm_callback: ()=> {
            for (
              let elementIndex = 0;
              elementIndex < this.elementsListArr.length;
              elementIndex++
            ) {
              this.unselectItem();
              this.removeElements([this.elementsListArr[elementIndex].id]);
              this.updateElementsListArray();
            }
            this.selectedElementId = 0;
            this.lastElementId = 0;
            this.elementsListArr = [];
            this.setHistoryData({
              elements_list: this.elementsListArr,
              groups_list: this.groupElementsList,
            });
          },
        })
      } else {
        store.dispatch("flashMsg/set", {
          class: "warning",
          value: i18n.global.t("no_element_to_delete"),
          timed: true,
        })
      }
    },

    removeListElements(itemsIdsList) {
      this.removeElements(itemsIdsList);
      this.updateElementsListArray();
      this.setHistoryData({
        elements_list: this.elementsListArr,
        groups_list: this.groupElementsList,
      });
    },

    // ITEM DELETION : --------------------------------------
    removeElements(itemsIdsList) {
      if (itemsIdsList && itemsIdsList.length > 0 && this.elementsListArr.length > 0) {
        for (let itemId of itemsIdsList) {
          const currentElement = this.getElementById(itemId);
          const groupId = currentElement.group_id;
          let previousElement;
          let maxZindex = this.getCurrentElement?.css?.zIndex ?? null;
          let indexToRemove;
          for (
            let elementIndex = 0;
            elementIndex < this.elementsListArr.length;
            elementIndex++
          ) {
            if (itemId === this.previousSelectedElementId) {
              previousElement = this.elementsListArr[elementIndex];
            }
            let element = this.elementsListArr[elementIndex];
            if (maxZindex && element.css.zIndex > maxZindex) {
              element.css.zIndex--;
            }
            if (itemId === this.elementsListArr[elementIndex].id) {
              indexToRemove = elementIndex;
            }
          }
          this.elementsListArr.splice(indexToRemove, 1);
        }

      } else {
        if (!this.selectedElementId) {
          store.dispatch("flashMsg/set", {
            class: "warning",
            value: i18n.global.t("no_element_selected"),
            timed: true,
          })
          return;
        }
        store.dispatch("flashMsg/set", {
          class: "warning",
          value: i18n.global.t("no_element_to_delete"),
          timed: true,
        })
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

#creator {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;

  .frame-wrapper {
    display: flex;
    position: relative;
    flex-direction: row;
    flex-grow: 1;
    margin: var(--gap-1-4);

    @include screen-small {
      margin: 0 var(--gap-1-4);
    }

    .tools-list-container {
      position: absolute;
      left: var(--gap-1-4);
      top: var(--gap-1-4);
      display: flex;
      flex-direction: column;
      font-size: 0.8em;
      z-index: 9;

      @include screen-small {
        position: initial;
        margin-top: var(--gap-1-4);
      }
      * {
        color: var(--bk-70);
      }
    }

    #elements_frame-container {
      display: block;
      width: calc(100%);
      flex-direction: column;
      position: relative;
      box-shadow: 0 0 0.25rem var(--bk-50) inset;

      &.grab {
        // cursor: grab;
        // cursor: cursort-pointer;
        // cursor: not-allowed;
        // cursor: wait;
        cursor: url("@/assets/images/cursors/cursor_grab.png"), auto;
      }
      &.grabbing {
        cursor: url("@/assets/images/cursors/cursor_grabbing.png"), auto;
      }
      &.move {
        cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
      }
      &.moving {
        cursor: url("@/assets/images/cursors/cursor_grabbing.png"), auto;
        .base_element.selected {
          box-shadow: 0 0 0 0.25rem var(--bk-50);
        }
      }
      &.group-add {
        cursor: url("@/assets/images/cursors/cursor_group_plus.png"), auto;
        // cursor: url("@/assets/images/cursors/group-add.svg"), auto;
        // background-color: green;
      }
      &.group-remove {
        // cursor: url("@/assets/images/cursors/cursor_minus.png"), auto;
        cursor: url("@/assets/images/cursors/cursor_group_minus.png"), auto;
        // background-color: rgba(255, 0, 0, 0.3);
      }
      &.group-select {
        // cursor: url("@/assets/images/icons/group_cursor_icon.png"), auto;
        cursor: url("@/assets/images/cursors/cursor_group.png"), auto;
        // background-color: rgba(255, 255, 0, 0.3);
        // cursor: alias;
      }
      &.group-new {
        cursor: url("@/assets/images/cursors/cursor_group_new.png"), auto;
        // background-color: rgba(0, 0, 255, 0.3);
      }

      // &.grabbing {
      //   cursor: grabbing;
      // }

      @include screen-small {
        margin: var(--gap-1-4);
        width: calc(100% - var(--btn-size) - var(--gap-1-4));
      }

      .elements-frame {
        position: relative;
        overflow: hidden;
        
        height: 100%;
        width: 100%;

        @include flex-center-row;

        &::-webkit-scrollbar {
          width: 1rem;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--bk-80);
          border-radius: 1rem;
          border: 0.2rem solid var(--wt-80);
        }

        &::-webkit-scrollbar-corner {
          background-color: var(--bk-10);
        }

      }
    }
  }

  .elements-container {
    position: relative;
    transform-origin: top left;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    .frame-background {
      display: flex;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 0 0 0.25rem var(--bk-50) inset;
    }

    .grid-container {
      --grid-size: 0.25rem;
      height: 100%;
      width: 100%;
      position: relative;
      .y-grid-row {
        position: absolute;
        width: var(--grid-size);
        background-color: var(--bk-05);
        transform: translateX(-50%);
        z-index: 0;
        display: flex;
        justify-content: center;
        &:nth-child(even) {
          background-color: var(--bk-10);
        }
        &.active {
          border: solid calc(var(--grid-size) / 2) var(--wt-50);
          box-shadow: 0 0 0.5rem var(--success-color-2);
        }
      }

      .x-grid-row {
        position: absolute;
        height: var(--grid-size);
        background-color: var(--bk-05);
        transform: translateY(-50%);
        z-index: 0;
        display: flex;
        align-items: center;
        &:nth-child(even) {
          background-color: var(--bk-10);
        }
        &.active {
          border: solid calc(var(--grid-size) / 2) var(--wt-50);
          box-shadow: 0 0 0.5rem var(--success-color-2);
        }
      }

      .grid_value {
        font-size: 0.7em;
        --shadow-color: var(--wt-60);
        --shadow-size: 1px;
        color: var(--bk-70);
        text-shadow:
          var(--shadow-size) var(--shadow-size) var(--shadow-size) var(--shadow-color),
          var(--shadow-size) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color),
          calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color),
          calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-size) var(--shadow-color);
      }
    }
  }

  .scroll-bar-corner-cursor {
    position: fixed;
    right: var(--gap-1-4);
    bottom: var(--gap-1-4);
    padding: 0;
    margin: 0;

    .scroll-bar-corner-cursor-btn {
      height: 32px;
      width: 32px;
      padding: var(--gap-1-4);
      margin: 0;
      background-color: var(--btn-bg-1);
      outline: none;
      border: solid var(--border-sz-1) var(--bk-30);
      box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
      @include flex-center-col;
      transition: .1s background-color ease;

      &.active {
        background-color: var(--btn-bg-1-active);
      }

      &:hover {
        background-color: var(--btn-bg-1-hover);
      }
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/main.scss";

#creator {
  .top-menus-wrapper {
    @include flex-between-row;
    align-items: flex-start;
    z-index: 9;
    width: 100%;
    // flex-wrap: wrap;
    padding: 0 var(--gap-1-2);

    .top-menus-wrap {
      @include flex-center-row;
      align-items: flex-start;

      &.col {
        @include flex-center-col;
        flex-wrap: wrap;
        flex-grow: 1;
        @include screen-small {
          @include flex-between-row;
        }
      }
    }
  }

  .top-menu-bloc {
    @include flex-center-row;
    justify-content: flex-end;
    flex-wrap: wrap;
      flex-grow: 1;
    * {
      color: var(--bk-70);
    }

    .action-btn {
      position: relative;
      line-height: 0;
      @include flex-center-col;
      height: var(--btn-size);
      width: var(--btn-size);
      background-color: var(--btn-bg-1);
      outline: none;
      border: solid var(--border-sz-1) var(--bk-30);
      box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
      padding: var(--gap-1-4);

      .dropdown-content {
        width: auto;

        .dropdown-item  {
          width: 100%;
          border: none;
          border-bottom: solid var(--border-sz-1) var(--bk-40);
          box-shadow: 0 0 0.25rem var(--wt-40) inset;

          &:last-child {
            border-bottom: none;
          }

          &.file-btn {

            button {
              background-color: transparent;
              border: none;
              cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
            }
            transition: .1s background-color ease;

            &:hover {
              background-color: var(--btn-bg-1-hover);
            }
          }

          .dropdown-item-btn {
            line-height: 0;
            @include flex-center-row;
            height: var(--btn-size);
            width: 100%;
            padding: var(--gap-1-4);

            .text {
              font-size: 0.75em;
              padding: var(--gap-1-4);
              @include text-shadow-1;
              display: flex;
              width: 100%;
            }

            .img-container {
              height: 100%;

              img {
                height: 100%;
              }

            }

            .icon {
              display: flex;
              height: 100%;
            }
          }
        }
      }

      &.text-on-icon {
        .dropdown-item-btn {
          position: relative;
          line-height: 0;
          @include flex-center-col;
          height: var(--btn-size);
          width: var(--btn-size);

          .text {
            position: absolute;
            font-size: 0.75em;
            bottom: 15%;
            @include text-shadow-1;
          }
        }
      }

      .icon {
        font-size: 1rem;
      }

      .cancel-icon {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        font-size: 0.8em;
        color: var(--danger-color-1);
        * {
          color: var(--danger-color-1);
        }
      }

      &.active {
        background-color: var(--btn-bg-1-active);
      }

      &:hover {
        background-color: var(--btn-bg-1-hover);
      }

      &.disabled {
        background-color: var(--btn-bg-1-disabled);
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.dropdown-wrapper {

        ul.menu-dropdown-selector {

          li.dropdown-item.action-btn {
            margin: 0;
            padding: 0;
            margin-left: 0;
            border: none;
            border-bottom: solid var(--border-sz-1) var(--bk-40);

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }

    .actions-group-btns {
      display : flex;
      margin: 0 var(--gap-1-4);

      &.cursor-group-btns {
        display: none;
        @include screen-small {
          display: flex;
        }
      }

      .text-input-container {
        border-top: solid var(--border-sz-1) var(--bk-40);
        border-bottom: solid var(--border-sz-1) var(--bk-40);
        
        input {
          @include flex-center-row;
          text-align: center;
          background-color: transparent;
          border: none;
          height: 100%;
          width: 100%;
          max-width: 3rem;

          &.disabled {
            cursor: not-allowed;
          }
        }
      }

      .action-btn {
        margin:0;
      }
    }

    .action-btn {

      &.dropdown-wrapper {

        .menu-dropdown-selector-btn {
          width: 100%;
          height: 100%;
        }
      }
    }

    .grid-size-options {
      @include flex-center-col;

      button.action-btn {
        height: calc(var(--btn-size) / 2);
        font-size: 0.7em;
        padding: 0;
      }
    }
  }

  .top-menu-container {
    position: absolute;
    left: 0;
    top: 0;
  }
      
  .tools-list-container {

    .group_menu {
      position: relative;
    }

    button {
      line-height: 0;
      @include flex-center-col;
      height: var(--btn-size);
      width: var(--btn-size);
      background-color: var(--btn-bg-1);
      outline: none;
      border: solid var(--border-sz-1) var(--bk-30);
      box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
      padding: var(--gap-1-4);
      transition: .1s background-color ease;

      &.show-btn {
        margin-bottom: var(--gap-1-4);
        @include screen-small {
          &:last-child {
            margin-bottom: var(--gap-1-4);
          }
        }
      }

      &.valid_group-btn {
        --size : calc(var(--gap-1-1) * 3);
        position: absolute;
        right: calc((var(--size) * -1.5));
        top: calc(var(--size) / -2);
        background-color: transparent;
        outline: none;
        border: none;
        visibility: hidden;
        height: var(--size);
        width: var(--size);
        border-radius: 50%;
        box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
        transform: translate(0, calc(100% / 3)) scale(0.9);
        transition: .1s background-color ease, .1s transform ease;

        &.active {
          visibility: visible;
          background-color: transparent;
        }
      
        &:hover {
          background-color: var(--btn-bg-1-active);
          transform: translate(0, calc(100% / 3)) scale(1.1);
        }
      }
    }

    li.dropdown-item {
      box-shadow: 0 0 0.25rem var(--wt-40) inset;
      background-color: var(--btn-bg-1);
      transition: .1s background-color ease;

      &.active {
        background-color: var(--btn-bg-1-active);
      }
      
      &:hover {
        background-color: var(--btn-bg-1-hover);
      }
      
      &.disabled {
        background-color: var(--btn-bg-1-disabled);
        opacity: 0.5;
        cursor: not-allowed;
      }

      .dropdown-item-btn {
        border: none;
      }
      .img-container {
        height: 100%;
        width: 100%;
        img {
          object-fit: contain;
          height: 100%;
          width: auto;
        }
      }
    }
    li.dropdown-item.action-btn {
      margin: 0;
      padding: 0;
    }

    .tools-action-btns-container {
      visibility: hidden;
      transform: scale(0.8);
      opacity: 0;
      transition: transform 0.1s ease, opacity 0.1s ease, visibility 0.1s ease;
      @include flex-center-col;
      position: fixed;
      left: calc(var(--btn-size) + var(--gap-1) + var(--gap-1-4));
      top: calc(var(--header-height) + (var(--btn-size) * 2) + var(--gap-1) + var(--gap-1-4));

      &.show {
        visibility: visible;
        opacity: 1;
        transform: scale(1);
      }

      .actions-wrapper {
        background-color: var(--wt-90);
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 0.25rem var(--wt-90) inset, 0 0 0.25rem var(--bk-50);

        * {
          color: var(--bk-70);
        }

        .tools-actions-title-container {
          @include flex-between-row;
          font-size: 0.9em;
          padding: var(--gap-1-4);
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;

          .icon.text-icon {
            height: calc(var(--btn-size) - var(--gap-1-2));
            width: calc(var(--btn-size) - var(--gap-1-2));
          }

          .tool-action-btn,
          button {
            height: calc(var(--btn-size) - var(--gap-1-4));
            width: calc(var(--btn-size) - var(--gap-1-4));

            &.hide-btn {
              background-color: transparent;
              border: none;
              box-shadow: none;

              .tools-title-close-icon {
                padding: var(--gap-1-2);
              }
              
              .icon {
                transition: 0.1s transform ease;
                transform: scale(1);
              }
            
              &:hover {
                .icon {
                  transform: scale(1.4);
                }
              }
            }

            &.active {
              background-color: var(--btn-bg-1-active);
            }
            
            &.disabled {
              background-color: var(--btn-bg-1-disabled);
              opacity: 0.5;
              cursor: not-allowed;
            }
          }

          .icon {
            padding: var(--gap-1-4);
            @include flex-center-row;
            height: var(--btn-size);
            width: var(--btn-size);
          }

          .tootls-title {
            @include flex-between-row;
            width: 100%;

            .tool-content-title-btns {
              @include flex-center-row;
              margin-right: var(--gap-1-4);

            }

            .text {
              padding: var(--gap-1-2);
              background-color: var(--bk-15);
              width: 100%;
            }
          }
        }

        .tools-actions-box {
          margin: var(--gap-1-4) auto;
            
          .tool-content-title-btns {
            @include flex-center-row;
          }

          .text-input-container {
            @include flex-center-row;
            border-top: solid var(--border-sz-1) var(--bk-40);
            border-bottom: solid var(--border-sz-1) var(--bk-40);
            height: var(--btn-size);
        
            input {
              @include flex-center-row;
              text-align: center;
              height: var(--btn-size);
              width: calc(var(--btn-size) * 1.5);
              border: none;
              background-color: transparent;
            }

            .text-suffix {
              margin-right: var(--gap-1-4);
              width: 1rem;
              font-size: 0.9em;
            }
          }

          .tools-actions-box-title-container {
            padding: var(--gap-1-4);
            margin: 0 var(--gap-1-4);
            border-top: solid var(--border-sz-1) var(--bk-10);
            @include flex-between-row;
            font-size: 0.9em;

            &.list-title-container {
              margin: 0 var(--gap-1-4);
              padding: 0;
            }

            .tools-actions-box-title {
              @include flex-between-row;
              width: 100%;

              &.space-w {
                margin: 0 var(--gap-1-4);
              }

              .icon {
                padding: var(--gap-1-2);
                height: var(--btn-size);
                width: var(--btn-size);
                @include flex-center-row;

                img.img-icon.divdraw {
                  width: auto;
                  height: 100%;
                }
              }
              .text {
                padding: var(--gap-1-2);
                text-align: left;
                height: 100%;
                width: 100%;
              }
            }
          }

          .tools-actions-box-row {
            @include flex-between-row;
            margin: var(--gap-1-4);

            &.colors_list-row {
              flex-direction: column;

              ul.colors-list {
                margin: 0;
              }
            }

            &.align-right {
              justify-content: flex-end;
            }
            &.align-left {
              justify-content: flex-start;

              &.colors_list-row {
                align-items: flex-start;
              }
            }
            &.align-center {
              justify-content: center;
            }

            .color-scroll-btn {
              padding: var(--gap-1-2);
            }
          }


          .tool-content {
            @include flex-end-row;

            &.full-row {
              width: 100%;
            }

            &.content-left {
              justify-content: flex-start;
            }

            &.grouped-content {
              box-shadow: 0 0 2px var(--bk-50) inset;
            }

            .tool-content-title-btns {
              @include flex-center-row;
            }

            .tool-content-title {
              @include flex-center-row;
              line-height: 0;
              width: 100%;

              &.space-w {
                margin: 0 var(--gap-1-2);
              }

              &.space-r {
                margin-right: var(--gap-1-2);
              }

              &.space-l {
                margin-left: var(--gap-1-2);
              }


              .text-container {
                @include flex-center-row;
                width: 100%;

                .icon {
                  @include flex-center-row;
                  height: calc(var(--btn-size) - var(--gap-1-4));
                  width: calc(var(--btn-size) - var(--gap-1-4));
                  padding: var(--gap-1-4);
                  border: solid 1px var(--bk-15);
                }

                span.text {
                  display: none;
                  @include screen-small {
                    display: flex;
                  }
                  margin-left: var(--gap-1-2);
                }
              }
            }

            .tool-content-btns {
              @include flex-end-row;
            }

            .tool-checkbox-container {
              height: var(--btn-size);
              width: var(--btn-size);
              @include flex-center-row;

              .tool-checkbox {
                padding: var(--gap-1);
              }
            }
          
            .tool-range-container {
              width: 100%;
              padding: 0 var(--gap-1);

              input {
                @include flex-center-row;
                text-align: center;
                height: var(--btn-size);
                width: 100%;
                border: none;
                background-color: transparent;
              }

            }

            ul.colors-list {
              @include flex-start-row;
              flex-direction: row-reverse;
              flex-wrap: wrap;
              margin: auto;
              width: calc((var(--btn-size) * 6) + 12px);
              max-height: calc((var(--btn-size) * 2) + 4px);
              overflow-y: auto;

              .tool-content-btns {

                .color-btn {
                  margin-left: 1px;
                }

                input.color-picker-btn {
                  background-color: var(--btn-bg-1);
                  outline: none;
                  border: solid var(--border-sz-1) var(--bk-30);
                  box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
                  width: calc(var(--btn-size) * 2 + 2px);
                  margin-left: 1px;
                }
              }

              li {
                display: flex;
                padding: 1px;

                button {
                  border: solid var(--border-sz-1) var(--bk-30);
                  box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.2), 0 0 0.25rem rgba(255, 255, 255, 0.4) inset;
                  transition: .1s transform ease;

                  &:hover {
                    transform: scale(1.1);
                  }
                }
              }
            }

            ul.group_elements-list {
              @include flex-center-col;

              li {
                width: 100%;
                @include flex-between-row;

                button.group_element-btn {
                  width: 100%;
                }
              }
            }

          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
    button {
      transition: .1s background-color ease;

      &.active {
        background-color: var(--btn-bg-1-active);
      }
      
      &:hover {
        background-color: var(--btn-bg-1-hover);
      }
      
      &.disabled {
        background-color: var(--btn-bg-1-disabled);
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    * {
      @include text-shadow-2;
    }

    #group_elements_menu {

      .group_elements-list-box {
              width: 100%;

        * {
          --shadow-color: var(--wt-60);
          --shadow-size: 1px;
          --text-shadow-1: var(--shadow-size) var(--shadow-size) var(--shadow-size) var(--shadow-color), var(--shadow-size) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-size) var(--shadow-color);
          text-shadow: var(--text-shadow-1);
        }

        button.group_element-btn {
          height: calc(var(--btn-size) - var(--gap-1-2));
          width: 100%;
        }

        button.group_element-delete-btn {
          height: calc(var(--btn-size) - var(--gap-1-2));
          width: var(--btn-size);
        }

        .tools-actions-box-title-container {
          padding: 0 var(--gap-1-4);
          background-color: var(--bk-15);

          &.list-title-container {
            margin: 0 var(--gap-1-4);
            padding: 0;
          }

          .tools-actions-box-title {
            border: solid var(--border-sz-1) var(--bk-40);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: var(--btn-size);

            .text {
              background-color: transparent;
            }
          }

          .show-list-btn {
            height: var(--btn-size);
            width: var(--btn-size);
            padding: var(--gap-1-2);
          }
        }

        .tools-actions-box-row {
          margin: 0 var(--gap-1-4);

          &.colors_list-row {
            flex-direction: column;

          }
          
          &.colors_list-row.align-left {
            align-items: flex-start;
          }

          .color-scroll-btn {
            padding: var(--gap-1-2);
          }
        }

        .tools-actions-box-row.align-left.colors_list-row {
          align-items: flex-start !important;
        }
      }
    }
  }
  .dropdown-wrapper.action-btn {
    padding: 0;

    .toogler-btn {
      padding: var(--gap-1-4);

      .img-container {
        height: 100%;
        width: 100%;

        img {
          object-fit: contain;
          height: 100%;
          width: auto;
        }
      }
    }
  }

  // common
  input.color-picker-btn {
    background-color: var(--btn-bg-1);
    outline: none;
    border: solid var(--border-sz-1) var(--bk-30);
    box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
    
  }
}

.icon {
  height: 100%;
  
  img.img-icon.divdraw {
    object-fit: contain;
    width: auto;
    height: 100%;
  }
}

.menu-dropdown-btn.dropdown-file-btn,
.menu-dropdown-btn.dropdown-cursor-btn {
  position: relative;

  .menu-dropdown-btn-corner{
    height: 0.5rem;
    width: 0.5rem;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    border-top: 0 solid transparent;
    border-bottom: 0.5rem solid transparent; 
    border-right:0.5rem solid var(--bk-80);
  }
}

</style>
