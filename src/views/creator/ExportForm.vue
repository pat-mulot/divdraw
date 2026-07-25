<template>
  <div
    :class="`export-form-container${ this.show ? ' show' : '' }`"
  >
    <div
      class="clickable_background"
      @click.prevent="handleHideExportForm"
      @touchend.prevent="handleHideExportForm"
    >
    </div>
    <div
      :class="`export-form-content`"
    >
      <!-- ------------------ HEADER ------------------ -->
      <div class="export-form-header" >
        <div
          class="export-form-title-container">
          <h3 class="export-form-title" >{{ $t("export_file_form") }}</h3>
          <button
            class="close-btn export-form-btn"
            @click.prevent="handleHideExportForm"
            @touchend.prevent="handleHideExportForm"
          >
            <fa icon="times" />
          </button>
        </div>
      </div>
      <!-- ------------------ BODY ------------------ -->
      <div class="export-form-body" >
        <!-- -------------- BOX -------------- -->
        <div class="export-form-box">
          <!-- -------------- BOX TITLE -------------- -->
          <div class="export-form-box-title-container">
            <h4 class="export-form-box-title">
              <div class="icon"><fa icon="image" /></div>
              <span class="text">{{ $t("export_size") }}</span>
            </h4>
          </div>
          <!-- -------------- BOX ROW -------------- -->
          <div class="export-form-row align-center">
            <div class="grouped-content">
              <div class="export-form-text-container">
                <span class="icon"><fa icon="link" /></span>
                <span class="text">{{ $t("maintain_ratio") }}</span>
              </div>
              <div class="export-form-input-container">
                <input
                  type="checkbox"
                  class="tool-checkbox export-size-radio-btn"
                  :checked="maintainRatio"
                  @change.prevent="handleClickOnMaintainRatio"
                >
              </div>
            </div>
            <div class="export-form-input-container">
              <button
                :class="`
                export_for-btn
                restore-size-radio-btn
                ${ this.exportSizeCoef.height != 1 || this.exportSizeCoef.width != 1 ? '' : ' disabled' }
                `"
                @click.prevent="handleClickOnResetExportSize"
                @touchstart.prevent="handleClickOnResetExportSize"
              >
                <fa :icon="'fa-rotate-left'" />
              </button>
            </div>
          </div>
          <!-- -------------- BOX ROW -------------- -->
          <div class="export-form-row align-center">
            <div class="export-form-text-container">
              <span class="export-form-text">{{ $t("export_height") }}</span>
              <span class="icon"><fa icon="arrows-v" /></span>
            </div>
            <div class="export-form-input-container">
              <div class="export-form-input-row">
                <button
                  class="export_for-btn"
                  @click.prevent="handleClickOnExportSize(-1, 'height')"
                  @touchstart.prevent="handleClickOnExportSize(-1, 'height')"
                >
                  <fa :icon="'minus'" />
                </button>
                <div class="text-input-container">
                  <input
                    ref="textInput"
                    type="text"
                    :value="getExportHeight"
                    placeholder="---"
                    @blur="handleTypeExportSize($event, 'height')"
                    @keyup.enter="onPressEnter"
                    @focus="handleFocusTextInput"
                    class="text-input"
                  />
                </div>
                <button
                  class="export_for-btn"
                  @click.prevent="handleClickOnExportSize(1, 'height')"
                  @touchstart.prevent="handleClickOnExportSize(1, 'height')"
                >
                  <fa :icon="'plus'" />
                </button>
              </div>
            </div>
          </div>
          <!-- -------------- BOX ROW -------------- -->
          <div class="export-form-row align-center">
            <div class="export-form-text-container">
              <span class="export-form-text">{{ $t("export_width") }}</span>
              <span class="icon"><fa icon="arrows-h" /></span>
            </div>
            <div class="export-form-input-container">
              <div class="export-form-input-row">
                <button
                  class="export_for-btn"
                  @click.prevent="handleClickOnExportSize(-1, 'width')"
                  @touchstart.prevent="handleClickOnExportSize(-1, 'width')"
                >
                  <fa :icon="'minus'" />
                </button>
                <div class="text-input-container">
                  <input
                    ref="textInput"
                    type="text"
                    :value="getExportWidth"
                    placeholder="--"
                    @blur="handleTypeExportSize($event, 'width')"
                    @keyup.enter="onPressEnter"
                    @focus="handleFocusTextInput"
                    class="text-input"
                  />
                </div>
                <button
                  class="export_for-btn"
                  @click.prevent="handleClickOnExportSize(1, 'width')"
                  @touchstart.prevent="handleClickOnExportSize(1, 'width')"
                >
                  <fa :icon="'plus'" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- -------------- BOX -------------- -->
        <div class="export-form-box">
          <!-- ------------------ ROW ------------------ -->
          <div class="export-form-row">
            <div class="export-form-text-container">
              <span class="export-form-text">
                {{ $t("export_filename") }}
              </span>
            </div>
            <div class="export-form-input-container">
              <input
                type="text"
                class="text-input"
                :value="getFileNameValue"
                @input="handleTypeFileName"
              >
            </div>
          </div>
          <!-- ------------------ ROW ------------------ -->
          <div
            v-if="type === 'render'"
            class="export-form-row"
          >
            <div class="export-form-text-container">
              <span class="export-form-text">
                {{ $t("export_type_select") }}
              </span>
            </div>
            <div class="export-form-input-container">
              <div class="select-file-btn menu-select-btn">
                <baseSelect
                  :class="`action-btn`"
                  :icon="'caret-down'"
                  :btnClass="'menu-select-selector-btn'"
                  :selected="getFileTypeValue"
                  v-on:selected-option="setSelectedFiletype"
                >
                  <BaseSelectContent
                    class="fix-center border menu-select-selector"
                  >
                    <BaseSelectItem
                      v-for="item in fileTypesList"
                      :key="item.value"
                      :class="`action-btn text-on-icon`"
                      :option="item"
                    />
                  </BaseSelectContent>
                </baseSelect>
                <div class="menu-select-btn-corner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ------------------ FOOTER ------------------ -->
      <div class="export-form-footer" >
        <div class="btns-container">
          <button
            class="export_for-btn danger"
            @click="cancelAction"
            @touchend="cancelAction"
          >
            <span class="text">{{ $t("cancel_btn") }}</span>
            <span class="icon"><fa icon="times" /></span>
            </button>
          <button
            class="export_for-btn success"
            @click="confirmAction"
            @touchend="confirmAction"
          >
            <span class="text">{{ $t("confirm_btn") }}</span>
            <span class="icon"><fa icon="check" /></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseSelect from "@/components/form/selects/base-select/BaseSelect.vue";
import BaseSelectContent from "@/components/form/selects/base-select/BaseSelectContent.vue";
import BaseSelectItem from "@/components/form/selects/base-select/BaseSelectItem.vue";

export default {
  name: "ExportForm",
  components: {
    baseSelect,
    BaseSelectContent,
    BaseSelectItem,
  },
  
  props: {
    show: Boolean,
    selectedFileType: String,
    selectedFileName: String,
    type: String,
    maintainRatio: Boolean,
    exportSizeCoef: {},
    containerSize: {},
  },

  data() {
    return {
      fileName: "",
      fileType: "png",
      fileTypesList: [
        {
          name : "--",
          text : "--",
          value : null,
        },
        {
          icon: "image",
          value: "png",
          text: "PNG",
          name: "PNG",
        },
        {
          icon: "image",
          value: "svg",
          text: "SVG",
          name: "SVG",
        },
      ],
      exportWidth: 0,
      exportHeight: 0,
    };
  },

  computed: {
    getFileNameValue() {
      return this.selectedFileName;
    },

    getExportWidth() {
      return Math.ceil((this.containerSize?.width ?? 0) * this.exportSizeCoef.width);
    },

    getExportHeight() {
      return Math.ceil((this.containerSize?.height ?? 0) * this.exportSizeCoef.height);
    },
                
    getFileTypeValue() {
      let fileTypeToSet = this.selectedFileType;
      if (!fileTypeToSet) fileTypeToSet = this.fileType;
      const currentFileType = this.fileTypesList.find(type => type.value === fileTypeToSet);
      return currentFileType;
    },
  },
  methods: {

    updateExportScaleSize(fromSize,toSize, type) {
      // const scaledSize2 = (toSize / fromSize);
      const scaledSize = parseInt((toSize * 10000) / fromSize) / 10000;
      let exportSizeCoefToSet = {
        height: this.exportSizeCoef.height,
        width: this.exportSizeCoef.width,
      }
      if (scaledSize > 0 && toSize < this.containerSize[type]) {
        if (this.maintainRatio) {
          exportSizeCoefToSet.height = scaledSize;
          exportSizeCoefToSet.width = scaledSize;
        } else {
          exportSizeCoefToSet[type] = scaledSize;
        }
      }
      this.$emit("export-size", exportSizeCoefToSet);
      this.$emit("menu-input-focus", true);
    },

    handleClickOnMaintainRatio() {
      this.$emit("set-export-aspect-ratio");
    },

    handleClickOnResetExportSize() {
      this.$emit("export-size", {
        height: 1,
        width: 1,
      });
    },

    handleClickOnExportSize(dirValue, type) {
      const fromSize = this.containerSize[type];
      const toSize = (fromSize * this.exportSizeCoef[type]) + (dirValue * 16);
      this.updateExportScaleSize(fromSize,toSize,type);
    },

    handleTypeExportSize(evt, type) {
      const fromSize = this.containerSize[type];
      const toSize = evt.currentTarget?.value ?? 0;
      this.updateExportScaleSize(fromSize,toSize,type);
    },

    onPressEnter(evt) {
      evt.currentTarget.blur();
    },
    
    handleFocusTextInput() {
      this.$emit("menu-input-focus", true);
    },

    cancelAction() {
      this.handleHideExportForm();
    },

    confirmAction() {
      this.$emit("export-file", {
        filename: this.getFileNameValue,
        filetype: this.getFileTypeValue,
        export_type: this.type ?? null,
      });
      this.handleHideExportForm();
    },

    handleHideExportForm() {
      this.$emit("show-export-form");
    },

    handleTypeFileName(evt) {
      evt.preventDefault();
      let fileName = evt.currentTarget.value;
      if (fileName) {
        fileName = fileName.replace(/[^\w\s]/gi, '_');
        fileName = fileName.replace(/\s/g, '_');
      }
      this.$emit("set-export-settings", {
        type: "filename",
        value: fileName,
      });
    },

    setSelectedFiletype(fileType) {
      this.$emit("set-export-settings", {
        type: "extension",
        value: fileType.value,
      });
    },
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/main.scss";

.export-form-container {
  @include flex-center-col;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  color: var(--bk-90);
  opacity: 0;
  transform: scale(0.95);
  visibility: hidden;
  transition: transform .1s ease, opacity .1s ease, .1s visibility 0s ease;

  .clickable_background {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;
    width: 100%;
    cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
    z-index: -1;
  }

  .export_for-btn {
    line-height: 0;
    @include flex-center-row;
    background-color: var(--btn-bg-1);
    outline: none;
    height: var(--btn-size);
    padding: var(--gap-1-2);
    color: var(--bk-70);
    border: solid var(--border-sz-1) var(--bk-30);
    box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;

    .text {
      margin-right: var(--gap-1-2);
    }
  }

  &.show {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }


  .export-form-content {
    max-width: calc(100% - (var(--gap-2) * 2));
    background-color: var(--wt-70);
    box-shadow: 0 0 0.25rem var(--wt-90) inset, 0 0 0.25rem var(--bk-50);

    .export-form-header {

      .export-form-title-container {
        @include flex-center-row;
        border-bottom: solid var(--border-sz-1) var(--bk-10);
        margin: var(--gap-1-4);
        padding-bottom: var(--gap-1-2);
        
        .export-form-title {
          @include flex-center-row;
          width: 100%;
          padding: var(--gap-1-2);
          margin-right: var(--gap-1-4);
        }

        .close-btn {
          height: var(--btn-size);
          width: var(--btn-size);
          border:none;
          background-color: transparent;
          box-shadow: none;
          color: var(--bk-70);
          box-shadow: 0 0 2px var(--bk-50) inset;
        }
      }
    }

    // BODY ---------------------
    .export-form-body {
      margin: var(--gap-1-2);
      padding: var(--gap-1-2) 0;
      @include flex-center-col;

      .export-form-box {
        @include flex-center-col;
        width: 100%;
        border-bottom: solid var(--border-sz-1) var(--bk-10);

        .export-form-box-title-container {
          width: 100%;
          margin-bottom: var(--gap-1-2);

          .export-form-box-title {
            @include flex-center-row;
            width: 100%;

            .text {
              margin-left: var(--gap-2);
              background-color: var(--bk-15);
            @include flex-center-row;
              height: var(--btn-size);
              width: 100%;
            }
          }
        }

        .export-form-row {
          padding: var(--gap-1-2);
          @include flex-between-row;
          width: 100%;

          .grouped-content {
            @include flex-center-row;
            box-shadow: 0 0 2px var(--bk-50) inset;
            height: var(--btn-size);
            padding: var(--gap-1-2);

            .export-form-text-container {
              margin-right: var(--gap-2);

              .text {
                margin-left: var(--gap-1-2);
              }
            }
          }

          .export-form-text-container {
            margin-right: var(--gap-2);

            .export-form-text {
              margin-right: var(--gap-1-2);
            }
          }

          .export-form-input-container {

            .export-form-input-row {
              @include flex-center-row;

              .text-input {
                border-left: none;
                border-right: none;
              }
            }

            .text-input {
              color: var(--bk-70);
              @include flex-center-row;
              width:100%;
              border: solid var(--border-sz-1) var(--bk-40);
              text-align: center;
              height: var(--btn-size);
              background-color: transparent;
            }
          }
        }
      }
    }

    // FOTER ---------------------
    .export-form-footer {
      margin: var(--gap-2);

      .btns-container {
        @include flex-between-row;
      }
    }
  }

  .toogler-btn {
    line-height: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: var(--btn-size);
    outline: none;
    padding: 0;

    .text {
      padding: var(--gap-1-2);
      border: solid var(--border-sz-1) var(--bk-40);
      border-right: none;
      display:flex;
      @include flex-center-row;
      height: 100%;
    }

    .toogler-btn-icon {
      display:flex;
      @include flex-center-row;
      height: var(--btn-size);
      width: var(--btn-size);
      background-color: var(--btn-bg-1);
      border: solid var(--border-sz-1) var(--bk-30);
      box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
    }
  }
}

</style>

