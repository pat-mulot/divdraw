<template>
  <div
    :class="`
      tools-action-btns-container${ activeClass }
  `">
    <div class="actions-wrapper">
      <div class="tools-actions-title-container">
        <h3 v-if="showMenu" class="tootls-title">
            <span class="text">
              {{ $t("document_tool") }}
            </span>
        </h3>
        <button
          v-if="showMenu"
          class="hide-btn tootls-title-btn"
          @click.prevent="handleClickOnCloseMenu"
          @touchstart.prevent="handleClickOnCloseMenu"
        >
          <div class="icon tools-title-close-icon">
            <img :src="require(`@/assets/images/icons/cross_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
      <!-- -------------- BOX -------------- -->
      <!-- Document frame size -->
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <h4 class="tools-actions-box-title">
            <div class="icon">
              <img :src="require(`@/assets/images/icons/crop_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
            <span class="text">
              {{ $t("document_frame_size") }}
            </span>
          </h4>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content">
            <h5 class="tool-content-title space-r">
              <span class="text-container">
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/height_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
                <span class="text">
                  {{ $t("document_height") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnDocumentSize(-1, 'height')"
                @touchstart.prevent="handleClickOnDocumentSize(-1, 'height')"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${this.getContainerSize?.height ?? 0}`"
                  placeholder="---"
                  @blur="handleTypeDocumentHeight"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnDocumentSize(1, 'height')"
                @touchstart.prevent="handleClickOnDocumentSize(1, 'height')"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content">
            <h5 class="tool-content-title space-r">
              <span class="text-container">
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/width_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
                <span class="text">
                  {{ $t("document_width") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnDocumentSize(-1, 'width')"
                @touchstart.prevent="handleClickOnDocumentSize(-1, 'width')"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${this.getContainerSize?.width ?? 0}`"
                  placeholder="---"
                  @blur="handleTypeDocumentWidth"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnDocumentSize(1, 'width')"
                @touchstart.prevent="handleClickOnDocumentSize(1, 'width')"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- -------------- BOX -------------- -->
      <!-- document bg color -->
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <h4 class="tools-actions-box-title">
            <div class="icon">
              <img :src="require(`@/assets/images/icons/color_palet_nb_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
            <span class="text">
              {{ $t("color_element") }}
            </span>
          </h4>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-left colors_list-row">
          <div class="tool-content colors-tool-content content-left">
            <ul class="colors-list" ref="background_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(0,3)" :key="colorIndex" >
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnColorBtn(color)"
                  @touchend.prevent="handleClickOnColorBtn(color)"
                ></button>
              </li>
              <li class="tool-content-btns">
                <button
                  :style="`background-color: transparent;`"
                  class="color-btn"
                  @click.prevent="handleClickOnColorBtn('transparent')"
                  @touchend.prevent="handleClickOnColorBtn('transparent')"
                >
                  <div class="icon">
                    <img :src="require(`@/assets/images/icons/not_allowed_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <input
                  class="color-picker-btn"
                  type="color"
                  @input="handleSelectFrameBgColor"
                  :value="frameBgColor ?? 'transparent'"
                />
              </li>
            </ul>
          </div>
          <div class="tool-content colors-tool-content">
            <ul class="colors-list" ref="background_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(3)" :key="colorIndex" >
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnColorBtn(color)"
                  @touchend.prevent="handleClickOnColorBtn(color)"
                ></button>
              </li>
            </ul>
            <div
              :class="`colors-scroller-container`"
              v-if="showScrollButton"
            >
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('background_colors_list', -1)"
                @touchstart.prevent="handleClickOnScrollColors('background_colors_list', -1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/chevron_top_dbl_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('background_colors_list', 1)"
                @touchstart.prevent="handleClickOnScrollColors('background_colors_list', 1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/chevron_bottom_dbl_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content">
            <h5 class="tool-content-title space-r">
              <span class="text-container">
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/opacity_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
                <span class="text">
                  {{ $t("opacity_element") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="rotate-ccw-btn tool-action-btn"
                @click.prevent="handleClickOnOpacity(-1)"
                @touchstart.prevent="handleClickOnOpacity(-1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${ frameOpacity * 100 }`"
                  placeholder="--"
                  @blur="handleTypeOpacity"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="rotate-cw-btn tool-action-btn"
                @click.prevent="handleClickOnOpacity(1)"
                @touchstart.prevent="handleClickOnOpacity(1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content-btns">
            <input
              class="range-btn opacity-range-btn"
              type="range"
              @input.prevent="handleRangeOpacity"
              min="0"
              max="100"
              :value="`${ frameOpacity * 100 }`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentMenu",
  props: {
    frameBgColor: String,
    oppenedMenu: String,
    frameOpacity: Number,
    colorsList: Array,
    containerSize: {},
  },

  data() {
    return {
      showMenu: false,
      activeClass: "",
    };
  },

  watch: {
    oppenedMenu: function() {
      if (this.oppenedMenu === this.$options.name) {
        this.activeClass = " show";
        this.showMenu = true;
      } else {
        this.activeClass = "";
        setTimeout(()=>{
          this.showMenu = false;
        }, 100)
      }
    },
  },

  computed: {
    getContainerSize() {
      return this.containerSize;
    },

    showScrollButton() {
      return this.colorsList.length > 15;
    },
  },
  methods: {

    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    handleClickOnScrollColors(currentRef, dirValue) {
      const currentColorsList = this.$refs[currentRef];
      currentColorsList.scrollTop += (34 * dirValue);
    },

    handleClickOnCloseMenu() {
      this.activeClass = "";
      setTimeout(()=>{
        this.$emit("close-side-menus", "");
      }, 100)
    },

    handleSelectFrameBgColor(evt) {
      evt.preventDefault();
      let value = evt.currentTarget.value;
      this.$emit("set-frame-bg-color", value);
    },

    handleClickOnColorBtn(color) {
      this.$emit("set-frame-bg-color", color);
    },

    handleClickOnDocumentSize(dirValue, type) {
      this.$emit("document-size", {
        value: this.containerSize[type] + (dirValue * 16),
        type: type,
      });
    },

    handleTypeDocumentHeight(evt) {
      evt.preventDefault();
      let value = parseInt(evt.currentTarget.value);
      this.$emit("document-size", {
        value: value,
        type: "height",
      });
      this.$emit("menu-input-focus", true);
    },

    handleTypeDocumentWidth(evt) {
      evt.preventDefault();
      let value = parseInt(evt.currentTarget.value);
      this.$emit("document-size", {
        value: value,
        type: "width",
      });
      this.$emit("menu-input-focus", true);
    },

    handleRangeOpacity(evt) {
      evt.preventDefault();
      let value = Number(evt.currentTarget.value);
      if (!isNaN(value)) {
        this.$emit("set-frame-opacity", value);
      }
    },

    handleClickOnOpacity(value) {
      let valueToSet = (this.frameOpacity * 100) + value;
      if (!isNaN(valueToSet)) {
        if (valueToSet > 100) valueToSet = 100;
        if (valueToSet < 0) valueToSet = 0;
        this.$emit("set-frame-opacity", valueToSet);
      }
    },

    handleTypeOpacity(evt) {
      evt.preventDefault();
      this.$refs["textInput"].focus();
      let value = Number(evt.currentTarget.value);
      if (!isNaN(value)) {
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        this.$emit("set-frame-opacity", value);
        this.$emit("menu-input-focus", true);
      }
    },
  },
};
</script>

