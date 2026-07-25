<template>
  <div
    :class="`items-list-container`"
    :style="`
      top: ${ listPos.y }px;
      right: ${ listPos.x }px;
    `"
    @mousemove="handleMouseMoveList"
    @touchmove="handleMouseMoveList"
    @mouseleave="handleMouseUpOnList"
    @mouseup="handleMouseUpOnList"
    @touchend="handleMouseUpOnList"
  >
    <h3 class="items-list-title">
      <div class="elements-pos-btns">
        <button
          :class="`menu-btn index-btn list-btn${ !this.selectedElementId ? ' disabled' : ''}`"
          @mouseup.prevent="handleClickOnIndexBtn(1, selectedElementId)"
          @touchend.prevent="handleClickOnIndexBtn(1, selectedElementId)"
        >
          <div class="icon">
            <img class="img-icon divdraw"
              :src="require(`@/assets/images/icons/chevron_top_icon.png`) ?? ''"
            />
          </div>
        </button>
        <button
          :class="`menu-btn index-btn list-btn${ !this.selectedElementId || this.selectedElementId === 0? ' disabled' : ''}`"
          @mouseup.prevent="handleClickOnIndexBtn(-1, selectedElementId)"
          @touchend.prevent="handleClickOnIndexBtn(-1, selectedElementId)"
        >
          <div class="icon">
            <img class="img-icon divdraw"
              :src="require(`@/assets/images/icons/chevron_bottom_icon.png`) ?? ''"
            />
          </div>
        </button>
      </div>
      <span class="title-text-container">
        <span class="title-text">{{ $t("items_list") }} : </span>
        <span class="items-nb">{{ itemsNb }}</span>/{{ itemsLimit }}
      </span>
      <button
        :class="`
          menu-btn show-list-btn
          ${ isMovingList ? ' active' : '' }
        `"
        @mousedown.prevent="handleMouseDownOnList"
        @touchstart.prevent="handleMouseDownOnList"
      >
        <div class="icon">
          <img class="img-icon divdraw"
            :src="require(`@/assets/images/icons/move_icon.png`) ?? ''"
          />
        </div>
      </button>
      <button
        :class="`
          menu-btn show-list-btn
          ${ show ? ' active' : '' }
        `"
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
    </h3>
    <div
      :class="`
        scroll-top-btn-container item-content
        ${ !showScrollBtns ? ' hide' : '' }
        ${ this.disableScrollTopBtn ? ' disabled' : '' }
      `"
      :disabled="disableScrollTopBtn"
    >
      <button
        class="item menu-btn"
        @click.prevent="handleClickOnScrollList(-1)"
        @touchstart.prevent="handleClickOnScrollList(-1)"
      >
        <fa icon="angles-up" />
      </button>
    </div>
    <div
      class="items-list-content"
      ref="items_list_content"
      :style="`
        max-height: ${ this.currentListMaxHeight }px;
      `"
    >
      <ul
        class="items-list"
        ref="items_list"
        @mousemove.prevent="handleDragElement"
        @touchmove.prevent="handleDragElement"
      >
        <li
          v-for="elem of datas"
          :key="elem.id"
          :class="`item-content${
            elem.id == this.selectedElementId ? ' selected' : ''
          }${
            elem.lock_status  ? ' locked' : ''
          }${
            elem.hide  ? ' hidden' : ''
          }`"
          :data-id="elem.id"
          :data-z-index="elem.css.zIndex"
          @mouseover="handleMouseMoveHoverElement"
          @mouseleave="handleMouseLeaveElement"
        >
          <button
            v-if="elem.isImg"
            :class="`
              list-btn menu-btn
            `"
            @click.prevent="handleClickOnUnmergeGroup(elem.id)"
            @touchstart.prevent="handleClickOnUnmergeGroup(elem.id)"
          >
            <div class="icon">
              <img class="img-icon divdraw"
                :src="require(`@/assets/images/icons/ungroup_icon.png`) ?? ''"
              />
            </div>
          </button>
          <button
            class="index-btn list-btn lock-btn menu-btn"
            @click.prevent="handleClickOnLockItem(elem.id)"
            @touchstart.prevent="handleClickOnLockItem(elem.id)"
          >
            <div class="icon">
              <img class="img-icon divdraw"
                :src="require(`@/assets/images/icons/anchor_icon.png`) ?? ''"
              />
            </div>
          </button>
          <button
            :class="`
              list-btn menu-btn
              ${ elem.hide ? ' active' : '' }
            `"
            @click.prevent="handleClickOnHideElement(elem.id)"
            @touchstart.prevent="handleClickOnHideElement(elem.id)"
          >
            <div class="icon">
              <img v-if="elem.hide" class="img-icon divdraw"
                :src="require(`@/assets/images/icons/eye_close_icon.png`) ?? ''"
              />
              <img v-else class="img-icon divdraw"
                :src="require(`@/assets/images/icons/eye_open_icon.png`) ?? ''"
              />
            </div>
          </button>
          <button
            class="item menu-btn"
            :data-id="elem.id"
            :data-name="elem.name"
            :data-group-id="elem.group_id"
            @mousedown.prevent="handleDragStartelement"
            @touchstart.prevent="handleDragStartelement"
            @mouseup.prevent="handleDragEndelement(elem.id, elem.group_id)"
            @touchend.prevent="handleDragEndelement(elem.id, elem.group_id)"
          >
            <span>{{ elem.name }}</span>
            <span
              v-if="elem.group_id"
              class="group_info"
            >
              <div class="icon group-icon">
                <img class="img-icon divdraw"
                  :src="require(`@/assets/images/icons/folder_icon.png`) ?? ''"
                />
              </div>
              <span class="group-text">{{ elem.group_id }}</span>
            </span>
            <span
              v-if="elem.isImg"
              class="group_info"
            >
              <span class="group-icon">
                <div class="icon">
                  <!-- <img class="img-icon divdraw"
                    :src="require(`@/assets/images/icons/group_icon.png`) ?? ''"
                  /> -->
                  <img class="img-icon divdraw"
                    :src="require(`@/assets/images/icons/picture_icon.png`) ?? ''"
                  />
                </div>
              </span>
            </span>
          </button>
          <button
            class="delete-btn list-btn menu-btn"
            :data-id="elem.id"
            @click.prevent="handleClickOnDeleteElement(elem.id)"
            @touchstart.prevent="handleClickOnDeleteElement(elem.id)"
          >
            <div class="icon">
              <img class="img-icon divdraw"
                :src="require(`@/assets/images/icons/trash_icon.png`) ?? ''"
              />
            </div>
          </button>
        </li>
        <div
          class="item-content item-handler"
          ref="item_handler"
          @mouseup.prevent="handleDragEndelement(0, 0)"
          @touchend.prevent="handleDragEndelement(0, 0)"
        >
          <button class="item menu-btn">
            <span>{{ grabbedElement }}</span>
          </button>
        </div>
      </ul>
    </div>
    <div
      :class="`
        scroll-bottom-btn-container item-content
        ${ !showScrollBtns ? ' hide' : '' }
        ${ disableScrollBottomBtn ? ' disabled' : '' }
      `"
    >
      <button
        class="item menu-btn"
          @click.prevent="handleClickOnScrollList(1)"
          @touchstart.prevent="handleClickOnScrollList(1)"
      >
        <fa icon="angles-down" />
      </button>
    </div>
    <input type="hidden" :value="listContainer?.offsetHeight">
  </div>
</template>

<script>
export default {
  name: "ItemsList",
  props: {
    datas: Array,
    itemsNb: Number,
    itemsLimit: Number,
    selectedElementId: Number,
    currentGroupInfos: Object,
    selectedGroupId: Number,
  },
  data() {
    return {
      show: true,
      baseOrder: [],
      isDragging: false,
      listContainer: null,
      itemHandler: null,
      elementsList: [],
      handlerPos: {
        top: 0,
        left: 0,
      },
      previousPosTop: 0,
      elementStartPosTop: 0,
      previousIndexingElementId : 0,
      draggingTiemout: null,
      isWaitingDraggingTiemout: false,
      grabbedElement: "",
      draggingElementId: 0,
      currentListMaxHeight: (window.innerHeight / 2),
      disableScrollTopBtn: true,
      disableScrollBottomBtn: false,
      btnSize: 0,
      isMovingList: false,
      previousPos: {
        y: 0,
        x: 0,
      },
      listPos: {
        y: 16,
        x: 16,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.itemHandler = this.$refs["item_handler"];
      this.listContainer = this.$refs["items_list"];
      this.listElement = this.$refs["items_list_content"];
      const baseListItemElement = document.querySelector(".item-content.item-handler");
      this.btnSize = baseListItemElement?.offsetHeight;
    });
  },

  computed: {
    getItemsNb() {
      return this.itemsNb;
    },

    getCurrentGroupInfos() {
      return this.currentGroupInfos;
    },

    showScrollBtns() {
      if ((this.datas.length * this.btnSize) > (window.innerHeight / 2)) {
        return this.show;
      }
      return false;
    }
  },

  methods: {

    handleMouseDownOnList(evt) {
      this.isMovingList = true;
      this.previousPos = {
        y: evt.touches ? evt.touches[0].clientY : evt.clientY,
        x: evt.touches ? evt.touches[0].clientX : evt.clientX,
      }
    },

    handleMouseUpOnList() {
      this.isMovingList = false;
      this.previousPos = this.listPos;
    },

    handleMouseMoveList(evt) {
      if (this.isMovingList) {
        const moveY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        const moveX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        this.listPos.y += -1 * (this.previousPos.y - moveY);
        this.listPos.x += (this.previousPos.x - moveX);
        this.previousPos.y = moveY;
        this.previousPos.x = moveX;
      }
    },

    checkScrollListBtns() {
      if (this.listContainer && this.listElement) {
        if (this.listContainer.offsetHeight > 0 && this.getItemsNb > 0) {
          if (this.listContainer.offsetHeight > window.innerHeight / 2) {
            let valueToTest = -1;
            if (this.listElement.scrollTop > 0) valueToTest = 1;
            this.checklistElementScroll(valueToTest);
            this.show = true;
          }
        }
      }
    },

    handleClickOnScrollList(dirValue) {
      const scrollAdd = (window.innerHeight / 4) * dirValue;
      this.listElement.scrollTop += scrollAdd;
      this.checklistElementScroll(scrollAdd)
    },

    checklistElementScroll(scrollAdd) {
      if (this.listElement.scrollTop + scrollAdd <= 0) {
        this.disableScrollTopBtn = true;
      } else {
        this.disableScrollTopBtn = false;
      }
      if ((this.listElement.scrollTop + scrollAdd) >= (this.listContainer.offsetHeight - this.currentListMaxHeight)) {
        this.disableScrollBottomBtn = true;
      } else {
        this.disableScrollBottomBtn = false;
      }
    },

    handleClickOnNewElementGroup() {
      this.$emit("create-new-group");
    },

    handleClickOnRemoveElementFromGroup(itemId, groupId) {
      this.$emit("remove-group-element", {
        item_id: itemId,
        group_id: groupId,
      });
    },

    handleClickOnDeleteGroupElements(groupId) {
      if (groupId && groupId == this.getCurrentGroupInfos?.id) {
        this.$emit("delete-group-elements", this.getCurrentGroupInfos);
      }
    },

    handleClickOnLockGroup(groupId) {
      if (groupId && groupId == this.getCurrentGroupInfos?.id) {
        this.$emit("set-lock-status", this.getCurrentGroupInfos.elements_list);
      }
    },

    handleClickOnLockItem(itemId) {
      this.$emit("set-lock-status", [itemId]);
    },

    handleClickOnHideElement(itemId) {
      this.$emit("set-element-hide", [itemId]);
    },

    handleClickOnHideGroup(groupId) {
      this.$emit("set-group-hide", groupId);
    },

    handleClickOnMergeGroup(groupId) {
      this.$emit("merge-grouped-elements", groupId);
    },

    handleClickOnUnmergeGroup(elemId) {
      this.$emit("unmerge-grouped-elements", elemId);
    },

    getElementName(itemId) {
      const element = this.datas?.find(element => element.id === itemId);
      return element?.name ?? null;
    },

    getElementOffset(element) {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    },

    handleClickOnDeleteElement(itemId) {
      this.$emit("set-selected-item", itemId);
      this.$emit("delete-elements", [itemId]);
    },

    handleDragStartelement(evt) {
      const
        currentElement = evt.currentTarget,
        clientPosTop = evt.touches ? evt.touches[0].clientY : evt.clientY;
      const currentElementId = parseInt(currentElement?.dataset?.id ?? 0);
      if (currentElementId > 0 && this.listContainer) {
        this.grabbedElement = currentElement.dataset.name;
        const groupId = currentElement.dataset.groupId;
        this.dragginElementId = currentElementId;
        this.isDragging = true;
        this.isWaitingDraggingTiemout = true;
        this.draggingTiemout = setTimeout(()=>{
          this.isWaitingDraggingTiemout = false;
          if (this.isDragging) {
            if (currentElementId != this.selectedElementId) {
              this.$emit("set-selected-item", {
                evt : null,
                item_id : currentElementId,
                group_id : groupId,
              });
            }
            this.elementStartPosTop = currentElement.offsetTop - this.listElement.scrollTop;
            this.previousPosTop = clientPosTop;
            this.itemHandler.style.top = this.elementStartPosTop + "px";
            if (!this.itemHandler.classList.contains("active")) this.itemHandler.classList.add("active");
            this.itemHandler.style.position = "absolute";
          }
        }, 500)
      }
    },

    handleDragElement(evt) {
      if (
        !this.isWaitingDraggingTiemout
        && this.isDragging
        && this.listContainer
        && this.itemHandler
      ) {
        this.elementsList = this.listContainer.querySelectorAll("li");
        if (this.elementsList.length > 0) {
          const clientPosTop = evt.touches ? evt.touches[0].clientY : evt.clientY;
          const difTop = clientPosTop - this.previousPosTop;
          this.elementStartPosTop += difTop;
          this.itemHandler.style.top = this.elementStartPosTop + "px";
          for (let index = 0; index < this.elementsList.length; index++) {
            let element = this.elementsList[index];
            if (element) {
              if (
                this.elementStartPosTop < element.offsetTop + (element.offsetHeight / 2)
                && this.elementStartPosTop > element.offsetTop - (element.offsetHeight / 2)
              ) {
                let elementId = parseInt(element.dataset.id);
                if (this.previousIndexingElementId != elementId) {
                  let elementZindex = parseInt(element.dataset.zIndex);
                  if (elementId != this.dragginElementId) {
                    this.$emit("set-element-index", {
                      element_id: this.dragginElementId,
                      z_index : elementZindex,
                    });
                  }
                }
                this.previousIndexingElementId = elementId;
              }
            }
          }
          this.previousPosTop = clientPosTop;
        }
      }
    },

    handleDragEndelement(itemId, groupId) {
      if (this.isWaitingDraggingTiemout) {
        if (this.dragginElementId != this.selectedElementId) {
          this.dragginElementId = 0;
        }
        this.$emit("set-selected-item", {
          evt : null,
          item_id : itemId,
          group_id : groupId,
        });
      }
      if (this.isDragging && this.itemHandler) {
        this.isDragging = false;
        this.isWaitingDraggingTiemout = false;
        clearTimeout(this.draggingTiemout);
        this.previousPosTop = 0;
        if (this.itemHandler.classList.contains("active")) this.itemHandler.classList.remove("active");
      }
    },

    handleClickOnIndexBtn(value, itemId) {
      const fromElement = this.datas.find(element => element.id === itemId);
      if (fromElement) {
        const fromIndex = this.datas.indexOf(fromElement);
        let toIndex = fromIndex + value;
        if (value > 0) {
          if (toIndex > this.datas.length -1) toIndex = this.datas.length -1;
        } else {
          if (toIndex < 0) toIndex = 0;
        }
        const toElement = this.datas[toIndex];
        if (toElement) {
          this.$emit("set-element-index", {
            element_id: itemId,
            z_index : toElement.css.zIndex,
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

    handleMouseMoveHoverElement(evt) {
      const itemId = parseInt(evt.currentTarget?.dataset?.id);
      if (!evt.currentTarget.classList.contains("hover")) {
        this.$emit("set-element-hover-start", itemId);
        evt.currentTarget.classList.add("hover")
      }
    },

    handleMouseLeaveElement(evt) {
      const itemId = parseInt(evt.currentTarget?.dataset?.id);
      if (evt.currentTarget.classList.contains("hover")) {
        this.$emit("set-element-hover-end", itemId);
        evt.currentTarget.classList.remove("hover")
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.items-list-container {
  height: 100%;
  position: absolute;
  top: var(--gap-1);
  right: var(--gap-1);
  background-color: var(--bk-10);
  height: var(--btn-size);
  transition: 0.2s max-height 0s ease;

  * {
    color: var(--bk-70);
    --shadow-color: var(--wt-60);
    --shadow-size: 1px;
    --text-shadow-1: var(--shadow-size) var(--shadow-size) var(--shadow-size) var(--shadow-color), var(--shadow-size) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-size) var(--shadow-color);
    text-shadow: var(--text-shadow-1);
  }

  .menu-btn {
    line-height: 0;
    @include flex-center-col;
    min-width: var(--btn-size);
    background-color: var(--btn-bg-1);
    outline: none;
    border: none;
    border: solid var(--border-sz-1) var(--bk-30);
    box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
    &.active {
      background-color: var(--btn-bg-1-active);
    }
    &:hover {
      background-color: var(--btn-bg-1-hover);
    }
    &.disabled {
      background-color: var(--btn-bg-1-disabled);
    }
  }

  .items-list-title {
    @include flex-between-row;

    .elements-pos-btns {
      @include flex-center-col;
      height: var(--btn-size);

      button {
        margin: 0;
        padding: 0;
        height: calc(var(--btn-size) / 2);
        width: var(--btn-size);

        .icon {
          height: 100%;
          width: 100%;

          .img-icon {
            height: 100%;
            width: 100%;
          }
        }
      }
    }

    .title-text-container {
      border: solid var(--border-sz-1) var(--bk-40);
      @include flex-center-row;
      align-items: center;
      width: 100%;
      height: var(--btn-size);

      .title-text {
        display:none;
        width: 100%;

        @include screen-medium {
          display:initial;
        }
      }
    }

    span {
      padding: var(--gap-1-4);
      font-size: 0.8em;
    }

    .items-nb {
      font-weight: bold;
      color: var(--bk-90);
      font-size: 1em;
    }

    .show-list-btn {
      height: var(--btn-size);
      width: var(--btn-size);
      padding: var(--gap-1-2);
    }
  }

  .items-list-content {
    transition: 0.2s max-height 0s ease;
    max-height: 50vh;
    overflow-y: auto;
    scroll-behavior: smooth;

    ul.items-list {
      height: 100%;
      @include flex-center-col;
      flex-direction: column-reverse;

      .item-content {
        width: 100%;
        display: flex;
        flex-direction: row;

        * {
          font-size: 0.9em;
        }

        .icon {
          height: 100%;
        }

        .menu-btn {
          transition: box-shadow 0.1s ease, background-color 0.1s ease;
          height: calc(var(--btn-size) - var(--gap-1-2));
          width: var(--btn-size);
          padding: var(--gap-1-4);

          .icon {
            height: 100%;
            width: 100%;
          }
        }

        .menu-btn.item {
          background-color: var(--btn-bg-1);
          outline: none;
          border: none;
          border: solid var(--border-sz-1) var(--bk-30);
          box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
          width: 100%;
          @include flex-center-row;
          height: calc(var(--btn-size) - var(--gap-1-2));

          .group_info {
            height: 100%;
          }

          * {
            font-size: 0.8rem;
          }

          .group_info {
            margin-left: 0.5rem;
            position: relative;
            
            .group-text {
              font-size: 0.75em;
              font-weight: bold;
              position: absolute;
              top: 50%;
              left: 50%;
              color: var(--wt-50);
              transform: translate(-50%,-50%);
              color: var(--wt-70);
              --shadow-color: var(--bk-60);
              --shadow-size: 1px;
              --text-shadow-1: var(--shadow-size) var(--shadow-size) var(--shadow-size) var(--shadow-color), var(--shadow-size) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-color), calc(-1 * var(--shadow-size)) var(--shadow-size) var(--shadow-size) var(--shadow-color);
              text-shadow: var(--text-shadow-1);
            }
          }

          * {
            transition: font-size 0.1s ease;
          }
        }

        &.hover {

          .list-btn,
          .menu-btn {
            background-color: var(--btn-bg-1-hover);
            box-shadow: 0 0 0.25rem var(--btn-bg-1-hover) inset;

            &.active {
              background-color: var(--btn-bg-1-active);
            }
          }
        }

        &.selected {
          
          .list-btn,
          .menu-btn {
            background-color: var(--btn-bg-1-hover);

            &.active {
              background-color: var(--btn-bg-1-active);
            }
          }
        }

        &.locked {
          .menu-btn.lock-btn {
            background-color: var(--bk-50);
            box-shadow: 0 0 0.25rem var(--wt-50),
            0 0 1rem var(--wt-50) inset;

            * {
              font-size: 0.95em;
            }
          }
        }
      }

      .item-handler {
        position: absolute;
        top: 0;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transition: 
          opacity .5s ease,
          transform .5s ease,
          visibility 0s ease;

        &.active {
          visibility: visible;
          opacity: 0.75;
          transform: scale(1.1);
        }
      }
    }
  }

  .group-infos-container {
    @include flex-center-col;
    background-color: var(--bk-10);
    border: solid var(--border-sz-1) var(--bk-40);
    margin-top: var(--gap-1-4);
  }

  .group-infos-title-container {
    width: 100%;
    @include flex-center-row;
    .list-btn {
      height: var(--btn-size);
      width: var(--btn-size);
    }

    .group_info {
      line-height: 0;
      @include flex-between-row;
      width: 100%;
      height: calc(var(--btn-size));
      padding: var(--gap-1-4);


      .group-text {
        font-size: 0.8em;
        margin-left: var(--gap-1-4);
      }
    }
  }

  .group-infos-elements-list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;

    .group-infos-element {
      @include flex-between-row;
      width: 100%;
      border: solid var(--border-sz-1) var(--bk-40);
      
      .group-element-row {

        .group-icon {
          padding: var(--gap-1-4);

          .img-icon {
            height: 100%;
          }
        }
        .group-text {
          font-size: 0.8em;
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
}
</style>
