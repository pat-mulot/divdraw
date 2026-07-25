<template>
  <div
    :class="`tools-action-btns-container${ getActiveClass }`"
  >
    <div class="actions-wrapper">

      <div class="tools-actions-title-container">
        <h3 v-if="showMenu" class="tootls-title">
          <span class="text">
            {{ $t("color_menu_title") }}
          </span>
        </h3>
        <button
          v-if="showMenu"
          :class="`hide-btn tootls-title-btn`"
          @click.prevent="handleClickOnCloseMenu"
          @touchstart.prevent="handleClickOnCloseMenu"
        >
          <div class="icon tools-title-close-icon">
            <img :src="require(`@/assets/images/icons/cross_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
      <!-- -------------- BOX -------------- -->
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <div class="tool-content-title-btns">
            <button
              :class="`shape-btn`"
              @click.prevent="handleClickOnInvertColor"
              @touchstart.prevent="handleClickOnInvertColor"
            >
              <div class="icon">
              <img :src="require(`@/assets/images/icons/color_palet_nb_icon.png`) ?? ''" alt="" class="img-icon divdraw">
              </div>
            </button>
          </div>
          <h4 class="tools-actions-box-title">
            <span class="text">
              {{ $t("element_color") }}
            </span>
          </h4>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-left colors_list-row">
          <div class="tool-content colors-tool-content content-left">
            <ul class="colors-list" ref="element_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(0,3)" :key="colorIndex">
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnElementColorBtn(color)"
                  @touchend.prevent="handleClickOnElementColorBtn(color)"
                ></button>
              </li>
              <li class="tool-content-btns">
                <button
                  :style="`background-color: transparent;`"
                  class="color-btn"
                  @click.prevent="handleClickOnElementColorBtn('transparent')"
                  @touchend.prevent="handleClickOnElementColorBtn('transparent')"
                >
                  <div class="icon">
                    <img :src="require(`@/assets/images/icons/not_allowed_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <input
                  class="color-picker-btn color-btn"
                  type="color"
                  @input="handleSelectColorElement"
                  :value="currentSelectedItem?.css?.bg ?? '#3465a4'"
                />
              </li>
            </ul>
          </div>
          <div class="tool-content colors-tool-content">
            <ul class="colors-list" ref="element_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(3)" :key="colorIndex">
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnElementColorBtn(color)"
                  @touchend.prevent="handleClickOnElementColorBtn(color)"
                ></button>
              </li>
            </ul>
            <div
              :class="`colors-scroller-container`"
              v-if="showScrollButton"
            >
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('element_colors_list', -1)"
                @touchstart.prevent="handleClickOnScrollColors('element_colors_list', -1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/chevron_top_dbl_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('element_colors_list', 1)"
                @touchstart.prevent="handleClickOnScrollColors('element_colors_list', 1)"
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
                <span class="text">{{ $t("opacity_element") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="rotate-ccw-btn tool-action-btn"
                @click.prevent="handleClickOnOpacityElement(-1)"
                @touchstart.prevent="handleClickOnOpacityElement(-1)"
              >
                <div class="icon tools-title-close-icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  :value="`${ currentSelectedItem?.css?.opacity * 100 }`"
                  placeholder="--"
                  @blur="handleTypeOpacity"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="rotate-cw-btn tool-action-btn"
                @click.prevent="handleClickOnOpacityElement(1)"
                @touchstart.prevent="handleClickOnOpacityElement(1)"
              >
                <div class="icon tools-title-close-icon">
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
              @input.prevent="handleRangeOpacityElement"
              min="0"
              max="100"
              :value="`${ currentSelectedItem?.css?.opacity * 100 }`"
            />
          </div>
        </div>
      </div>
      <!-- -------------- BOX -------------- -->
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <div class="tool-content-title-btns">
            <button
              :class="`shape-btn${ this.getBorderActiveClass }`"
              @click.prevent="handleClickOnBorderEnableBtn"
              @touchstart.prevent="handleClickOnBorderEnableBtn"
            >
              <div class="icon">
                <img :src="require(`@/assets/images/icons/borders/border_full_icon.png`) ?? ''" alt="" class="img-icon divdraw">
              </div>
            </button>
            <button
              :class="`shape-btn${ this.getBorderOnlyActiveClass }`"
              @click.prevent="handleClickOnBorderOnlyEnable"
              @touchstart.prevent="handleClickOnBorderOnlyEnable"
            >
              <div class="icon">
                <img :src="require(`@/assets/images/icons/borders/border_only_icon.png`) ?? ''" alt="" class="img-icon divdraw">
              </div>
            </button>
          </div>
          <h4 class="tools-actions-box-title space-w">
            <span class="text">
              {{ $t("element_borders") }}
            </span>
          </h4>
          <div class="tool-content-title-btns">
            <div class="tool-content-btns">
              <div class="dropdown-borders-btn menu-dropdown-btn">
                <baseDropdown
                  :class="`action-btn`"
                  :img="getCurrentBordersSides? require(`@/assets/images/icons/borders/sides/border_${ getCurrentBordersSides }icon.png`) : ''"
                  :btnClass="'border_selector-btn divdraw'"
                  :id="'border_type-dropdown'"
                  :multiple="true"
                  :disabled="!getBorderEnabled"
                  >
                  <BaseDropdownContent
                    class="fix-center border"
                    id="border_selector"
                  >
                    <BaseDropdownItem
                      :name="`border_all`"
                      :value="`border_all`"
                      :active="this.getBorderTypes.includes('all')"
                      @click.prevent="handleClickOnBorderSideType('all')"
                      @touchstart.prevent="handleClickOnBorderSideType('all')"
                      :class="`action-btn divdraw`"
                      :img="require(`@/assets/images/icons/borders/border_all_icon.png`) ?? ''"
                    />
                    <BaseDropdownItem
                      :name="`border_top`"
                      :value="`border_top`"
                      :active="this.getBorderTypes.includes('top')"
                      @click.prevent="handleClickOnBorderSideType('top')"
                      @touchstart.prevent="handleClickOnBorderSideType('top')"
                      :class="`action-btn divdraw`"
                      :img="require(`@/assets/images/icons/borders/sides/border_top_icon.png`) ?? ''"
                    />
                    <BaseDropdownItem
                      :name="`border_right`"
                      :value="`border_right`"
                      :active="this.getBorderTypes.includes('right')"
                      @click.prevent="handleClickOnBorderSideType('right')"
                      @touchstart.prevent="handleClickOnBorderSideType('right')"
                      :class="`action-btn divdraw`"
                      :img="require(`@/assets/images/icons/borders/sides/border_right_icon.png`) ?? ''"
                    />
                    <BaseDropdownItem
                      :name="`border_bottom`"
                      :value="`border_bottom`"
                      :active="this.getBorderTypes.includes('bottom')"
                      @click.prevent="handleClickOnBorderSideType('bottom')"
                      @touchstart.prevent="handleClickOnBorderSideType('bottom')"
                      :class="`action-btn divdraw`"
                      :img="require(`@/assets/images/icons/borders/sides/border_bottom_icon.png`) ?? ''"
                    />
                    <BaseDropdownItem
                      :name="`border_left`"
                      :value="`border_left`"
                      :active="this.getBorderTypes.includes('left')"
                      @click.prevent="handleClickOnBorderSideType('left')"
                      @touchstart.prevent="handleClickOnBorderSideType('left')"
                      :class="`action-btn divdraw`"
                      :img="require(`@/assets/images/icons/borders/sides/border_left_icon.png`) ?? ''"
                    />
                  </BaseDropdownContent>
                </baseDropdown>
                <div class="menu-dropdown-btn-corner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- -------------- BOX -------------- -->
      <div class="tools-actions-box">
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content">
            <h5 class="tool-content-title space-r">
              <span class="text-container">
                <span
                  id="icon-border-size-container"
                >
                  <div class="icon">
                    <img :src="require(`@/assets/images/icons/borders/border_size_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </span>
                <span class="text">{{ $t("border_width_menu") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnBorderBtn(-1)"
                @touchstart.prevent="handleClickOnBorderBtn(-1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  class=""
                  placeholder="--"
                  :value="`${parseInt(currentSelectedItem?.border_width) ?? 8}`"
                  @blur="handleTypeBorderWidth"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnBorderBtn(1)"
                @touchstart.prevent="handleClickOnBorderBtn(1)"
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
      <div class="tools-actions-box">
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-left colors_list-row">
          <div class="tool-content colors-tool-content content-left">
            <ul class="colors-list" ref="borders_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(0,3)" :key="colorIndex" >
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnBorderColorBtn(color)"
                  @touchend.prevent="handleClickOnBorderColorBtn(color)"
                ></button>
              </li>
              <li class="tool-content-btns">
                <button
                  :style="`background-color: transparent;`"
                  class="color-btn"
                  @click.prevent="handleClickOnBorderColorBtn('transparent')"
                  @touchend.prevent="handleClickOnBorderColorBtn('transparent')"
                >
                  <div class="icon">
                    <img :src="require(`@/assets/images/icons/not_allowed_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <input
                  class="color-picker-btn"
                  ref="textInput"
                  type="color"
                  @input="handleSelectColor"
                  :value="currentSelectedItem?.border_color ?? '#3465a4'"
                />
              </li>
            </ul>
          </div>
          <div class="tool-content colors-tool-content">
            <ul class="colors-list" ref="borders_colors_list">
              <li v-for="(color, colorIndex) in colorsList.slice(3)" :key="colorIndex" >
                <button
                  :style="`background-color: ${ color };`"
                  class="color-btn"
                  @click.prevent="handleClickOnBorderColorBtn(color)"
                  @touchend.prevent="handleClickOnBorderColorBtn(color)"
                ></button>
              </li>
            </ul>
            <div
              :class="`colors-scroller-container`"
              v-if="showScrollButton"
            >
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('borders_colors_list', -1)"
                @touchstart.prevent="handleClickOnScrollColors('borders_colors_list', -1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/chevron_top_dbl_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <button 
                :class="`color-scroll-btn`"
                @click.prevent="handleClickOnScrollColors('borders_colors_list', 1)"
                @touchstart.prevent="handleClickOnScrollColors('borders_colors_list', 1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/chevron_bottom_dbl_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseDropdown from "@/components/dropdown/base-dropdown/BaseDropdown.vue";
import BaseDropdownContent from "@/components/dropdown/base-dropdown/BaseDropdownContent.vue";
import BaseDropdownItem from "@/components/dropdown/base-dropdown/BaseDropdownItem.vue";

export default {
  name: "BorderElementsMenu",
  components: {
    baseDropdown,
    BaseDropdownContent,
    BaseDropdownItem,
  },
  props: {
    currentSelectedItem: Object,
    oppenedMenu: String,
    colorsList: Array,
  },

  data() {
    return {
      showMenu: false,
      activeClass: "",
      maxWidth : 256,
      minWidth : 2,
      // borderColor : "",
      // bgColor : "",
    };
  },

  // mounted() {
  //   this.bgColor = this.currentSelectedItem.css.bg;
  //   this.borderColor = this.currentSelectedItem.border_color;
  // },

  watch: { 
    oppenedMenu: function() {
      if (this.oppenedMenu === this.$options.name && this.currentSelectedItem.shape !="line") {
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

    showScrollButton() {
      return this.colorsList.length > 15;
    },

    getCurrentBordersSides() {
      let borderIconNameToReturn = "";
      if (this.currentSelectedItem?.border_types?.includes("all")) {
        return "top_right_bottom_left_";
      } else {
        if (this.currentSelectedItem?.border_types?.includes("top")) {
          borderIconNameToReturn += "top_";
        }
        if (this.currentSelectedItem?.border_types?.includes("right")) {
          borderIconNameToReturn += "right_";
        }
        if (this.currentSelectedItem?.border_types?.includes("bottom")) {
          borderIconNameToReturn += "bottom_";
        }
        if (this.currentSelectedItem?.border_types?.includes("left")) {
          borderIconNameToReturn += "left_";
        }
        return borderIconNameToReturn;
      }
    },

    getActiveClass() {
      if (
        this.currentSelectedItem
        && !this.currentSelectedItem.isImg
        && !this.currentSelectedItem.merged
      ) {
        return this.activeClass;
      }
      return "";
    },

    getBorderTypes() {
      return this.currentSelectedItem?.border_types ?? [];
    },

    getBorderEnabled() {
      return (this.currentSelectedItem?.border_enabled || this.currentSelectedItem?.border_only_enabled);
    },

    getBorderActiveClass() {
      if (this.currentSelectedItem) {
        if (this.currentSelectedItem.border_enabled) {
          return " active";
        }
      }
      return "";
    },

    getBorderOnlyActiveClass() {
      if (this.currentSelectedItem) {
        if (this.currentSelectedItem.border_only_enabled) {
          return " active";
        }
      }
      return "";
    },
  },

  emits: [
    "set-element-border",
    "set-element-border-enable",
    "set-border-color",
    "set-border-width",
    "set-border-type",
    "close-side-menus",
    "set-element-border-only-enable",
    "color-element",
    "opacity-element",
  ],

  methods: {

    handleClickOnScrollColors(currentRef, dirValue) {
      const currentColorsList = this.$refs[currentRef];
      currentColorsList.scrollTop += (34 * dirValue);
    },

    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    handleFocusTextInput() {
      this.$emit("menu-input-focus", true);
    },
    
    handleClickOnCloseMenu() {
      this.activeClass = "";
      setTimeout(()=>{
        this.$emit("close-side-menus", "");
      }, 100)
    },

    handleClickOnBorderSideType(type) {
      this.$emit("set-border-type", type);
    },

    handleClickOnBorderBtn(dir) {
      let value = this.currentSelectedItem.border_width + (dir * 2);
      if (this.currentSelectedItem) {
        this.$emit("set-border-width", this.getBorderValueFormated(value));
      }
    },

    handleTypeBorderWidth(evt) {
      evt.preventDefault();
      let value = parseInt(evt.currentTarget.value);
      this.$emit("set-border-width", this.getBorderValueFormated(value));
      this.$emit("menu-input-focus", true);
    },

    getBorderValueFormated(value) {
      if (value > this.maxWidth) value = this.maxWidth;
      if (value < this.minWidth) value = this.minWidth;
      return value;
    },

    handleClickOnBorderEnableBtn() {
      if (this.currentSelectedItem) {
        this.$emit("set-element-border-enable");
      }
    },

    handleClickOnBorderOnlyEnable() {
      if (this.currentSelectedItem) {
        this.$emit("set-element-border-only-enable");
      }
    },

    handleSelectColor(evt) {
      evt.preventDefault();
      let color = evt.currentTarget.value;
      // this.borderColor = color;
      this.$emit("set-border-color", color);
    },

    handleClickOnBorderColorBtn(color) {
      // this.borderColor = color;
      this.$emit("set-border-color", color);
    },

    handleRangeOpacityElement(evt) {
      evt.preventDefault();
      let value = Number(evt.currentTarget.value);
      if (!isNaN(value)) {
        this.$emit("opacity-element", value);
      }
    },

    handleClickOnOpacityElement(value) {
      value = Number(value) * this.rate;
      let valueToSet = (this.currentSelectedItem.css.opacity * 100) + value;
      if (!isNaN(valueToSet)) {
        if (valueToSet > 100) valueToSet = 100;
        if (valueToSet < 0) valueToSet = 0;
        this.$emit("opacity-element", valueToSet);
      }
    },

    handleTypeOpacity(evt) {
      evt.preventDefault();
      this.$refs["textInput"].focus();
      let value = Number(evt.currentTarget.value);
      if (!isNaN(value)) {
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        this.$emit("opacity-element", value);
        this.$emit("menu-input-focus", true);
      }
    },

    handleSelectColorElement(evt) {
      evt.preventDefault();
      let color = evt.currentTarget.value;
      // this.bgColor = color;
      this.$emit("color-element", color);
    },

    handleClickOnElementColorBtn(color) {
      // this.bgColor = color;
      this.$emit("color-element", color);
    },

    handleClickOnInvertColor() {
      const bgColor = this.currentSelectedItem.css.bg;
      const borderColor = this.currentSelectedItem.border_color;
      this.$emit("color-element", borderColor);
      this.$emit("set-border-color", bgColor);
    },
  },
  
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.tools-action-btns-container {
  .actions-wrapper {
    #icon-border-size-container {
      @include flex-center-col;
      height: var(--btn-size);
      width: var(--btn-size);

      .icon {
        padding: var(--gap-1-2);
      }
      
    }
  }

  .square-bordered-icon {
    background-color: var(--bk-40);
    border: solid 0.2rem var(--bk-70);
  }

  .border-icon {
    border: solid 0.2rem var(--bk-70);
  }

  .square-bordered-icon,
  .border-icon {
    display: flex;
    height: 1em;
    width: 1em;
    border-radius: 2px;
  }

  .shapes-btns-wrap {
    @include flex-center-row;
    button {
      margin-right: calc(var(--gap) / 4);

      &:last-child {
        margin: 0;
      }
    }
  }

  .icon-round-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--btn-size);
    width: var(--btn-size);

    .icon-round-left_top,
    .icon-round-top_right,
    .icon-round-right_bottom,
    .icon-round-bottom_left {
      height: calc(var(--btn-size) * 0.4);
      width: calc(var(--btn-size) * 0.4);
      background-color: var(--base-color-1);
    }

    .icon-round-left_top {
      border-top-left-radius: 100%;
    }

    .icon-round-top_right {
      border-top-right-radius: 100%;
    }

    .icon-round-bottom_left {
      border-bottom-left-radius: 100%;
    }

    .icon-round-right_bottom {
      border-bottom-right-radius: 100%;
    }

    .icon-round-left {
      border-left: solid calc(var(--btn-size) * 0.4 * 0) transparent;
      border-right: solid calc(var(--btn-size) * 0.4 * 1) transparent;
      border-bottom: solid calc(var(--btn-size) * 0.4 * 1) var(--base-color-1);
    }

    .icon-round {
      border-left: solid calc(var(--btn-size) * 0.4 * 0.5) transparent;
      border-right: solid calc(var(--btn-size) * 0.4 * 0.5) transparent;
      border-bottom: solid calc(var(--btn-size) * 0.4 * 1) var(--base-color-1);
    }
  }

  .icon-triangle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--btn-size);
    width: var(--btn-size);

    .icon-triangle-right {
      border-left: solid calc(var(--btn-size) * 0.4 * 1) transparent;
      border-right: solid calc(var(--btn-size) * 0.4 * 0) transparent;
      border-bottom: solid calc(var(--btn-size) * 0.4 * 1) var(--base-color-1);
    }

    .icon-triangle-left {
      border-left: solid calc(var(--btn-size) * 0.4 * 0) transparent;
      border-right: solid calc(var(--btn-size) * 0.4 * 1) transparent;
      border-bottom: solid calc(var(--btn-size) * 0.4 * 1) var(--base-color-1);
    }

    .icon-triangle {
      border-left: solid calc(var(--btn-size) * 0.4 * 0.5) transparent;
      border-right: solid calc(var(--btn-size) * 0.4 * 0.5) transparent;
      border-bottom: solid calc(var(--btn-size) * 0.4 * 1) var(--base-color-1);
    }
  }
}
</style>

<style lang="scss" >
@import "@/assets/scss/main.scss";

#border_type-dropdown {

  li.dropdown-item.action-btn {
    padding: 0.25rem;

    &:last-child {
      border-bottom: none;
    }

    .dropdown-item-btn {
      display: flex;
      border: solid 1px var(--bk-70);
      height: var(--btn-size);
      width: var(--btn-size);
      padding: var(--gap-1-4);
    }
  }
}

.menu-dropdown-btn {
  position: relative;

  .menu-dropdown-btn-corner {
    height: 0.4rem;
    width: 0.4rem;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    border-top: 0 solid transparent;
    border-bottom: 0.4rem solid transparent; 
    border-right:0.4rem solid var(--bk-80);
  }
}
</style>
