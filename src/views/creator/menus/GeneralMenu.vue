<template>
  <div class="general-menu-container top-menu-bloc" ref="GeneralMenu">
    
    <!-- ---------------- SAVE ALL ---------------- -->
    <div class="actions-group-btns file-group-btns">
      <div class="dropdown-file-btn menu-dropdown-btn">
        <baseDropdown
          :class="`action-btn`"
          :btnClass="'menu-dropdown-selector-btn divdraw'"
          :img="require(`@/assets/images/icons/photo_icon.png`)"
        >
          <BaseDropdownContent
            class="fix-center border menu-dropdown-selector"
          >
            <!-- ---------------- LOAD AS ---------------- -->
            <div
              :class="`action-btn dropdown-item file-btn`"
            >
              <button
                @click.prevent="handleClickOnLoadFile"
                @touchstart.prevent="handleClickOnLoadFile"
                :class="`dropdown-item-btn`"
              >
                <span class="text">{{ $t('open_as') }}</span>
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/file_upload_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
              </button>
              <input ref="fileInput" type="file" style="display: none;" @change="handleFileChange">
            </div>
            <!-- ---------------- SAVE AS ---------------- -->
            <BaseDropdownItem
              :img="require(`@/assets/images/icons/file_download_icon.png`) ?? ''"
              @[getClickFileHandler].prevent="handleClickOnExport"
              @[getTouchFileHandler].prevent="handleClickOnExport"
              :class="`action-btn ${this.itemsNb == 0 ? ' disabled' : ''} divdraw`"
              :disabled="itemsNb == 0"
              :text="$t('save_as')"
            />
            <!-- ---------------- EXPORT ---------------- -->
            <BaseDropdownItem
              :img="require(`@/assets/images/icons/photo_icon.png`) ?? ''"
              @[getClickFileHandler].prevent="handleClickOnRender"
              @[getTouchFileHandler].prevent="handleClickOnRender"
              :class="`action-btn ${this.itemsNb == 0 ? ' disabled' : ''} divdraw`"
              :disabled="itemsNb == 0"
              :text="$t('export_as')"
            />
            <!-- ---------------- SAVE ALL ---------------- -->
            <li :class="`action-btn dropdown-item file-btn`" >
              <button
                :class="`dropdown-item-btn${this.itemsNb == 0 ? ' disabled' : ''}`"
                @[getClickFileHandler].prevent="handleClickOnSave"
                @[getTouchFileHandler].prevent="handleClickOnSave"
              >
                <span class="text">{{ $t('save_local') }}</span>
                <div class="icon">
                  <img :src="require(`@/assets/images/icons/floppy_disk_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                </div>
                <span v-if="saved" class="icon cancel-icon">
                  <fa :icon="'times'" />
                </span>
              </button>
            </li>
          </BaseDropdownContent>
        </baseDropdown>
        <div class="menu-dropdown-btn-corner"></div>
      </div>
    </div>
    <!-- ---------------- UNDO / REDO ---------------- -->
    <div class="actions-group-btns">
      <button
        :class="`action-btn${this.historyDatas.index === 0 ? ' disabled' : ''}`"
        @click.prevent="handleClickOnUndo"
        @touchstart.prevent="handleClickOnUndo"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/rotate_left_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
      <button
        :class="`action-btn${this.historyDatas.index >= this.historyDatas.length -1 ? ' disabled' : ''}`"
        @click.prevent="handleClickOnRedo"
        @touchstart.prevent="handleClickOnRedo"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/rotate_right_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
    </div>
    <!-- --------------- CURSOR SELECTOR --------------- -->
    <div class="dropdown-cursor-btn menu-dropdown-btn">
      <baseDropdown
        :class="`action-btn divdraw`"
        :img="require(`@/assets/images/icons/${ getCurrentSelectedCursor.img }.png`) ?? ''"
        :btnClass="'menu-dropdown-selector-btn divdraw'"
        >
        <BaseDropdownContent
          class="fix-center border menu-dropdown-selector"
        >
          <BaseDropdownItem
            :name="`cursor`"
            :value="`cursor`"
            :img="require(`@/assets/images/icons/cursor_icon_bk.png`) ?? ''"
            :active="getCurrentSelectedCursor.value === 'cursor'"
            @click.prevent="handleClickOnCursorType('cursor')"
            @touchstart.prevent="handleClickOnCursorType('cursor')"
            :class="`action-btn divdraw`"
          />
          <BaseDropdownItem
            :name="`grab`"
            :value="`grab`"
            :img="require(`@/assets/images/icons/hand_open_icon_bk.png`) ?? ''"
            :active="getCurrentSelectedCursor.value === 'grab'"
            @click.prevent="handleClickOnCursorType('grab')"
            @touchstart.prevent="handleClickOnCursorType('grab')"
            :class="`action-btn divdraw`"
          />
          <BaseDropdownItem
            :name="`shape`"
            :value="`shape`"
            :img="require(`@/assets/images/icons/shapes_cursor_icon_bk.png`) ?? ''"
            :active="getCurrentSelectedCursor.value === 'shape'"
            @click.prevent="handleClickOnCursorType('shape')"
            @touchstart.prevent="handleClickOnCursorType('shape')"
            :class="`
              action-btn divdraw
              ${ this.getCurrentSelectedElement?.isImg ? ' disabled' : '' }
            `"
          />
          <BaseDropdownItem
            :name="`move`"
            :value="`move`"
            :img="require(`@/assets/images/icons/move_icon.png`) ?? ''"
            :active="getCurrentSelectedCursor.value === 'move'"
            @click.prevent="handleClickOnCursorType('move')"
            @touchstart.prevent="handleClickOnCursorType('move')"
            :class="`action-btn divdraw`"
          />
          <BaseDropdownItem
            :name="`group`"
            :value="`group`"
            :img="require(`@/assets/images/icons/group_plus_cursor_icon_bk.png`) ?? ''"
            :active="getCurrentSelectedCursor.value === 'group'"
            @click.prevent="handleClickOnCursorType('group')"
            @touchstart.prevent="handleClickOnCursorType('group')"
            :class="`action-btn divdraw${ this.itemsNb <= 1 ? ' disabled' : ''}`"
          />
        </BaseDropdownContent>
      </baseDropdown>
      <div class="menu-dropdown-btn-corner"></div>
    </div>
    <div class="actions-group-btns">
      <button
        :class="`action-btn${this.gridEnabled ? ' active' : ''}`"
        @click.prevent="handleClickOnGrid"
        @touchstart.prevent="handleClickOnGrid"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/grid_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
      <div class="grid-size-options">
        <button
          v-if="getDeviceShowHide"
          :class="`action-btn`"
          @click.prevent="handleClickOnMagnetRange(0.5)"
          @touchstart.prevent="handleClickOnMagnetRange(0.5)"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/plus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
        <button
          v-if="getDeviceShowHide"
          :class="`action-btn`"
          @click.prevent="handleClickOnMagnetRange(2)"
          @touchstart.prevent="handleClickOnMagnetRange(2)"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/minus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
      <button
        v-if="getDeviceShowHide"
        :class="`
          action-btn
          ${!this.gridEnabled ? ' disabled' : this.magnetEnabled ? ' active' : ''}
        `"
        @click.prevent="handleClickOnMagnet"
        @touchstart.prevent="handleClickOnMagnet"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/magnet_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
    </div>
    <!-- --------------- RATIO --------------- -->
    <button
      :class="`action-btn${this.aspectRatio ? ' active' : ''}`"
      @click.prevent="handleClickOnMaintainAspectRatio"
      @touchstart.prevent="handleClickOnMaintainAspectRatio"
    >
      <div class="icon">
        <img :src="require(`@/assets/images/icons/percent_icon.png`) ?? ''" alt="" class="img-icon divdraw">
      </div>
    </button>
    <div class="actions-group-btns">
      <!-- ---------------- COPY PASTE ---------------- -->
      <button
        :class="`action-btn${!this.getCurrentSelectedElement || this.getCurrentSelectedElement.id == 0 ? ' disabled' : ''}`"
        :disabled="!this.getCurrentSelectedElement || this.getCurrentSelectedElement.id == 0 || this.getCurrentSelectedElement.isImg"
        ref="snap-btn"
        @click.prevent="handleClickOnCopy"
        @touchstart.prevent="handleClickOnCopy"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/copy_paste_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
      <!-- --------------- ADD ELEMENT --------------- -->
      <button
        :class="`action-btn${this.itemsNb >= this.itemsLimit ? ' disabled' : ''}`"
        ref="add-btn"
        @click.prevent="handleClickOnAddElement"
        @touchstart.prevent="handleClickOnAddElement"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/plus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
      <!-- --------------- DELETE ELEMENT --------------- -->
      <button
        :class="`action-btn${!this.getCurrentSelectedElement || this.getCurrentSelectedElement.id == 0 ? ' disabled' : ''}`"
        ref="remove-btn"
        @click.prevent="handleClickOnRemoveElement"
        @touchstart.prevent="handleClickOnRemoveElement"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/minus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
      <!-- --------------- DELETE ALL --------------- -->
      <button
        :class="`action-btn${this.itemsNb == 0 ? ' disabled' : ''}`"
        ref="remove-btn"
        @click.prevent="handleClickOnRemoveAllElements"
        @touchstart.prevent="handleClickOnRemoveAllElements"
      >
        <div class="icon">
          <img :src="require(`@/assets/images/icons/trash_icon.png`) ?? ''" alt="" class="img-icon divdraw">
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import baseDropdown from "@/components/dropdown/base-dropdown/BaseDropdown.vue";
import BaseDropdownContent from "@/components/dropdown/base-dropdown/BaseDropdownContent.vue";
import BaseDropdownItem from "@/components/dropdown/base-dropdown/BaseDropdownItem.vue";

export default {
  name: "GeneralMenu",
  components: {
    baseDropdown,
    BaseDropdownContent,
    BaseDropdownItem,
  },
  
  props: {
    itemsNb: Number,
    itemsLimit: Number,
    saved: Boolean,
    containerSize: Object,
    gridInterval: Number,
    historyDatas: Object,
    currentSelectedItem: Object,
    isMobile: Boolean,
    groupingState: String,
    currentCursor: String,
  },

  data() {
    return {
      range: {
        min: 4,
        max: 64,
      },
      aspectRatio: false,
      gridEnabled: false,
      magnetEnabled: false,
      selectedCursor: {
        icon: "mouse-pointer",
        value: "cursor",
      },
      // TODO Déplacer dans un fichier de constantes
      cursorsList: {
        // shape: "draw-polygon",
        // cursor: "mouse-pointer",
        // grab: "hand",
        // move: "fa-arrows-up-down-left-right",
        // group: "fa-object-group",
        // ungroup: "fa-object-ungroup",
        shape: "shapes_cursor_icon_bk",
        cursor: "cursor_icon_bk",
        grab: "hand_open_icon_bk",
        move: "move_icon",
        group: "group_plus_cursor_icon_bk",
      },
      gridValue: 0,
      hiddenValues: [],
    };
  },

  computed: {
    getCurrentSelectedCursor() {
      return {
        value : this.currentCursor,
        img : this.cursorsList[this.currentCursor],
      }
    },

    getClickFileHandler() {
      return (this.itemsNb == 0) ? null : "click";
    },

    getTouchFileHandler() {
      return (this.itemsNb == 0) ? null : "touchstart";
    },

    getCurrentSelectedElement() {
      return this.currentSelectedItem;
    },

    getDeviceShowHide() {
      if (this.isMobile) {
        return this.gridEnabled;
      } else {
        return true;
      }
    }
  },

  methods: {
    handleClickOnLoadFile() {
      this.$refs.fileInput.click();
    },

    handleFileChange(evt) {
      const selectedFile = evt.target.files[0];
      if (selectedFile) {
        this.$emit("load-file-menu",selectedFile);
      }
    },

    handleClickOnRender() {
      this.$emit("render-file-menu");
    },

    handleClickOnExport() {
      this.$emit("export-file-menu");
    },

    handleClickOnUndo() {
      this.$emit("histUndo");
    },

    handleClickOnRedo() {
      this.$emit("histRedo");
    },

    handleClickOnCopy() {
      this.$emit("copy-element");
    },

    handleClickOnAddElement(evt) {
      evt.preventDefault();
      this.$emit("add-element", evt);
    },

    handleClickOnRemoveElement(evt) {
      evt.preventDefault();
      this.$emit("remove-element", evt);
    },

    handleClickOnRemoveAllElements(evt) {
      evt.preventDefault();
      this.$emit("remove-all-element", evt);
    },

    handleClickOnMagnet() {
      if (this.magnetEnabled) {
        this.magnetEnabled = false;
      } else {
        this.magnetEnabled = true;
      }
      this.$emit("enable-magnet", this.magnetEnabled);
    },

    handleClickOnSave() {
      this.$emit("save-elements");
    },

    handleClickOnCursorType(type) {
      if (type !== "group" || (type === "group" && this.itemsNb > 1)) {
        if (
          type != "shape"
          || (type === "shape" && !this.getCurrentSelectedElement?.isImg)
        ) {
          this.selectedCursor.icon = this.cursorsList[type];
          this.selectedCursor.value = type;
          this.$emit("selected-cursor", this.selectedCursor.value);
        }
      }
    },
    
    handleClickOnSnap(exportType) {
      this.$emit("get-img", exportType);
    },

    handleClickOnMaintainAspectRatio(evt) {
      evt.preventDefault();
      if (this.aspectRatio) {
        this.aspectRatio = false;
      } else {
        this.aspectRatio = true;
      }
      this.$emit("aspect-ratio", this.aspectRatio);
    },

    getGridRowsNb(size, gridValue = null, type = null) {
      if (!gridValue) gridValue = this.gridInterval;
      const gridHideRange = parseInt((this.range.max / 2) / gridValue);
      let nb = size / (gridValue * 2);
      let nbLeft = nb - parseInt(nb);
      let rows = [0];
      // let rows = [];
      // rows.push(((nbLeft /2 ) * (gridValue * 2)));
      let hiddenValues = [0];
      let gridIndexToHide = 1;
      let lastIndex;
      for (let index = 0; index < nb; index++) {
        if ((gridIndexToHide < (gridHideRange / 1.75))) {
          if (!hiddenValues.includes(index)) hiddenValues.push(index);
          gridIndexToHide++;
        } else {
          gridIndexToHide = 1;
        }
        lastIndex = index;
        const valueToSet = ((nbLeft /2 ) + index) * ((gridValue) * 2);
        if (!rows.includes(valueToSet)) rows.push(valueToSet);
      }
      if (!rows.includes(size)) rows.push(size);
      if (!hiddenValues.includes(lastIndex + 1)) hiddenValues.push(lastIndex + 1);
      if (!hiddenValues.includes(lastIndex + 2)) hiddenValues.push(lastIndex + 2);
      this.$emit("set-hidden-grid-values", {
        values: hiddenValues,
        type: type,
      });
      return rows;
    },

    handleClickOnGrid() {
      if (this.gridEnabled) {
        this.gridEnabled = false;
      } else {
        this.gridEnabled = true;
      }
      this.updateGrid();
    },

    updateGrid(gridValue = null) {
      this.$emit("enable-grid", {
        enable: this.gridEnabled,
        y: this.getGridRowsNb(this.containerSize.height, gridValue, "top"),
        x: this.getGridRowsNb(this.containerSize.width, gridValue, "left"),
      });
    },

    handleClickOnMagnetRange(dirValue) {
      if (
        this.gridInterval * dirValue <= 64
        && this.gridInterval * dirValue >= 4
      ) {
        this.$emit("set-grid-interval", (this.gridInterval * dirValue));
        this.updateGrid((this.gridInterval * dirValue))
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
  .single-cursor-btn {
    display: none;
    @include screen-small {
      display: flex;
    }
  }

</style>