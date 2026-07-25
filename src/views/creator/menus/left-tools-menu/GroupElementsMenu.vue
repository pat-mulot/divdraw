<template>
  <div
    :class="`
      tools-action-btns-container${ activeClass }
    `"
    id="group_elements_menu"
  >
    <div class="actions-wrapper">
      <div class="tools-actions-title-container">
        <h3 v-if="showMenu" class="tootls-title">
          <div class="tool-content-title-btns">
            <button
              :class="`
                menu-btn
              `"
              @click.prevent="handleClickOnNewElementGroup"
              @touchstart.prevent="handleClickOnNewElementGroup"
            >
              <div class="icon tools-title-close-icon">
                <img :src="require(`@/assets/images/icons/plus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
              </div>
            </button>
            <button
              :class="`
                menu-btn
                ${ this.currentCursor === 'group' ? ' active' : ''}
              `"
              @click.prevent="handleClickOnCursorType"
              @touchstart.prevent="handleClickOnCursorType"
            >
              <div class="icon">
                <img class="img-icon divdraw"
                  :src="require(`@/assets/images/icons/group_plus_cursor_icon_bk.png`) ?? ''"
                />
              </div>
            </button>
          </div>
          <span class="text">{{ $t("group_menu_title") }} {{ currentGroupInfos?.name }}</span>
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
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu" class="tools-actions-box-row">
          <div class="tool-content">
            <h5 class="tool-content-title">
              <div class="tool-content-title-btns">
                <button
                  :class="`
                    lock-btn menu-btn
                    ${ !currentGroupInfos.id ? ' disabled' : '' }
                  `"
                  :disabled="!currentGroupInfos.id"
                  @click.prevent="handleClickOnLockGroup(currentGroupInfos?.id)"
                  @touchstart.prevent="handleClickOnLockGroup(currentGroupInfos?.id)"
                >
                  <div class="icon">
                    <img class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/anchor_icon.png`) ?? ''"
                    />
                  </div>
                </button>
                <button
                  :class="`
                    menu-btn
                    ${ !currentGroupInfos.id ? ' disabled' : '' }
                    ${ currentGroupInfos?.hide ? ' active' : '' }
                  `"
                  :disabled="!currentGroupInfos.id"
                  @click.prevent="handleClickOnHideGroup(currentGroupInfos?.id)"
                  @touchstart.prevent="handleClickOnHideGroup(currentGroupInfos?.id)"
                >
                  <div class="icon">
                    <img v-if="currentGroupInfos?.hide" class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/eye_open_icon.png`) ?? ''"
                    />
                    <img v-else class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/eye_open_icon.png`) ?? ''"
                    />
                  </div>
                </button>
                <button
                  :class="`
                    menu-btn delete-btn
                    ${ !currentGroupInfos.id ? ' disabled' : '' }
                  `"
                  :disabled="!currentGroupInfos.id"
                  @click.prevent="handleClickOnDeleteGroupElements(currentGroupInfos.id)"
                  @touchstart.prevent="handleClickOnDeleteGroupElements(currentGroupInfos.id)"
                >
                  <div class="icon">
                    <img class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/trash_icon.png`) ?? ''"
                    />
                  </div>
                </button>
                <!-- ---------------- COPY PASTE ---------------- -->
                <button
                  :class="`
                    menu-btn
                    ${ !currentGroupInfos.id && !currentElement?.isImg ? ' disabled' : '' }
                  `"
                  :disabled="!currentGroupInfos.id && !currentElement?.isImg"
                  @click.prevent="handleClickOnCopy"
                  @touchstart.prevent="handleClickOnCopy"
                >
                  <div class="icon">
                    <img :src="require(`@/assets/images/icons/copy_paste_icon.png`) ?? ''" alt="" class="img-icon divdraw">
                  </div>
                </button>
                <button
                  :class="`
                    menu-btn
                    ${ !currentGroupInfos.id ? ' disabled' : '' }
                  `"
                  :disabled="!currentGroupInfos.id"
                  @click.prevent="handleClickOnUngroup"
                  @touchstart.prevent="handleClickOnUngroup"
                >
                  <div class="icon">
                    <img class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/ungroup_icon.png`) ?? ''"
                    />
                  </div>
                </button>
                <button
                  v-if="currentElement?.isImg"
                  :class="`
                    menu-btn
                  `"
                  :disabled="currentElement?.isImg ? false : true"
                  @click.prevent="handleClickOnUnmergeGroup()"
                  @touchstart.prevent="handleClickOnUnmergeGroup()"
                >
                  <div class="icon">
                    <img class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/group_icon.png`) ?? ''"
                    />
                  </div>
                </button>
                <button
                  v-else
                  :class="`
                    menu-btn
                    ${ !currentGroupInfos.id ? ' disabled' : '' }
                  `"
                  :disabled="currentGroupInfos.id ? false : true"
                  @click.prevent="handleClickOnMergeGroup(currentGroupInfos?.id)"
                  @touchstart.prevent="handleClickOnMergeGroup(currentGroupInfos?.id)"
                >
                  <div class="icon">
                    <img class="img-icon divdraw"
                      :src="require(`@/assets/images/icons/picture_icon.png`) ?? ''"
                    />
                  </div>
                </button>
              </div>
              <span class="text-container">
                <span class="text">{{ $t("border_type_menu") }}</span>
              </span>
            </h5>
          </div>
        </div>
      </div>
      <!-- -------------- BOX -------------- -->
      <!--  -->
      <div class="tools-actions-box group_elements-list-box">
        <!-- -------------- BOX TITLE -------------- -->
        <div class="tools-actions-box-title-container list-title-container">
          <h4 class="tools-actions-box-title">
            <div class="icon">
              <!-- <fa icon="fa-list" /> -->
              <img :src="require(`@/assets/images/icons/list_icon.png`) ?? ''" alt="" class="img-icon divdraw">
            </div>
            <span class="text">
              {{ $t("group_elements_list") }}
            </span>
          </h4>
          <button
            :class="`
              show-list-btn
              ${ !currentGroupInfos.id ? ' disabled' : show ? ' active' : '' }
            `"
            :disabled="currentGroupInfos.id ? false : true"
            @click.prevent="handleClickOnShowList"
            @touchstart.prevent="handleClickOnShowList"
          >
            <div class="icon">
              <img v-if="show" class="img-icon divdraw"
                :src="require(`@/assets/images/icons/caret_up_icon.png`) ?? ''"
              />
              <img v-else class="img-icon divdraw"
                :src="require(`@/assets/images/icons/caret_down_icon.png`) ?? ''"
              />
            </div>
          </button>
        </div>
        <!-- -------------- BOX ROW -------------- -->
        <div v-if="showMenu && !currentElement?.isImg" class="tools-actions-box-row">
          <div class="tool-content full-row">
            <div
              class="items-list-content"
              ref="items_list_content"
              :style="`
                max-height: ${ this.currentListMaxHeight }px;
              `"
            >
              <ul class="group_elements-list">
                <li
                  v-for="elementId in currentGroupInfos?.elements_list"
                  :key="elementId"
                  :class="`item-content`"
                >
                  <button
                    class="group_element-btn"
                    @mousedown.prevent="handleClickOnElement(elementId)"
                    @touchstart.prevent="handleClickOnElement(elementId)"
                  >
                    <span
                      class="group_info"
                    >
                      <span class="group-text">{{ getElementName(elementId) }}</span>
                    </span>
                  </button>
                  <button
                    class="group_element-delete-btn"
                    @click.prevent="handleClickOnRemoveElementFromGroup(elementId, currentGroupInfos.id)"
                    @touchstart.prevent="handleClickOnRemoveElementFromGroup(elementId, currentGroupInfos.id)"
                  >
                    <div class="icon">
                      <img :src="require(`@/assets/images/icons/minus_icon_sm.png`) ?? ''" alt="" class="img-icon divdraw">
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupElementsMenu",
  props: {
    currentGroupInfos: Object,
    oppenedMenu: String,
    elementsList: Array,
    currentCursor: String,
    currentElement: Object
  },

  data() {
    return {
      rate: 5,
      showMenu: false,
      activeClass: "",
      show: true,
      currentListMaxHeight: (window.innerHeight / 2),
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
  },

  methods: {

    handleClickOnCopy() {
      if (this.currentElement.isImg) {
        this.$emit("copy-img", this.currentElement.id);
      } else if (this.currentElement.group_id && this.currentElement.group_id > 0) {
        this.$emit("copy-group", this.currentElement.group_id);
      }
    },

    handleClickOnDeleteGroupElements(groupId) {
      if (groupId && groupId == this.currentGroupInfos?.id) {
        this.$emit("delete-group-elements", this.currentGroupInfos);
      }
    },

    handleClickOnNewElementGroup() {
      this.$emit("create-new-group");
    },

    handleClickOnLockGroup(groupId) {
      if (groupId && groupId == this.currentGroupInfos?.id) {
        this.$emit("set-lock-status", this.currentGroupInfos.elements_list);
      }
    },

    handleClickOnHideGroup(groupId) {
      if (groupId && groupId == this.currentGroupInfos?.id) {
        this.$emit("set-group-hide", groupId);
      }
    },

    handleClickOnMergeGroup(groupId) {
      this.$emit("merge-grouped-elements", groupId);
    },

    handleClickOnUnmergeGroup() {
      this.$emit("unmerge-grouped-elements", this.currentElement.id);
      this.$emit("set-selected-item", this.currentElement.id);
    },

    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    handleClickOnElement(itemId) {
        this.$emit("set-selected-item", {
          evt : null,
          item_id : itemId,
          group_id : this.currentGroupInfos.id,
        });
    },

    handleClickOnCursorType() {
      if (this.currentCursor === "group") {
          this.$emit("selected-cursor", "cursor");
      } else {
          this.$emit("selected-cursor", "group");
      }
    },

    getElementName(itemId) {
      const element = this.elementsList?.find(element => element.id === itemId);
      return element?.name ?? null;
    },

    handleClickOnRemoveElementFromGroup(itemId, groupId) {
      this.$emit("remove-group-element", {
        item_ids_list: [itemId],
        group_id: groupId,
      });
    },

    handleClickOnUngroup() {
      if (this.currentGroupInfos.elements_list?.length > 0) {
        for (let itemId of this.currentGroupInfos.elements_list) {
          this.$emit("remove-group-element", {
            item_ids_list : [itemId],
            group_id : this.currentGroupInfos.id,
          });
        }
      }
    },

    handleClickOnShowList() {
      if (this.show) {
        this.show = false;
        this.currentListMaxHeight = 0;
      } else {
        this.currentListMaxHeight = (window.innerHeight / 2);
        this.show = true;
      }
    },

    handleClickOnCloseMenu() {
      this.activeClass = "";
      setTimeout(()=>{
        this.$emit("close-side-menus", "");
      }, 100)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

  .items-list-content {
    transition: 0.2s max-height 0s ease;
    max-height: 50vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    overflow: hidden;
    width: 100%;

    ul.group_elements-list {
      height: 100%;
      width: 100%;
      @include flex-center-col;
      flex-direction: column-reverse;

      .item-content {
        width: 100%;
        display: flex;
        flex-direction: row;

        .group_info {
          margin-left: 0.5rem;
          position: relative;
          
          .group-text {
            font-size: 0.8rem;
            position: absolute;
            top: 50%;
            left: 50%;
            color: var(--wt-50);
            transform: translate(-50%,-50%);
          }
        }

        * {
          transition: font-size 0.1s ease;
        }
      }

    }
  }

  .item-content {
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

  .scroll-top-btn-container,
  .scroll-bottom-btn-container {
      opacity: 1;
      max-height: var(--btn-size);
      transition: opacity .2s ease, .2s max-height 0s ease;
      overflow: hidden;

    button {
      width: 100%;
    }

    &.hide {
      opacity: 0;
      max-height: 0;
    }
  }
</style>

