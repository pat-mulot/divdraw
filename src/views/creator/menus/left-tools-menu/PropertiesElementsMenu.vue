<template>
  <div
    :class="`
      tools-action-btns-container${
        currentSelectedItem ? activeClass : ''
      }
    `"
  >
    <div class="actions-wrapper">
      <div class="tools-actions-title-container">
        <h3 v-if="showMenu" class="tootls-title">
            <span class="text">{{ $t("element_properties_menu") }}</span>
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
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <h4 class="tools-actions-box-title">
            <div class="icon tools-title-close-icon">
              <img :src="require(`@/assets/images/icons/move_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
            <span class="text">
              {{ $t("move_items_tool") }}
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
                <span class="text">{{ $t("element_pos_y") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="rotate-ccw-btn tool-action-btn"
                @click.prevent="handleClickOnMoveElement(1, 0)"
                @touchstart.prevent="handleClickOnMoveElement(1, 0)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  :value="`${Math.round(currentSelectedItem?.css?.top ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeMoveTop"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="rotate-cw-btn tool-action-btn"
                @click.prevent="handleClickOnMoveElement(-1, 0)"
                @touchstart.prevent="handleClickOnMoveElement(-1, 0)"
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
                <span class="text">{{ $t("element_pos_x") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="rotate-ccw-btn tool-action-btn"
                @click.prevent="handleClickOnMoveElement(0, -1)"
                @touchstart.prevent="handleClickOnMoveElement(0, -1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  :value="`${Math.round(currentSelectedItem?.css?.left ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeMoveLeft"
                  @keyup.enter="onPressEnter"
                />
              </div>
              <button
                class="rotate-cw-btn tool-action-btn"
                @click.prevent="handleClickOnMoveElement(0, 1)"
                @touchstart.prevent="handleClickOnMoveElement(0, 1)"
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
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <div class="tool-content">
            <h5 class="tool-content-title space-r">
              <span class="text-container">
                <div class="icon tools-title-close-icon">
                  <img :src="require(`@/assets/images/icons/rotate_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
                <span class="text">{{ $t("rotate_element") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnRotateElement(-1)"
                @touchstart.prevent="handleClickOnRotateElement(-1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  :value="`${ currentSelectedItem?.css?.rotate }`"
                  placeholder="--"
                  @blur="handleTypeRotate"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnRotateElement(1)"
                @touchstart.prevent="handleClickOnRotateElement(1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row">
          <div class="tool-content">
              <div class="tool-range-container">
                <input
                  class="rotate-range-btn"
                  type="range"
                  @input.prevent="handleRangeRotateElement"
                  min="-360"
                  max="360"
                  :value="currentSelectedItem?.css?.rotate"
                />
              </div>
          </div>
        </div>
      </div>
      <!-- -------------- BOX -------------- -->
      <div class="tools-actions-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container">
          <h4 class="tools-actions-box-title">
            <div class="icon tools-title-close-icon">
              <img :src="require(`@/assets/images/icons/resize_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
            <span class="text">{{ $t("resize_items_tool") }}</span>
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
                  {{ $t("element_height") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnSizeElement(-1, 0)"
                @touchstart.prevent="handleClickOnSizeElement(-1, 0)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${Math.round(currentSelectedItem?.css?.height ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeHeight"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnSizeElement(1, 0)"
                @touchstart.prevent="handleClickOnSizeElement(1, 0)"
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
                  {{ $t("element_width") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnSizeElement(0, -1)"
                @touchstart.prevent="handleClickOnSizeElement(0, -1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${Math.round(currentSelectedItem?.css?.width ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeWidth"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
              </div>
              <button
                class="tool-action-btn"
                @click.prevent="handleClickOnSizeElement(0, 1)"
                @touchstart.prevent="handleClickOnSizeElement(0, 1)"
              >
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
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
export default {
  name: "PropertiesElementsMenu",
  props: {
    currentSelectedItem: Object,
    containerSize: Object,
    oppenedMenu: String,
  },

  data() {
    return {
      showMenu: false,
      activeClass: "",
      rate: 10,
    };
  },

  mounted() {
    this.$refs["textInput"]?.focus();
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

    getItemSize() {
      let height = 0, width = 0;
      if (this.currentSelectedItem) {
        height = this.containerSize.height - this.currentSelectedItem.top - this.currentSelectedItem.bottom;
        width = this.containerSize.width - this.currentSelectedItem.right - this.currentSelectedItem.left;
      }
      return {
        height : height,
        width: width,
      };
    },
  },

  methods: {
    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    handleClickOnCloseMenu() {
      this.activeClass = "";
      setTimeout(()=>{
        this.$emit("close-side-menus", "");
      }, 100)
    },

    handleFocusTextInput() {
      this.$emit("menu-input-focus", true);
    },
    
    // MOVING --------------------------------------- //
    handleClickOnMoveElement(moveY, moveX) {
      this.$emit("move-element-btn", {
        moveY: (moveY * this.rate),
        moveX: (moveX * this.rate),
      });
    },
    handleTypeMoveLeft(evt) {
      evt.preventDefault();
      this.$emit("move-element-left", parseInt(evt.currentTarget.value));
    },
    
    handleTypeMoveTop(evt) {
      evt.preventDefault();
      this.$emit("move-element-top", parseInt(evt.currentTarget.value));
      this.$emit("menu-input-focus", false);
    },

    // SIZING --------------------------------------- //
    handleTypeHeight(evt) {
      evt.preventDefault();
      this.$emit("size-element-height", parseFloat(evt.currentTarget.value));
      this.$emit("menu-input-focus", true);
    },

    handleTypeWidth(evt) {
      evt.preventDefault();
      this.$emit("size-element-width", parseFloat(evt.currentTarget.value));
      this.$emit("menu-input-focus", true);
    },

    handleClickOnSizeElement(heightValue, widthValue) {
      this.$emit("size-element-btn", {
        height: (heightValue * this.rate),
        width: (widthValue * this.rate),
      });
    },

    // ROTATION --------------------------------------- //
    handleClickOnRotateElement(value) {
      value = value * this.rate;
      this.$emit("rotate-element-btn", value);
    },

    handleTypeRotate(evt) {
      evt.preventDefault();
      this.$refs["textInput"].focus();
      let value = Number(evt.currentTarget.value);
      if (!isNaN(value)) {
        if (value > 360) value = 360;
        if (value < -360) value = -360;
        this.$emit("rotate-element", value);
        this.$emit("menu-input-focus", true);
      }
    },

    handleRangeRotateElement(evt) {
      let value = parseInt(evt.currentTarget.value);
      this.$emit("rotate-element", value);
    },
  },
};
</script>

