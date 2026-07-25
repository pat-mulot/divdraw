<template>
  <div
    ref="scroll_bar_container"
    v-if="getScrollBarhandlerLength > 0"
    :class="`${ this.type }-scroll_bar-container scroll_bar-container${ this.disabledClass }`"
    :style="`
      position: absolute;
      ${ this.containerPos }
      height:${ this.containerHeight }px;
      width:${ this.containerWidth }px;
    `"
  >
    <div
      :class="`${ this.type }-scroll_bar scroll_bar`"
      :style="`
        ${ this.stylePos[this.type].pos }: ${ this.scrollPosition }px;
        ${ this.stylePos[this.type].size }: ${ this.getScrollBarhandlerLength }px;
      `"
      @mousedown.prevent="handleClickStartOnScrollBar"
      @touchstart.prevent="handleClickStartOnScrollBar"
    >
      <div v-if="type == 'left'" class="scroller_icon">
        <fa icon="fa-grip-lines-vertical" />
      </div>
      <div v-if="type == 'top'" class="scroller_icon">
        <fa icon="fa-grip-lines" />
      </div>
    </div>
      <div v-if="type == 'top'" class="bottom-corner scrollbar-corner"
        :style="`
          position: absolute;
          height:${ this.containerWidth }px;
          width:${ this.containerWidth }px;
        `"
      ></div>
      <div v-if="type == 'left'" class="right-corner scrollbar-corner"
        :style="`
          position: absolute;
          height:${ this.containerHeight }px;
          width:${ this.containerHeight }px;
        `"
      ></div>
  </div>
</template>

<script>
export default {
  name: "ScrollBar",
  
  props: {
    scrollPosition: Number,
    containerSize: Number,
    scaleValue: Number,
    type: String,
    containerWidth: Number,
    containerHeight: Number,
    containerPos: String,
  },

  data() {
    return {
      showScaleMenu: false,
      scrollBarContainerSize: 0,
      disabledClass: "",
      stylePos: {
        top: {
          pos: "top",
          size: "height",
        },
        left: {
          pos: "left",
          size: "width",
        }
      },
      scrollBarLength: 0,
    };
  },


  mounted() {
    window.addEventListener("mouseup", this.handleMouseMoveEnd);
    window.addEventListener("touchend", this.handleMouseMoveEnd);
  },

  beforeUnmount() {
    window.removeEventListener("mouseup", this.handleMouseMoveEnd);
    window.removeEventListener("touchend", this.handleMouseMoveEnd);
  },

  computed: {

    getScrollBarContainerSize() {
      let size = 0;
      if (this.type === "top") {
        size = this.containerHeight;
      }
      if (this.type === "left") {
        size = this.containerWidth;
      }
      return size;
    },

    getScrollBarhandlerLength() {
      let handlerLength = (this.containerSize - this.getScrollBarContainerSize);
      if (handlerLength > 0) {
        let fix = 0;
        let lengthToReturn = this.getScrollBarContainerSize - handlerLength;
        if (lengthToReturn < 75) {
          fix = lengthToReturn - 75;
          lengthToReturn = 75;
        }
        this.$emit("set-scrollbar-size", {
          size: handlerLength,
          size_to_return: fix,
          type: this.type,
          length: lengthToReturn,
        })
        this.$emit("hide-scroll-handler", true)
        return lengthToReturn;
      }
      this.$emit("hide-scroll-handler")
      return 0;
    },
  },

  methods: {

    handleMouseMoveEnd() {
      this.$emit("set-scroll-end");
    },

    handleClickStartOnScrollBar(evt) {
      evt.preventDefault();
      if (this.type === "top") {
        this.$emit("set-scroll-position", {
          top: evt.touches ? evt.touches[0].clientY : evt.clientY,
        });
      }
      if (this.type === "left") {
        this.$emit("set-scroll-position", {
          left: evt.touches ? evt.touches[0].clientX : evt.clientX,
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.scroll_bar-container {
  position: relative;
  z-index: 0;
  border: solid 2px rgb(100, 100, 100);
  overflow: hidden;
  box-shadow: 0 0 0.5rem var(--bk-30), 0 0 0.25rem var(--wt-50) inset;

  .scroll_bar {
    height: 100%;
    width: 100%;
    border-radius: 1.5rem;
    position: absolute;
    cursor: url("@/assets/images/cursors/cursor_grab.png"), auto;
    border: solid 2px gray;
    display:flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: var(--bk-10);
    box-shadow: 0 0 0.5rem var(--bk-30), 0 0 0.25rem var(--wt-50) inset;

    .scroller_icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 0.7rem;
      color: gray;
      line-height: 0;
    }
  }

  .top-scroll_bar {
    left: 50%;
    transform: translateX(-50%);
  }

  .left-scroll_bar {
    top: 50%;
    transform: translateY(-50%);
  }
}

.left-scroll_bar-container {
  width: 100%;
  height: 0.5rem;
}

.scrollbar-corner {
  position: absolute;
  border: solid 2px gray;
  box-shadow: 0 0 1rem var(--bk-20) inset;
  border-top: none;
  border-left: none;

  &.bottom-corner {
    top: calc(100% + 2px);
    right: -2px;
  }

  &.right-corner {
    left: calc(100% + 2px);
    top: -2px;
  }
}

</style>

