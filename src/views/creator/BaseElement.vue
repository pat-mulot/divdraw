<template>
  <div
    :class="`
      base_element${ this.getElementGroupClass }
        ${ this.isSelected ? ' selected' : ''}
        ${ 
          this.selectedCursor === 'group'
          && (this.getElementItemsStyle.group_id && this.getElementItemsStyle.group_id != this.selectedGroupId)
          ? ' ungroupable' : ''
        }
    `"
    :ref="'element_' + datas.id"
    :data-id="datas.id"
    :style="`
      ${this.getElementStyle}
      ${this.selected ? 'opacity: 0.5;' : ''}
      ${datas.merged ? 'display: none;' : ''}
      ${ this.getZindex }
    `"
    @mouseover="handleMouseMoveHoverElement(
        $event,
        getElementItemsStyle.id,
        getElementItemsStyle.group_id ?? null
      )
    "
    @mouseleave="handleMouseLeaveElement(
        $event,
        getElementItemsStyle.id,
        getElementItemsStyle.group_id ?? null
      )
    "
  >
    <div
      v-if="datas.isImg"
      @mousedown.prevent.left="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @mouseup.prevent.left="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchstart.prevent="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchend.prevent="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      class="base_element-content"
      :style="`
        position:relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
      `"
    >
    </div>
    <div
      v-else
      @mousedown.prevent.left="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @mouseup.prevent.left="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchstart.prevent="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchend.prevent="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      class="base_element-content"
      :style="`
        position:relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        ${
          this.datas.shape === `line` ? `
            display: flex;
            justify-content: center;
          ` : ''
        }
      `"
    >
      <div
        v-if="getElementItemsStyle.css.background"
        :style="`${ this.getElementItemsStyle.css.background }`"
      ></div>
      <div
        v-if="getElementItemsStyle.css.bottom"
        :style="`${ this.getElementItemsStyle.css.bottom }`"
      ></div>
      <div
        v-if="getElementItemsStyle.css.top"
        :style="`${ this.getElementItemsStyle.css.top }`"
      ></div>
      <div 
        v-if="getElementItemsStyle.css.left"
        :style="`${ this.getElementItemsStyle.css.left }`"
      ></div>
      <div
        v-if="getElementItemsStyle.css.right"
        :style="`${ this.getElementItemsStyle.css.right }`"
      ></div>
    </div>
    <div
      v-if="!datas.lock_status"
      @mousedown.prevent.left="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @mouseup.prevent.left="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchstart.prevent="
        handleMousedownOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      @touchend.prevent="
        handleMouseupOnElement(
          $event,
          getElementItemsStyle.id,
          getElementItemsStyle.group_id ?? null
        )
      "
      class="element_selector"
      :style="`
        height:${this.datas.css.height}px;
        width:${this.getElementWidth}px;
        position: absolute;
        top: 0;
        ${this.isCtrlKeyPressed ? 'visibility: hidden; z-index: 0;' : ''}
      `"
    >
      <!-- move butons axes -->
      <div class="element_selector-btns">
        <div
          v-if="selectedCursor == 'shape'"
          class="element_selector-shape-triangle-frame"
          :style="`
            border-left : solid ${this.datas.css.width * 0.8}px transparent;
            border-right : solid ${this.datas.css.width * 0.8}px transparent;
            border-bottom : solid ${this.datas.css.height * 1.6}px transparent;
            position: absolute;
            top: calc(${100 * (1 - 0.8)}% - (var(--border-sz-2) / 2));
            left: 50%;
            transform: translate(-50%, -50%);
          `"
        >
          <div
            class="border-left"
            :style="`
              width: ${triangleData.left.length}px;
              transform:
                rotate(${triangleData.left.angle}deg)
                translate(-50%,-50%);
              top: ${triangleData.left.y}px;
              left: calc(${triangleData.left.x}px);
            `"
          ></div>
          <div
            class="border-right"
            :style="`
              width: ${triangleData.right.length}px;
              transform:
                rotate(${triangleData.right.angle}deg)
                translate(50%,-50%);
              top: ${triangleData.right.y}px;
              left: calc(${triangleData.right.x}px);
            `"
          ></div>
          <div
            class="border-bottom"
            :style="`
              width: calc(${triangleData.bottom.length}px + var(--border-sz-2));
              top: calc(${triangleData.bottom.y}px);
              left: calc(${triangleData.bottom.x}px - var(--border-sz-2));
              transform:
                translate(0%,50%);
            `"
          ></div>
        </div>
        <div class="element_selector-move-btns" v-if="!isCtrlKeyPressed">
          <button
            class="move-up cross_btn-container tool-btn"
            :style="`
              transform: translate(
                calc(-0.5 * (32px / ${this.scale})),
                ${ this.getBtnsTranslateValue(-1) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              top: 0;
              left: 50%;
            `"
            @mousedown="handleClickOnMove"
            @touchstart="handleClickOnMove"
          
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/move_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="cross_btn-container tool-btn"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(1) }px,
                calc(-0.5 * (32px / ${this.scale}))
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              top: 50%;
              right: 0;
            `"
            @mousedown="handleClickOnMove"
            @touchstart="handleClickOnMove"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/move_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="cross_btn-container tool-btn"
            :style="`
              transform: translate(
                calc(-0.5 * (32px / ${this.scale})),
                ${ this.getBtnsTranslateValue(1) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              bottom: 0;
              left: 50%;
            `"
            @mousedown="handleClickOnMove"
            @touchstart="handleClickOnMove"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/move_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="cross_btn-container tool-btn"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(-1) }px,
                calc(-0.5 * (32px / ${this.scale}))
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              top: 50%;
              left: 0;
            `"
            @mousedown="handleClickOnMove"
            @touchstart="handleClickOnMove"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/move_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
        </div>
        <!-- rotate butons axes -->
        <div
          v-if="!selectedGroupId"
          class="element_selector-rotate-btns"
        >
          <button
            class="rotate-left_top tool-btn"
            data-pos="left_top"
            @mousedown="handleClickOnRotate"
            @touchstart="handleClickOnRotate"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(-0.5) }px,
                ${ this.getBtnsTranslateValue(-0.5) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              top: 0;
              left: 0;
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/rotate_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="rotate-top_right tool-btn"
            data-pos="top_right"
            @mousedown="handleClickOnRotate"
            @touchstart="handleClickOnRotate"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(0.5) }px,
                ${ this.getBtnsTranslateValue(-0.5) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              top: 0;
              right: 0;
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/rotate_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="rotate-right_bottom tool-btn"
            data-pos="right_bottom"
            @mousedown="handleClickOnRotate"
            @touchstart="handleClickOnRotate"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(0.5) }px,
                ${ this.getBtnsTranslateValue(0.5) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              bottom: 0;
              right: 0;
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/rotate_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="rotate-bottom_left tool-btn"
            data-pos="bottom_left"
            @mousedown="handleClickOnRotate"
            @touchstart="handleClickOnRotate"
            :style="`
              transform: translate(
                ${ this.getBtnsTranslateValue(-0.5) }px,
                ${ this.getBtnsTranslateValue(0.5) }px
              );
              height: calc(32px / ${this.scale});
              width: calc(32px / ${this.scale});
              bottom: 0;
              left: 0;
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/rotate_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
        </div>
        <!-- resize butons axes -->
        <div
          v-if="selectedCursor == 'cursor' && !selectedGroupId"
          class="element_selector-size-btns"
        >
          <button
            class="height-top tool-btn"
            data-pos="top"
            @mousedown="handleClickOnSize"
            @touchstart="handleClickOnSize"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/height_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            v-if="datas.shape != 'line'"
            class="width-right tool-btn"
            data-pos="right"
            @mousedown="handleClickOnSize"
            @touchstart="handleClickOnSize"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/width_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="height-bottom tool-btn"
            data-pos="bottom"
            @mousedown="handleClickOnSize"
            @touchstart="handleClickOnSize"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/height_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            v-if="datas.shape != 'line'"
            class="width-left tool-btn"
            data-pos="left"
            @mousedown="handleClickOnSize"
            @touchstart="handleClickOnSize"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/width_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <!-- resize butons angle -->
          <button
            v-if="datas.shape != 'line'"
            class="height-left_top tool-btn"
            data-pos="left_top"
            @mousedown="handleClickOnSizeAngle"
            @touchstart="handleClickOnSizeAngle"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/resize_top_left_bottom_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            v-if="datas.shape != 'line'"
            class="width-top_right tool-btn"
            data-pos="top_right"
            @mousedown="handleClickOnSizeAngle"
            @touchstart="handleClickOnSizeAngle"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/resize_top_right_bottom_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            v-if="datas.shape != 'line'"
            class="height-right_bottom tool-btn"
            data-pos="right_bottom"
            @mousedown="handleClickOnSizeAngle"
            @touchstart="handleClickOnSizeAngle"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/resize_top_left_bottom_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            v-if="datas.shape != 'line'"
            class="width-bottom_left tool-btn"
            data-pos="bottom_left"
            @mousedown="handleClickOnSizeAngle"
            @touchstart="handleClickOnSizeAngle"
            :style="`transform: 
              translate(-50%, -50%)
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/resize_top_right_bottom_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
        </div>
        <!-- round shape butons -->
        <div
          v-if="selectedCursor == 'shape'"
          class="element_selector-shape-round-btns"
        >
          <button
            class="round-left_top-btn tool-btn"
            data-type="tl"
            @mousedown="handleClickOnShapeRound"
            @touchstart="handleClickOnShapeRound"
            :style="`transform: 
              translate(
                calc(-75% - var(--border-sz-1)),
                calc(-75% - var(--border-sz-1))
              )
              scale(calc(1 / ${this.scale}));
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/shapes/round_top_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="round-top_right-btn tool-btn"
            data-type="tr"
            @mousedown="handleClickOnShapeRound"
            @touchstart="handleClickOnShapeRound"
            :style="`transform: 
              translate(
                calc(75% + var(--border-sz-1)),
                calc(-75% - var(--border-sz-1))
              )
              scale(calc(1 / ${this.scale})
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/shapes/round_top_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="round-right_bottom-btn tool-btn"
            data-type="br"
            @mousedown="handleClickOnShapeRound"
            @touchstart="handleClickOnShapeRound"
            :style="`transform: 
              translate(
                calc(75% + var(--border-sz-1)),
                calc(75% + var(--border-sz-1))
              )
              scale(calc(1 / ${this.scale})
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/shapes/round_bottom_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="round-bottom_left-btn tool-btn"
            data-type="bl"
            @mousedown="handleClickOnShapeRound"
            @touchstart="handleClickOnShapeRound"
            :style="`transform: 
              translate(
                calc(-75% - var(--border-sz-1)),
                calc(75% + var(--border-sz-1))
              )
              scale(calc(1 / ${this.scale})
            `"
            >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/shapes/round_bottom_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
        </div>
        <!-- triangle shape butons -->
        <div
          v-if="selectedCursor == 'shape'"
          class="element_selector-shape-triangle-btns"
        >
          <button
            class="left-triangle-btn tool-btn"
            data-type="top_left"
            @mousedown="handleClickOnShapeAngle"
            @touchstart="handleClickOnShapeAngle"
            :style="`
              transform: translate(-75%, -50%)
              scale(calc(1 / ${this.scale})
            `"
          >
            <div class="icon">
              <img
                v-if="getAngleTypeLeft === 'top_left'"
                :src="require(`@/assets/images/icons/shapes/triangle_left_icon.png`) ?? ''"
                alt=""
                class="img-icon divdraw"
              >
              <img
                v-else
                :src="require(`@/assets/images/icons/shapes/triangle_right_icon.png`) ?? ''"
                alt=""
                class="img-icon divdraw"
                style="transform: rotate(180deg)"
              >
            </div>
          </button>
          <button
            class="top-triangle-btn tool-btn"
            data-type="top_middle"
            @mousedown="handleClickOnShapeAngle"
            @touchstart="handleClickOnShapeAngle"
            :style="`
              transform: translate(-50%, -75%)
              scale(calc(1 / ${this.scale})
            `"
          >
            <div class="icon">
              <img :src="require(`@/assets/images/icons/shapes/triangle_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
          </button>
          <button
            class="bottom-triangle-btn tool-btn"
            data-type="bottom_middle"
            @mousedown="handleClickOnShapeAngle"
            @touchstart="handleClickOnShapeAngle"
            :style="`
              transform: translate(-50%, -25%)
              scale(calc(1 / ${this.scale})
            `"
          >
            <div class="icon">
              <img
                :src="require(`@/assets/images/icons/shapes/triangle_icon.png`) ?? ''"
                alt=""
                class="img-icon divdraw"
                style="transform: rotate(180deg);"
              >
            </div>
          </button>
          <button
            class="right-triangle-btn tool-btn"
            data-type="top_right"
            @mousedown="handleClickOnShapeAngle"
            @touchstart="handleClickOnShapeAngle"
            :style="`
              transform: translate(-25%, -50%)
              scale(calc(1 / ${this.scale})
            `"
          >
            <div class="icon">
              <img
                v-if="getAngleTypeRight === 'top_right'"
                :src="require(`@/assets/images/icons/shapes/triangle_right_icon.png`) ?? ''"
                alt=""
                class="img-icon divdraw"
              >
              <img
                v-else
                :src="require(`@/assets/images/icons/shapes/triangle_left_icon.png`) ?? ''"
                alt=""
                class="img-icon divdraw"
                style="transform: rotate(180deg)"
              >
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "BaseElement",

  props: {
    selected: String,
    datas: Object,
    maxIndex: Number,
    selectedCursor: String,
    scale: Number,
    minSize: Number,
    isCtrlKeyPressed: Boolean,
    selectedGroupId: Number,
    isGroupingElements: Boolean,
    isSelected: Boolean,
  },

  data() {
    return {
      isBorder: false,
    };
  },

  mounted() {
    if (this.datas.isImg) {
      const element = this.$refs[`element_${this.datas.id}`];
      if (element) {
        const elementContent = element.querySelector(".base_element-content");
        let source = `<div xmlns="http://www.w3.org/1999/xhtml">`;
        let zIndex = 0;
        for (let elem of this.datas.elements_list) {
          if (elem.css.zIndex > zIndex) zIndex = elem.css.zIndex;
          source += `
            <div class="ELEMENT-${ elem.id }" style="
              box-sizing: border-box;
              ${ elem.element_style }
            ">
              <div class="ELEMENT-${ elem.id }-CONTENT" style="
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
        source += `</div>`;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        let
          width = this.datas.css.width,
          height = this.datas.css.height;
        canvas.height = height;
        canvas.width = width;
        let tempImg = document.createElement("img");
        tempImg.src = "data:image/svg+xml," + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg"
            width="${width}"
            height=" ${height}"
          >
            <foreignObject 
              style="
                width: ${width}px;
                height: ${height}px;
              "
            >${ source }</foreignObject></svg>
        `);
        tempImg.onload = () => {
          if (context) {
            context.drawImage(tempImg, 0, 0);
            let img = new Image();
            img.src = canvas.toDataURL();
            img.style.height = "100%";
            img.style.width = "100%";
            elementContent.appendChild(img);
          }
        }
      }
    }
  },

  computed: {
    getAngleTypeLeft() {
      if (this.datas.angle_ratio.top_left >= this.datas.angle_ratio.bottom_left) {
        return "top_left";
      }
      return "bottom_left";
    },

    getAngleTypeRight() {
      if (this.datas.angle_ratio.top_right >= this.datas.angle_ratio.bottom_right) {
        return "top_right";
      }
      return "bottom_right";
    },

    getZindex() {
      if (this.isSelected) {
        return `z-index: ${ this.maxIndex };`;
      }
      return `z-index: ${ this.datas.css.zIndex };`;
    },

    getElementGroupClass() {
      if (
        this.datas.group_id
        && this.selectedGroupId
        && this.datas.group_id === this.selectedGroupId
      ) {
        return " grouped";
      }
      return "";
    },

    getElementWidth() {
      if (this.datas.shape == "line") {
        return (this.datas.line_width ?? this.minSize) + 32 + "px";
      }
      return this.datas.css.width;
    },

    getElementItemsStyle() {
      if (!this.datas.isImg) {
        const cssPropsToReturn = {
          css: this.generateElementCssPropsStr(),
          id: this.datas.id,
          group_id: this.datas.group_id,
        };
        this.$emit("set-css-props", {
          type: "element_items_style",
          props: cssPropsToReturn,
          element_id: this.datas.id,
        });
        return cssPropsToReturn;
      }
      return {
          css: {},
          id: this.datas.id,
          group_id: this.datas.group_id,
        };
    },

    getElementStyle() {
      return this.generateElementContainerCssPropsStr(this.datas);
    },

    triangleData() {
      let scale = 1.6;
      let sqrWidth = (scale / 2) * this.datas.css.width;
      let sqrHeight = scale * this.datas.css.height;
      let sidesLength = Math.sqrt(sqrWidth * sqrWidth + sqrHeight * sqrHeight);
      let bottomLength = scale * this.datas.css.width;
      let angle = 90 - Math.atan(sqrWidth / sqrHeight) * (180 / Math.PI);
      return {
        left: {
          length: sidesLength,
          angle: -1 * angle,
          y: 0,
          x: -1 * (sidesLength / 2),
        },
        right: {
          length: sidesLength,
          angle: angle,
          y: 0,
          x: -1 * (sidesLength / 2),
        },
        bottom: {
          length: bottomLength,
          y: sqrHeight,
          x: -1 * sqrWidth,
        },
        width: sqrWidth,
        height: sqrHeight,
      };
    },
  },

  methods: {

    getBtnsTranslateValue(dirValue) {
      const value =
        Math.abs((dirValue / this.scale) * (32 / this.scale)) <= (32 / this.scale) ?
        (dirValue / this.scale) * (32 / this.scale) :
        (dirValue < 0 ? -1 : 1) * (32 / this.scale);
      return value;
    },

    handleMousedownOnElement(evt, itemId, groupId = null) {
      this.$emit("mousedown-element", {
        evt: evt,
        item_id: itemId,
        group_id: groupId,
      });
    },

    handleMouseupOnElement(evt, itemId, groupId = null) {
      this.$emit("mouseup-element", {
        evt: evt,
        item_id: itemId,
        group_id: groupId,
      });
    },

    generateElementContainerCssPropsStr(datas) {
      let css = {};
      css["height"] = `height: ${ parseFloat(datas.css.height).toFixed(1) }px;`;
      if (datas.shape === "line") {
        css["width"] = `width: ${ this.getElementWidth };`;
      } else {
        css["width"] = `width: ${ parseFloat(datas.css.width).toFixed(1) }px;`;
      }
      let elemTop = datas.css.top;
      let elemLeft = datas.css.left;
      if (datas.merged && datas.parent_props) {
        elemTop = datas.css.top - datas?.parent_props.ctnr_top;
        elemLeft = datas.css.left - datas?.parent_props.ctnr_left;
      }
      css["position"] = `position: ${ datas.css.position};`;
      css["top"] = `top: ${ parseFloat(elemTop).toFixed(1) }px;`;
      css["left"] = `left: ${ parseFloat(elemLeft).toFixed(1) }px;`;
      css["transform"] = `transform:
        translate(${datas.css.translateX}%,${datas.css.translateY}%)
        rotate(${datas.css.rotate}deg);`;
      css["zindex"] = `z-index: ${datas.css.zIndex};`;
      let cssProps = ``;
      for (let prop in css) {
        cssProps += css[prop];
      }
      this.$emit("set-css-props", {
        type : "element_style",
        props : cssProps,
        element_id: datas.id,
      })
      return cssProps;
    },

    generateElementCssPropsStr() {
      let elmentDatas = this.datas;
      let css = {
        bottom: {},
        top: {},
        left: {},
        right: {},
        background: {},
        // trapeze
        top_left: {},
        top_right: {},
      };
      const
        height = elmentDatas.css.height,
        width = elmentDatas.css.width,
        angleRatioTopLeft = elmentDatas.angle_ratio.top_left / 100,
        angleRatioTopRight = elmentDatas.angle_ratio.top_right / 100,
        angleRatioBottomLeft = elmentDatas.angle_ratio.bottom_left / 100,
        angleRatioBottomRight = elmentDatas.angle_ratio.bottom_right / 100,
        borderWidth = elmentDatas.border_width,
        isTriangle = elmentDatas.angle_ratio.top_left + elmentDatas.angle_ratio.top_right >= 100,
        piRad = Math.PI / 180;
      // SQUARE SHAPE
      if (elmentDatas.shape === "square" || elmentDatas.shape === "line") {
        if (elmentDatas.shape === "line") {
          let lineWidth = elmentDatas.line_width ?? this.minSize;
          css.background["width"] = `width: ${lineWidth * 2}px;`;
          css.background[
            "transform"
          ] = `translateX(calc(50% - (${this.minSize} / 2))): ${this.minSize}px;`;
        } else {
          css.background["width"] = `width: ${width}px;`;
        }
        css.background["height"] = `height: ${height}px;`;
        css.background["backgroundcolor"] = `background-color: ${
          elmentDatas.border_only_enabled ? "transparent" : elmentDatas.css.bg
        };`;
        css.background["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
        if (elmentDatas.border_enabled || elmentDatas.border_only_enabled) {
          if (elmentDatas.border_enabled || elmentDatas.border_only_enabled) {
            if (elmentDatas.border_types.includes("all")) {
              css.background[
                "borderall"
              ] = `border: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
            }
            if (elmentDatas.border_types.includes("top")) {
              css.background[
                "bordertop"
              ] = `border-top: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
            }
            if (elmentDatas.border_types.includes("right")) {
              css.background[
                "borderright"
              ] = `border-right: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
            }
            if (elmentDatas.border_types.includes("bottom")) {
              css.background[
                "borderbottom"
              ] = `border-bottom: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
            }
            if (elmentDatas.border_types.includes("left")) {
              css.background[
                "borderleft"
              ] = `border-left: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
            }
          }
        }
      }
      // HALF-ROUND SHAPE
      else if (elmentDatas.shape === "half_round") {
        css.background["width"] = `width: ${width}px;`;
        css.background["height"] = `height: ${height}px;`;
        css.background["backgroundcolor"] = `background-color: ${
          elmentDatas.border_only_enabled ? "transparent" : elmentDatas.css.bg
        };`;
        css.background["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
        if (elmentDatas.border_enabled || elmentDatas.border_only_enabled) {
          if (elmentDatas.border_types.includes("all")) {
            css.background[
              "borderall"
            ] = `border: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
          } else {
            css.background[
              "bordertop"
            ] = `border-top: solid ${elmentDatas.border_width}px transparent;`;
            css.background[
              "borderright"
            ] = `border-right: solid ${elmentDatas.border_width}px transparent;`;
            css.background[
              "borderbottom"
            ] = `border-bottom: solid ${elmentDatas.border_width}px transparent;`;
            css.background[
              "borderleft"
            ] = `border-left: solid ${elmentDatas.border_width}px transparent;`;
            for (let type of elmentDatas.border_types) {
              if (type === "top") {
                css.background[
                  "bordertop"
                ] = `border-top: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "right") {
                css.background[
                  "borderright"
                ] = `border-right: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "bottom") {
                css.background[
                  "borderbottom"
                ] = `border-bottom: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "left") {
                css.background[
                  "borderleft"
                ] = `border-left: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
            }
          }
        }
        css.background["radius"] = `border-radius: 
          ${width / 2}px
          ${width / 2}px
          0 0;
        `;
      }
      // ROUND SHAPE
      else if (elmentDatas.shape === "round") {
        css.background["width"] = `width: ${width}px;`;
        css.background["height"] = `height: ${height}px;`;
        css.background["backgroundcolor"] = `background-color: ${
          elmentDatas.border_only_enabled ? "transparent" : elmentDatas.css.bg
        };`;
        css.background["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
        if (elmentDatas.border_enabled || elmentDatas.border_only_enabled) {
          if (elmentDatas.border_types.includes("all")) {
            css.background[
              "borderall"
            ] = `border: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
          } else {
            for (let type of elmentDatas.border_types) {
              if (type === "top") {
                css.background[
                  "bordertop"
                ] = `border-top: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "right") {
                css.background[
                  "borderright"
                ] = `border-right: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "bottom") {
                css.background[
                  "borderbottom"
                ] = `border-bottom: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
              if (type === "left") {
                css.background[
                  "borderleft"
                ] = `border-left: solid ${elmentDatas.border_width}px ${elmentDatas.border_color};`;
              }
            }
          }
        }
        css.background[
          "roundtl"
        ] = `border-top-left-radius: ${elmentDatas.round_ratio.tl}%;`;
        css.background[
          "roundtr"
        ] = `border-top-right-radius: ${elmentDatas.round_ratio.tr}%;`;
        css.background[
          "roundbr"
        ] = `border-bottom-right-radius: ${elmentDatas.round_ratio.br}%;`;
        css.background[
          "roundbl"
        ] = `border-bottom-left-radius: ${elmentDatas.round_ratio.bl}%;`;
      }
      // ANGLE SHAPE
      else if (
        elmentDatas.shape === "trapeze" ||
        elmentDatas.shape === "losange" ||
        elmentDatas.shape === "triangle"
      ) {
        const isLosange = elmentDatas.shape === "losange";
        const
          sideTopLeftSz = width * angleRatioTopLeft,
          sideTopRightSz = width * angleRatioTopRight,
          sideBottomLeftSz = width * angleRatioBottomLeft,
          sideBottomRightSz = width * angleRatioBottomRight;
        const
          topWidth = width - sideTopLeftSz - sideTopRightSz,
          bottomWidth = width - sideTopLeftSz - sideTopRightSz,
          angleLeft = Math.atan(sideTopLeftSz / height) / piRad,
          angleRight = Math.atan(sideTopRightSz / height) / piRad,
          leftTan = borderWidth * Math.abs(Math.tan(angleLeft * piRad)),
          leftCos = borderWidth / Math.abs(Math.cos(angleLeft * piRad)),
          rightTan = borderWidth * Math.abs(Math.tan(angleRight * piRad)),
          rightCos = borderWidth / Math.abs(Math.cos(angleRight * piRad));
          //
        const
          topWidth2 = width - sideBottomLeftSz - sideBottomRightSz,
          bottomWidth2 = width - sideBottomLeftSz - sideBottomRightSz,
          angleLeft2 = (Math.atan(sideBottomLeftSz / height) / piRad),
          angleRight2 = (Math.atan(sideBottomRightSz / height) / piRad),
          leftTan2 = borderWidth * Math.abs(Math.tan(angleLeft2 * piRad)),
          leftCos2 = borderWidth / Math.abs(Math.cos(angleLeft2 * piRad)),
          rightTan2 = borderWidth * Math.abs(Math.tan(angleRight2 * piRad)),
          rightCos2 = borderWidth / Math.abs(Math.cos(angleRight2 * piRad));
        //
        const angleTopl1 = 90 - angleRight;
        const angleTopr1 = 90 - angleLeft;
        const angleBot1 = 180 - angleTopl1 - angleTopr1;
        const
          angleTopl1Rad = (angleTopl1 * Math.PI) / 180,
          angleTopr1Rad = (angleTopr1 * Math.PI) / 180,
          angleBot1Rad = (angleBot1 * Math.PI) / 180;
        //
        const angleTopl2 = 90 - angleRight2;
        const angleTopr2 = 90 - angleLeft2;
        const angleBot2 = 180 - angleTopl2 - angleTopr2;
        const
          angleTopl2Rad = (angleTopl2 * Math.PI) / 180,
          angleTopr2Rad = (angleTopr2 * Math.PI) / 180,
          angleBot2Rad = (angleBot2 * Math.PI) / 180;
        //
        if (isLosange) {
          // BACKGROUND :
          css.background["width"] = `width: ${width}px;`;
          css.background["height"] = `height: ${height}px;`;
          css.background["backgroundcolor"] = `background-color: ${
            elmentDatas.border_only_enabled ? "transparent" : elmentDatas.css.bg
          };`;
          css.background["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
          css.background["clippath"] = `clip-path: polygon(
            /* bottom left */
            ${parseFloat(100).toFixed(1)}px
            ${parseFloat(height / 2).toFixed(1)}px,
            /* top left */
            ${parseFloat(width - sideTopRightSz).toFixed(1)}px
            0px,
            /* top right */
            ${parseFloat(width).toFixed(1)}px
            ${parseFloat(height / 2).toFixed(1)}px,
            /* bottom right */
            ${parseFloat(width - sideTopRightSz).toFixed(1)}px
            ${parseFloat(height).toFixed(1)}px
          );`;
        } else {
          // BACKGROUND :
          css.background["width"] = `width: ${width}px;`;
          css.background["height"] = `height: ${height}px;`;
          css.background["backgroundcolor"] = `background-color: ${
            elmentDatas.border_only_enabled ? "transparent" : elmentDatas.css.bg
          };`;
          css.background["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
          css.background["clippath"] = `clip-path: polygon(
            /* top left */
            ${parseFloat(sideTopLeftSz).toFixed(1)}px
            0px,
            /* top right */
            ${parseFloat(width - sideTopRightSz).toFixed(1)}px
            0px,
            /* bottom right */
            ${parseFloat(width - sideBottomRightSz).toFixed(1)}px
            ${parseFloat(height).toFixed(1)}px,
            /* bottom left */
            ${parseFloat((sideBottomLeftSz + sideBottomLeftSz) / 2).toFixed(1)}px
            ${parseFloat(height).toFixed(1)}px
          );`;
          if (elmentDatas.border_enabled || elmentDatas.border_only_enabled) {
            // BORDER-TOP :
            if (
              elmentDatas.border_types.includes("top") ||
              elmentDatas.border_types.includes("all")
            ) {
              if (!isTriangle && !isLosange) {
                css.top["width"] = `width: ${width}px;`;
                css.top["height"] = `height: ${height}px;`;
                css.top["backgroundcolor"] = `background-color: ${elmentDatas.border_color};`;
                css.top["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
                css.top["position"] = `position:absolute;top:0;left:0;`;
                css.top["clippath"] = `clip-path: polygon(
                  /* top left */
                  ${parseFloat(sideTopLeftSz).toFixed(1)}px
                  0px,
                  /* top right */
                  ${parseFloat(width - sideTopRightSz).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(
                    sideTopRightSz > 0 || sideTopRightSz > 0 ?
                    width - sideTopRightSz + rightTan :
                    width - sideTopRightSz + rightTan - rightTan2
                  ).toFixed(1)}px
                  ${parseFloat(borderWidth).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(sideTopLeftSz > 0 ? sideTopLeftSz - (leftTan2 + leftTan) : (leftTan2 + leftTan)).toFixed(1)}px
                  ${parseFloat(borderWidth).toFixed(1)}px
                );`;
              }
            }
            // BORDER-BOTTOM :
            if (
              elmentDatas.border_types.includes("bottom") ||
              elmentDatas.border_types.includes("all")
            ) {
              css.bottom["width"] = `width: ${width}px;`;
              css.bottom["height"] = `height: ${height}px;`;
              css.bottom["backgroundcolor"] = `background-color: ${elmentDatas.border_color};`;
              css.bottom["opacity"] = `opacity: ${elmentDatas.css.opacity};`;
              css.bottom["position"] = `position:absolute;top:0;left:0;`;
              css.bottom["clippath"] = `clip-path: polygon(
                /* top left */
                ${parseFloat(
                  sideBottomLeftSz > 0 ?
                  sideBottomLeftSz - leftTan2 - leftTan :
                  (leftTan2 + leftTan)
                ).toFixed(1)}px
                ${parseFloat(height - borderWidth).toFixed(1)}px,
                /* top right */
                ${parseFloat(
                  sideBottomRightSz > 0 ?
                  width - sideBottomRightSz + rightTan2 :
                  width + rightTan2 - rightTan 
                ).toFixed(1)}px
                ${parseFloat(height - borderWidth).toFixed(1)}px,
                /* bottom right */
                ${parseFloat(width - sideBottomRightSz).toFixed(1)}px
                ${parseFloat(height).toFixed(1)}px,
                /* bottom left */
                ${parseFloat(sideBottomLeftSz).toFixed(1)}px
                ${parseFloat(height).toFixed(1)}px
              );`;
            }
            // BORDER-LEFT :
            if (
              elmentDatas.border_types.includes("left") ||
              elmentDatas.border_types.includes("all")
            ) {
              let clipPath = ``;
              if (topWidth < leftCos) {
                const hypotenus = ((leftCos - topWidth) * Math.sin(angleTopr1Rad)) / Math.sin(angleBot1Rad);
                let deltaX = Math.cos(angleTopl1Rad) * hypotenus,
                  deltaY = Math.sin(angleTopl1Rad) * hypotenus;
                if (deltaY > height) deltaY = height;
                clipPath = `clip-path: polygon(
                  /* top left */
                  ${parseFloat(sideTopLeftSz).toFixed(1)}px
                  0px,
                  /* top right */
                  ${parseFloat(sideTopLeftSz + topWidth).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(sideTopLeftSz + topWidth + deltaX).toFixed(1)}px
                  ${parseFloat(deltaY).toFixed(1)}px,
                  /* ?? */
                  ${parseFloat(leftCos).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  0px
                  ${parseFloat(height).toFixed(1)}px
                );`;
              } else if (topWidth2 < leftCos2) {
                const hypotenus = ((leftCos2 - topWidth2) * Math.sin(angleTopr2Rad)) / Math.sin(angleBot2Rad);
                let
                  deltaX = Math.cos(angleTopl2Rad) * hypotenus,
                  deltaY = Math.sin(angleTopl2Rad) * hypotenus;
                if (deltaY > height) deltaY = height;
                clipPath = `clip-path: polygon(
                  /* top left */
                  0px
                  0px,
                  /* top right */
                  ${parseFloat(leftCos2).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(width - sideBottomRightSz + deltaX).toFixed(1)}px
                  ${parseFloat(height - deltaY).toFixed(1)}px,
                  /* ?? */
                  ${parseFloat(width - sideBottomRightSz).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(sideBottomLeftSz).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px
                );`;
              } else {
                clipPath = `clip-path: polygon(
                  /* top left */
                  ${parseFloat(sideTopLeftSz).toFixed(1)}px
                  0px,
                  /* top right */
                  ${parseFloat(
                    sideBottomLeftSz > 0 ?
                    leftCos2 :
                    sideTopLeftSz + leftCos
                  ).toFixed(1)}px
                  ${parseFloat(0).toFixed(1)}px,
                  /* bottom right */
                  ${parseFloat(
                    sideBottomLeftSz > 0 ?
                    sideBottomLeftSz + leftCos2 :
                    leftCos
                  ).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(
                    sideBottomLeftSz > 0 ?
                    sideBottomLeftSz :
                    0
                  ).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px
                );`;
              }
              css.left["polygonleft"] = `
                background-color: ${elmentDatas.border_color};
                height: ${parseFloat(height).toFixed(1)}px;
                width: ${parseFloat(width).toFixed(1)}px;
                position: absolute;
                bottom: 0;
                left: 0;
                ${clipPath}
              `;
            }
            // BORDER-RIGHT :
            if (
              elmentDatas.border_types.includes("right") ||
              elmentDatas.border_types.includes("all")
            ) {
              let clipPath = ``;
              if (topWidth < rightCos) {
                const hypotenus =
                  ((rightCos - topWidth) * Math.sin(angleTopl1Rad)) /
                  Math.sin(angleBot1Rad);
                let deltaX = Math.cos(angleTopr1Rad) * hypotenus,
                  deltaY = Math.sin(angleTopr1Rad) * hypotenus;
                if (deltaY > height) deltaY = height;
                clipPath = `clip-path: polygon(
                  /* top left */
                  ${parseFloat(sideTopLeftSz - deltaX).toFixed(1)}px
                  ${parseFloat(deltaY).toFixed(1)}px,
                  /* top right */
                  ${parseFloat(sideTopLeftSz).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(sideTopLeftSz + topWidth).toFixed(1)}px
                  0px,
                  /* ?? */
                  ${parseFloat(width).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(width - rightCos).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px
                );`;
              } else if (topWidth2 < rightCos2) {
                const hypotenus =
                  ((rightCos2 - topWidth2) * Math.sin(angleTopl2Rad)) /
                  Math.sin(angleBot2Rad);
                let
                  deltaX = Math.cos(angleTopr2Rad) * hypotenus,
                  deltaY = Math.sin(angleTopr2Rad) * hypotenus;
                if (deltaY > height) deltaY = height;
                clipPath = `clip-path: polygon(
                  /* top left */
                  ${parseFloat(width - rightCos2).toFixed(1)}px
                  0px,
                  /* top right */
                  ${parseFloat(width).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(sideBottomLeftSz + topWidth2).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* ?? */
                  ${parseFloat(sideBottomLeftSz).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(sideBottomLeftSz - deltaX).toFixed(1)}px
                  ${parseFloat(height - deltaY).toFixed(1)}px
                );`;
              } else {
                clipPath = `clip-path: polygon(
                  /* top right */
                  ${parseFloat(
                    sideBottomRightSz > 0 ?
                    width - rightCos2 :
                    width - sideTopRightSz - rightCos
                  ).toFixed(1)}px
                  0px,
                  /* top right */
                  ${parseFloat(
                    sideBottomRightSz > 0 ?
                    width :
                    width - sideTopRightSz
                  ).toFixed(1)}px
                  0px,
                  /* bottom right */
                  ${parseFloat(
                    sideBottomRightSz > 0 ?
                    width - sideBottomRightSz :
                    width
                  ).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px,
                  /* bottom left */
                  ${parseFloat(
                    sideBottomRightSz > 0 ?
                    width - sideBottomRightSz - rightCos2 :
                    width - rightCos
                  ).toFixed(1)}px
                  ${parseFloat(height).toFixed(1)}px
                );`;
              }
              css.right["polygonright"] = `background-color: ${
                elmentDatas.border_color
              };
                  height: ${parseFloat(height).toFixed(1)}px;
                  width: ${parseFloat(width).toFixed(1)}px;
                  position: absolute;
                  top: 0;
                  right: 0;
                  ${clipPath}
                `;
            }
            // --------------------------------
          }
        }
      }
      // props to css string
      let cssPropsStr = {};
      for (let element in css) {
        if (Object.keys(css[element]).length > 0) {
          cssPropsStr[element] = "box-sizing: border-box;";
          for (let prop in css[element]) {
            if (css[element][prop]) {
              cssPropsStr[element] += css[element][prop];
            }
          }
        }
      }
      return cssPropsStr;
    },

    handleClickOnShapeRound(evt) {
      evt.preventDefault();
      let type = evt.currentTarget.dataset.type;
      let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      this.$emit("shape-element-round", {
        moveY: clientY,
        moveX: clientX,
        direction: type,
        shape: "round",
      });
    },

    handleClickOnShapeAngle(evt) {
      evt.preventDefault();
      let type = evt.currentTarget.dataset.type;
      let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      this.$emit("shape-element-angle", {
        moveY: clientY,
        moveX: clientX,
        direction: type,
        shape: "triangle",
      });
    },

    handleClickOnRotate(evt) {
      evt.preventDefault();
      let element =
        this.$refs["element_" + this.datas.id].getBoundingClientRect();
      let elementCenterTop = element.top + element.height / 2;
      let elementCenterLeft = element.left + element.width / 2;
      let direction = evt.currentTarget.dataset.pos;
      this.$emit("rotate-element", {
        moveY: elementCenterTop,
        moveX: elementCenterLeft,
        direction: direction,
      });
    },

    handleClickOnMove(evt) {
      evt.preventDefault();
      let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      this.$emit("moving-element", {
        moveY: clientY,
        moveX: clientX,
      });
    },

    handleClickOnSize(evt) {
      evt.preventDefault();
      let handler = evt.currentTarget;
      let direction = handler.dataset.pos;
      let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      this.$emit("sizing-element", {
        moveY: clientY,
        moveX: clientX,
        direction: direction,
        handler: handler,
      });
    },

    handleClickOnSizeAngle(evt) {
      evt.preventDefault();
      let handler = evt.currentTarget;
      let direction = handler.dataset.pos;
      let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      let clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      this.$emit("sizing-angle-element", {
        moveY: clientY,
        moveX: clientX,
        direction: direction,
        handler: handler,
      });
    },

    handleMouseMoveHoverElement(evt, itemId, groupId) {
      // if grouping mode enabled
      if (this.selectedCursor === "group") {
        // if a group is already selected
        if (this.selectedGroupId) {
          // check if is adding or removing element from current group
          if (groupId === this.selectedGroupId) {
            this.$emit("set-group-cursor", "remove");
          } else if (!groupId || groupId === 0) {
            this.$emit("set-group-cursor", "add");
          }
        } else {
          if (groupId) {
            this.$emit("set-group-cursor", "select");
          } else {
            this.$emit("set-group-cursor", "new");
          }
        }
      }
      if (!evt.currentTarget.classList.contains("hover")) {
        evt.currentTarget.classList.add("hover");
        this.$emit("set-move-cursor", true);
      }
    },

    // handleMouseLeaveElement(evt, itemId, groupId) {
    handleMouseLeaveElement(evt) {
      if (this.selectedCursor === "group") {
        this.$emit("set-group-cursor", "");
      }
      if (evt.currentTarget.classList.contains("hover")) {
        evt.currentTarget.classList.remove("hover");
        this.$emit("set-move-cursor", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.base_element {
  transition:
    0.1s opacity 0s ease,
    0s visibility 0.1s ease,
    box-shadow 0.1s ease;

  button.tool-btn {
    box-shadow:
      0 0 0.5rem var(--bk-20),
      0 0 2px var(--wt-90) inset;

      .icon {
        padding: var(--gap-1-8);
        transition: 0.1s transform ease;

        &:hover {
          transform: scale(1.5);
        }
      }
  }

  &.ungroupable {
    opacity: 0.3;
  }

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }


  .element_selector {
    visibility: hidden;
    display: flex;
    height: 100%;
    width: 100%;
    border: none;
    box-shadow: 0 0 0 2px var(--bk-50);

    .left-triangle-btn,
    .right-triangle-btn,
    .top-triangle-btn,
    .bottom-triangle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-round-bottom_left,
    .icon-round-right_bottom,
    .icon-round-top_right,
    .icon-round-left_top {
      height: 1rem;
      width: 1rem;
      display: flex;
      background-color: var(--font-color-1);
    }

    .icon-round-left_top {
      border-top-left-radius: 100%;
    }

    .icon-round-top_right {
      border-top-right-radius: 100%;
    }

    .icon-round-right_bottom {
      border-bottom-right-radius: 100%;
    }

    .icon-round-bottom_left {
      border-bottom-left-radius: 100%;
    }

    .element_selector-btns {
      display: flex;
      height: 100%;
      width: 100%;
      position: relative;

      .element_selector-move-btns {
        --sz: calc((var(--gap) * 3));
        display: flex;
        height: calc(100% + (var(--sz) * 2));
        width: calc(100% + (var(--sz) * 2));
        border-radius: 50%;
        border: dashed var(--border-sz-2) var(--bk-30);
        position: absolute;
        top: calc(-1 * (50% + var(--sz)));
        left: calc(-1 * (50% + var(--sz)));
        transform: translate(calc(50% - var(--sz)), calc(50% - var(--sz)));

        .cross_btn-container {
          position: absolute;
          color: var(--bk-100);
          padding: 0;
          margin: 0;
          @include flex-center-row;
          border-radius: 50%;
        }
      }

      .element_selector-rotate-btns {
        --sz: calc((var(--gap) * 2));
        display: flex;
        height: calc(100% + (var(--sz) * 2));
        width: calc(100% + (var(--sz) * 2));
        border-radius: 50%;
        position: absolute;
        top: calc(-1 * (50% + var(--sz)));
        left: calc(-1 * (50% + var(--sz)));
        transform: translate(calc(50% - var(--sz)), calc(50% - var(--sz)));

        button {
          position: absolute;
          border-radius: 50%;
          color: var(--bk-100);
          &.rotate-left_top {
            // top: 0;
            // left: 0;
            background-color: rgba(255, 0, 0, 0.5);
          }
          &.rotate-top_right {
            // top: 0;
            // left: 100%;
            background-color: rgba(255, 255, 0, 0.5);
          }
          &.rotate-right_bottom {
            // top: 100%;
            // left: 100%;
            background-color: rgba(0, 0, 255, 0.5);
          }
          &.rotate-bottom_left {
            // top: 100%;
            // left: 0;
            background-color: rgba(0, 128, 0, 0.5);
          }
        }
      }

      .element_selector-size-btns {
        display: flex;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        button {
          position: absolute;
          // transform: translate(calc(-50%), calc(-50%));
          color: var(--bk-100);
          padding: 0;
          margin: 0;
          @include flex-center-row;

          &.height-top {
            top: 0;
            left: 50%;
          }
          &.width-right {
            top: 50%;
            left: 100%;
          }
          &.height-bottom {
            top: 100%;
            left: 50%;
          }
          &.width-left {
            top: 50%;
            left: 0;
          }
          &.height-left_top {
            top: 0;
            left: 0;
          }
          &.width-top_right {
            top: 0;
            left: 100%;
          }
          &.height-right_bottom {
            top: 100%;
            left: 100%;
          }
          &.width-bottom_left {
            top: 100%;
            left: 0;
          }
        }
      }

      .element_selector-shape-round-btns {
        --sz: calc((var(--gap) * 2));
        display: flex;
        height: 100%;
        width: 100%;
        border: dashed var(--border-sz-2) var(--bk-30);
        position: absolute;

        button {
          position: absolute;
          transform: translate(-50%, -50%);

          &.round-left_top-btn {
            top: 0;
            left: 0;
            transform: translate(
              calc(-75% - var(--border-sz-1)),
              calc(-75% - var(--border-sz-1))
            );
          }
          &.round-top_right-btn {
            top: 0;
            right: 0;
            transform: translate(
              calc(75% + var(--border-sz-1)),
              calc(-75% - var(--border-sz-1))
            );
          }
          &.round-right_bottom-btn {
            bottom: 0;
            right: 0;
            transform: translate(
              calc(75% + var(--border-sz-1)),
              calc(75% + var(--border-sz-1))
            );
          }

          &.round-bottom_left-btn {
            bottom: 0;
            left: 0;
            transform: translate(
              calc(-75% - var(--border-sz-1)),
              calc(75% + var(--border-sz-1))
            );
          }
        }
      }

      .element_selector-shape-triangle-frame {
        position: relative;

        .border-left,
        .border-right,
        .border-bottom {
          border-top: dashed var(--border-sz-2) var(--bk-30);
          transform: translate(-50%, -50%);
          position: absolute;
          height: var(--border-sz-2);
        }

        .border-bottom {
          transform: translate(0, -50%);
        }

        .border-right {
          transform: translate(-50%, 0);
        }

        .border-left {
          transform: translate(-50%, 0);
        }
      }

      .element_selector-shape-triangle-btns {
        display: flex;
        height: 100%;
        width: 100%;

        .icon-triangle-right,
        .icon-triangle-left,
        .icon-triangle {
          height: 1rem;
          width: 1rem;
          display: flex;
        }

        .icon-triangle-right {
          border-left: solid 0% transparent;
          border-right: solid 1rem transparent;
          border-bottom: solid 1rem var(--font-color-1);
        }

        .icon-triangle-left {
          border-left: solid 1rem transparent;
          border-right: solid 0 transparent;
          border-bottom: solid 1rem var(--font-color-1);
        }

        .icon-triangle {
          border-left: solid 0.5rem transparent;
          border-right: solid 0.5rem transparent;
          border-bottom: solid 1rem var(--font-color-1);
        }

        button {
          position: absolute;

          &.top-triangle-btn {
            top: 0;
            left: calc(50% - var(--border-sz-2) / 2);
          }

          &.bottom-triangle-btn {
            top: 100%;
            left: calc(50% - var(--border-sz-2) / 2);
          }

          &.left-triangle-btn {
            top: calc(50% - var(--border-sz-2) / 2);
            left: 0;
          }

          &.right-triangle-btn {
            top: calc(50% - var(--border-sz-2) / 2);
            left: 100%;
          }
        }
      }
    }
  }

  &.hover {
    box-shadow: 0 0 0.5rem 2px var(--bk-50);
    background-color: var(--bk-05);
  }

  &.selected {
    .element_selector {
      visibility: visible;
    }
  }
    
    &.grouped {
      box-shadow: 0 0 1rem var(--success-color-2);

      .base_element-content {
      box-shadow: 0 0 0 2px var(--bk-50);
      }
    }
}
</style>
