<template>
  <div
    :class="`tools-action-btns-container${ activeClass }`"
  >
    <div class="actions-wrapper">

      <div class="tools-actions-title-container">
        <h3 v-if="showMenu" class="tootls-title">
          <div class="tool-content-title-btns">
            <div class="menu-dropdown-btn">
              <baseDropdown
                :class="`action-btn`"
                :img="require(`@/assets/images/icons/shapes/${ this.currentSelectedItem?.shape ?? 'square' }_icon.png`) ?? ''"
                :btnClass="'shape_selector-btn divdraw'"
                :id="'border_type-dropdown'"
                :multiple="true"
              >
                <BaseDropdownContent
                  class="fix-center border"
                  id="border_selector"
                >
                  <BaseDropdownItem
                    :name="`square`"
                    :value="`square`"
                    :img="require(`@/assets/images/icons/shapes/square_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'square'"
                    @click.prevent="handleClickOnShape('square')"
                    @touchstart.prevent="handleClickOnShape('square')"
                    :class="`action-btn square-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`round`"
                    :value="`round`"
                    :img="require(`@/assets/images/icons/shapes/round_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'round'"
                    @click.prevent="handleClickOnShape('round')"
                    @touchstart.prevent="handleClickOnShape('round')"
                    :class="`action-btn round-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`half_round`"
                    :value="`half_round`"
                    :img="require(`@/assets/images/icons/shapes/half_round_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'half_round'"
                    @click.prevent="handleClickOnShape('half_round')"
                    @touchstart.prevent="handleClickOnShape('half_round')"
                    :class="`action-btn half-round-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`trapeze`"
                    :value="`trapeze`"
                    :img="require(`@/assets/images/icons/shapes/trapeze_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'trapeze'"
                    @click.prevent="handleClickOnShape('trapeze')"
                    @touchstart.prevent="handleClickOnShape('trapeze')"
                    :class="`action-btn trapeze-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`triangle`"
                    :value="`triangle`"
                    :img="require(`@/assets/images/icons/shapes/triangle_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'triangle'"
                    @click.prevent="handleClickOnShape('triangle')"
                    @touchstart.prevent="handleClickOnShape('triangle')"
                    :class="`action-btn triangle-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`losange`"
                    :value="`losange`"
                    :img="require(`@/assets/images/icons/shapes/losange_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'losange'"
                    @click.prevent="handleClickOnShape('losange')"
                    @touchstart.prevent="handleClickOnShape('losange')"
                    :class="`action-btn losange-btn divdraw`"
                  />
                  <BaseDropdownItem
                    :name="`line`"
                    :value="`line`"
                    :img="require(`@/assets/images/icons/shapes/line_icon.png`) ?? ''"
                    :active="this.currentSelectedItem?.shape === 'line'"
                    @click.prevent="handleClickOnShape('line')"
                    @touchstart.prevent="handleClickOnShape('line')"
                    :class="`action-btn line-btn divdraw`"
                  />
                </BaseDropdownContent>
              </baseDropdown>
              <div class="menu-dropdown-btn-corner"></div>
            </div>
          </div>
          <span class="text">
            {{ $t("shape_items_tool") }}
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
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- line -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  @click.prevent="handleClickOnLineShapeElement"
                  @touchstart.prevent="handleClickOnLineShapeElement"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/line_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">
                  {{ $t("line_shape") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${this.currentSelectedItem?.shape != 'line' ? ' disabled' : ''}
                `"
                :disabled="currentSelectedItem?.shape != 'line'"
                @click.prevent="handleClickOnLineWidthBtn(-2)"
                @touchstart.prevent="handleClickOnLineWidthBtn(-2)"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :value="`${parseInt( currentSelectedItem?.line_width ?? 0 )}`"
                  placeholder="--"
                  :class="`
                    ${this.currentSelectedItem?.shape != 'line' ? ' disabled' : ''}
                  `"
                  :disabled="currentSelectedItem?.shape != 'line'"
                  @blur="handleTypeLineWidth"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                />
                <span class="text-suffix">px</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${this.currentSelectedItem?.shape != 'line' ? ' disabled' : ''}
                `"
                :disabled="currentSelectedItem?.shape != 'line'"
                @click.prevent="handleClickOnLineWidthBtn(2)"
                @touchstart.prevent="handleClickOnLineWidthBtn(2)"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- angles -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  v-if="getAngleTypeLeft === 'top_left'"
                  class="icon-triangle-container"
                  @click.prevent="handleClickOnAngleShapeElement(100, 'top_left')"
                  @touchstart.prevent="handleClickOnAngleShapeElement(100, 'top_left')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/triangle_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <button
                  v-else
                  class="icon-triangle-container"
                  @click.prevent="handleClickOnAngleShapeElement(100, 'top_left')"
                  @touchstart.prevent="handleClickOnAngleShapeElement(100, 'top_left')"
                >
                  <div class="icon divdraw">
                    <img
                      :src="require(`@/assets/images/icons/shapes/triangle_left_icon.png`) ?? ''"
                      alt=""
                      class="img-icon divdraw"
                      :style="'transform: rotate(180deg);'"
                    >
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span v-if="getAngleTypeLeft === 'top_left'" class="text">
                  {{ $t("triangle_shape_top_left") }}
                </span>
                <span v-else class="text">
                  {{ $t("triangle_shape_bottom_left") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                class="tool-action-btn"
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'triangle'
                    && this.currentSelectedItem?.shape != 'trapeze'
                    && this.currentSelectedItem?.shape != 'losange'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'triangle'
                  && currentSelectedItem?.shape != 'trapeze'
                  && currentSelectedItem?.shape != 'losange'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnAngleShapeElement(-5, 'top_left')"
                @touchstart.prevent="handleClickOnAngleShapeElement(-5, 'top_left')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'triangle'
                      && this.currentSelectedItem?.shape != 'trapeze'
                      && this.currentSelectedItem?.shape != 'losange'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'triangle'
                    && currentSelectedItem?.shape != 'trapeze'
                    && currentSelectedItem?.shape != 'losange'
                    && currentSelectedItem?.shape != 'square'
                  "
                  :value="getAngleRatio('top_left')"
                  placeholder="--"
                  @blur="handleTypeAngleShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="top_left"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'triangle'
                    && this.currentSelectedItem?.shape != 'trapeze'
                    && this.currentSelectedItem?.shape != 'losange'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'triangle'
                  && currentSelectedItem?.shape != 'trapeze'
                  && currentSelectedItem?.shape != 'losange'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnAngleShapeElement(5, 'top_left')"
                @touchstart.prevent="handleClickOnAngleShapeElement(5, 'top_left')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- angles -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  v-if="getAngleTypeRight === 'top_right'"
                  class="icon-triangle-container"
                  @click.prevent="handleClickOnAngleShapeElement(100, 'top_right')"
                  @touchstart.prevent="handleClickOnAngleShapeElement(100, 'top_right')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/triangle_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <button
                  v-else
                  class="icon-triangle-container"
                  @click.prevent="handleClickOnAngleShapeElement(100, 'top_right')"
                  @touchstart.prevent="handleClickOnAngleShapeElement(100, 'top_right')"
                >
                  <div class="icon divdraw">
                    <img
                      :src="require(`@/assets/images/icons/shapes/triangle_right_icon.png`) ?? ''"
                      alt="" 
                      class="img-icon divdraw"
                      style="transform: rotate(180deg);"
                    >
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span v-if="getAngleTypeRight === 'top_right'" class="text">
                  {{ $t("triangle_shape_top_right") }}
                </span>
                <span v-else class="text">
                  {{ $t("triangle_shape_bottom_right") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'triangle'
                    && this.currentSelectedItem?.shape != 'trapeze'
                    && this.currentSelectedItem?.shape != 'losange'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'triangle'
                  && currentSelectedItem?.shape != 'trapeze'
                  && currentSelectedItem?.shape != 'losange'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnAngleShapeElement(-5, 'top_right')"
                @touchstart.prevent="handleClickOnAngleShapeElement(-5, 'top_right')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  ref="textInput"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'triangle'
                      && this.currentSelectedItem?.shape != 'trapeze'
                      && this.currentSelectedItem?.shape != 'losange'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'triangle'
                    && currentSelectedItem?.shape != 'trapeze'
                    && currentSelectedItem?.shape != 'losange'
                    && currentSelectedItem?.shape != 'square'
                  "
                  :value="getAngleRatio('top_right')"
                  placeholder="--"
                  @blur="handleTypeAngleShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="top_right"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'triangle'
                    && this.currentSelectedItem?.shape != 'trapeze'
                    && this.currentSelectedItem?.shape != 'losange'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'triangle'
                  && currentSelectedItem?.shape != 'trapeze'
                  && currentSelectedItem?.shape != 'losange'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnAngleShapeElement(5, 'top_right')"
                @touchstart.prevent="handleClickOnAngleShapeElement(5, 'top_right')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- round -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  class="icon-round-container tool-action-btn"
                  @click.prevent="handleClickOnRoundShapeElement(100, 'tl', 'quarter')"
                  @touchstart.prevent="handleClickOnRoundShapeElement(100, 'tl', 'quarter')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/round_top_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">
                  {{ $t("round_shape_top_right") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'half_round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'half_round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(-5, 'tl')"
                @touchstart.prevent="handleClickOnRoundShapeElement(-5, 'tl')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'half_round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'round'
                    && currentSelectedItem?.shape != 'half_round'
                    && currentSelectedItem?.shape != 'square'
                  "
                  :value="`${parseInt(currentSelectedItem?.round_ratio?.tl ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeRoundShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="tl"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'half_round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'half_round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(5, 'tl')"
                @touchstart.prevent="handleClickOnRoundShapeElement(5, 'tl')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- round -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  class="icon-round-container tool-action-btn"
                  @click.prevent="handleClickOnRoundShapeElement(100, 'tr', 'quarter')"
                  @touchstart.prevent="handleClickOnRoundShapeElement(100, 'tr', 'quarter')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/round_top_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">
                  {{ $t("round_shape_top_left") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'half_round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'half_round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(-5, 'tr')"
                @touchstart.prevent="handleClickOnRoundShapeElement(-5, 'tr')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  ref="textInput"
                  type="text"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'half_round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'round'
                    && currentSelectedItem?.shape != 'half_round'
                    && currentSelectedItem?.shape != 'square'
                  "
                  :value="`${parseInt(currentSelectedItem?.round_ratio?.tr ?? 0)}`"
                  placeholder="--"
                  @blur="handleTypeRoundShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="tr"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'half_round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'half_round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(5, 'tr')"
                @touchstart.prevent="handleClickOnRoundShapeElement(5, 'tr')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- round -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  :class="`
                    icon-round-container tool-action-btn
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  class=""
                  @click.prevent="handleClickOnRoundShapeElement(100, 'br', 'quarter')"
                  @touchstart.prevent="handleClickOnRoundShapeElement(100, 'br', 'quarter')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/round_bottom_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">
                  {{ $t("round_shape_bottom_right") }}
                </span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(-5, 'br')"
                @touchstart.prevent="handleClickOnRoundShapeElement(-5, 'br')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  :value="`${parseInt(currentSelectedItem?.round_ratio?.br ?? 0)}`"
                  placeholder="--"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'round'
                    && currentSelectedItem?.shape != 'square'
                  "
                  @blur="handleTypeRoundShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="br"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(5, 'br')"
                @touchstart.prevent="handleClickOnRoundShapeElement(5, 'br')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/plus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row align-center">
          <!-- round -->
          <div class="tool-content full-row">
            <h5 class="tool-content-title space-r">
              <div class="tool-content-title-btns">
                <button
                  :class="`
                    icon-round-container tool-action-btn
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  @click.prevent="handleClickOnRoundShapeElement(100, 'bl', 'quarter')"
                  @touchstart.prevent="handleClickOnRoundShapeElement(100, 'bl', 'quarter')"
                >
                  <div class="icon divdraw">
                    <img :src="require(`@/assets/images/icons/shapes/round_bottom_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">{{ $t("round_shape_bottom_left") }}</span>
              </span>
            </h5>
            <div class="tool-content-btns">
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(-5, 'bl')"
                @touchstart.prevent="handleClickOnRoundShapeElement(-5, 'bl')"
              >
                <div class="icon divdraw">
                  <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <div class="text-input-container">
                <input
                  type="text"
                  :value="`${parseInt(currentSelectedItem?.round_ratio?.bl ?? 0)}`"
                  placeholder="--"
                  :class="`
                    ${
                      this.currentSelectedItem?.shape != 'round'
                      && this.currentSelectedItem?.shape != 'square'
                      ? ' disabled' : ''
                    }
                  `"
                  :disabled="
                    currentSelectedItem?.shape != 'round'
                    && currentSelectedItem?.shape != 'square'
                  "
                  @blur="handleTypeRoundShape"
                  @keyup.enter="onPressEnter"
                  @focus="handleFocusTextInput"
                  data-type="bl"
                />
                <span class="text-suffix">%</span>
              </div>
              <button
                :class="`
                  tool-action-btn
                  ${
                    this.currentSelectedItem?.shape != 'round'
                    && this.currentSelectedItem?.shape != 'square'
                    ? ' disabled' : ''
                  }
                `"
                :disabled="
                  currentSelectedItem?.shape != 'round'
                  && currentSelectedItem?.shape != 'square'
                "
                @click.prevent="handleClickOnRoundShapeElement(5, 'bl')"
                @touchstart.prevent="handleClickOnRoundShapeElement(5, 'bl')"
              >
                <div class="icon divdraw">
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
import baseDropdown from "@/components/dropdown/base-dropdown/BaseDropdown.vue";
import BaseDropdownContent from "@/components/dropdown/base-dropdown/BaseDropdownContent.vue";
import BaseDropdownItem from "@/components/dropdown/base-dropdown/BaseDropdownItem.vue";

import shapeUtils from "@/assets/js/utils/shapeUtils.js";

export default {
  name: "ShapeElementsMenu",
  components: {
    baseDropdown,
    BaseDropdownContent,
    BaseDropdownItem,
  },
  props: {
    currentSelectedItem: Object,
    oppenedMenu: String,
    lastShape : String,
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
    getCurrentShape() {
      return this.currentSelectedItem?.shape ?? "";
    },
    getAngleTypeLeft() {
      if (this.currentSelectedItem?.angle_ratio?.top_left >= this.currentSelectedItem?.angle_ratio?.bottom_left) {
        return "top_left";
      }
      return "bottom_left";
    },

    getAngleTypeRight() {
      if (this.currentSelectedItem?.angle_ratio?.top_right >= this.currentSelectedItem?.angle_ratio?.bottom_right) {
        return "top_right";
      }
      return "bottom_right";
    },
  },

  emits: [
    "shape-angle-element",
    "menu-input-focus",
    "close-side-menus",
    "element-shape-selector",
    "set-line-width",
    "shape-angle-element-btn",
    "shape-round-element-btn",
  ],

  methods: {


    handleFocusTextInput() {
      this.$emit("menu-input-focus", true);
    },

    handleClickOnCloseMenu() {
      this.activeClass = "";
      setTimeout(()=>{
        this.$emit("close-side-menus", "");
      }, 100)
    },

    handleClickOnShape(type) {
      if (this.currentSelectedItem) {
        this.$emit("element-shape-selector", type);
      }
    },

    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    // --------------------------------------------------- //
    // LINE SHAPE --------------------------------------- //
    // ------------------------------------------------- //
    handleClickOnLineWidthBtn(value) {
      this.$emit("set-line-width", (this.currentSelectedItem?.line_width ?? 0) + value);
    },

    handleClickOnLineShapeElement() {
      this.$emit("element-shape-selector", "line");
    },

    handleTypeLineWidth(evt) {
      let value = parseInt(evt.currentTarget.value);
      this.$emit("set-line-width", parseInt(value));
      this.$emit("menu-input-focus", true);
    },

    // --------------------------------------------------- //
    // ANGLE SHAPE -------------------------------------- //
    // ------------------------------------------------- //


    getAngleRatio(type) {
      if (this.currentSelectedItem) {
        let valueToReturn = 0;
        if (type === "top_left" && this.currentSelectedItem.angle_ratio["bottom_left"] > 0) {
          valueToReturn = this.currentSelectedItem?.angle_ratio["bottom_left"];
        } else if (type === "top_right" && this.currentSelectedItem.angle_ratio["bottom_right"] > 0) {
          valueToReturn = this.currentSelectedItem?.angle_ratio["bottom_right"];
        } else {
          valueToReturn = this.currentSelectedItem?.angle_ratio[type] ?? 0;
        }
        return parseInt(valueToReturn);
      }
    },
    
    handleClickOnAngleShapeElement(value, type) {
      this.angleTypeRight = type;
      if (this.currentSelectedItem?.angle_ratio[type] + value < 0) {
        if (type === "top_left") {
          type = "bottom_left";
        } else if (type === "top_right") {
          type = "bottom_right";
        }
        value *= -1;
      } else {
        if (type === "top_left" && this.currentSelectedItem?.angle_ratio["bottom_left"] > 0) {
          value *= -1;
          type = "bottom_left";
        } else if (type === "top_right" && this.currentSelectedItem?.angle_ratio["bottom_right"] > 0) {
          value *= -1;
          type = "bottom_right";
        }
      }
      this.$emit("shape-angle-element-btn", {
        value: value,
        type: type,
      });
    },

    handleTypeAngleShape(evt) {
      evt.preventDefault();
      let value = parseInt(evt.currentTarget.value);
      let type = evt.currentTarget.dataset.type;
      if (this.currentSelectedItem?.angle_ratio[type] + value < 0) {
        if (type === "top_left") {
          type = "bottom_left";
        } else if (type === "top_right") {
          type = "bottom_right";
        }
        value *= -1;
      } else {
        if (type === "top_left" && this.currentSelectedItem?.angle_ratio["bottom_left"] > 0) {
          value *= -1;
          type = "bottom_left";
        } else if (type === "top_right" && this.currentSelectedItem?.angle_ratio["bottom_right"] > 0) {
          value *= -1;
          type = "bottom_right";
        }
      }
      this.$emit("shape-angle-element", {
        value: value,
        type: type,
      });
      this.$emit("menu-input-focus", true);
    },

    // --------------------------------------------------- //
    // ROUND SHAPE -------------------------------------- //
    // ------------------------------------------------- //
    handleClickOnRoundShapeElement(value, type, subType = false) {
      this.$emit("shape-round-element-btn", {
        value: value,
        type: type,
        sub_type: subType,
      });
    },

    handleTypeRoundShape(evt) {
      evt.preventDefault();
      let value = parseInt(evt.currentTarget.value);
      let type = evt.currentTarget.dataset.type;
      this.$emit("shape-round-element", {
        value: shapeUtils.getLimitedValueToSet(value),
        type: type,
      });
      this.$emit("menu-input-focus", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.tools-action-btns-container {

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

  .icon-trapeze-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--btn-size);
    width: var(--btn-size);
    --icon-size: calc(var(--btn-size) * 0.4);

    .icon-trapeze {
      width: var(--icon-size);
      border-left: solid calc(var(--icon-size) * 0.2) transparent;
      border-right: solid calc(var(--icon-size) * 0.2) transparent;
      border-bottom: solid var(--icon-size) var(--base-color-1);
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
