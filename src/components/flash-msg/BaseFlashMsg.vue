<template>
  <div
    :class="`
        base-flash_msg show
        ${this.msgDatas.timed ? ' fo' : ''}
        ${this.msgDatas.class ? ' ' + msgDatas.class : ''}
        ${this.msgDatas.title ? ' titled' : ''}
    `"
  >
    <div class="flash_msg-heading">
      <div class="flash_msg-title-container">
        <span v-if="msgDatas.title" class="flash_msg-title">{{
          msgDatas.title
        }}</span>
      </div>
    </div>
    <p class="flash_msg-content">{{ msgDatas.value }}</p>
    <div
      class="close_icon"
      @click="handleClickOnClosePopup"
      @touchstart="handleClickOnClosePopup"
    >
      <fa :icon="`close`" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseFlashMsg",
  props: {
    msgDatas: Object,
  },

  mounted() {
    // fade-out
    if (this.$el && this.$el.classList.contains("fo")) {
      setTimeout(() => {
          this.$el.remove();
      }, 5000);
    }
  },

  methods: {
    handleClickOnClosePopup(evt) {
      let popupElm = evt.currentTarget.closest(".base-flash_msg");
      if (popupElm) {
        // fade-out
        if (popupElm.classList.contains("fo")) {
            popupElm.classList.remove("fo");
        }
        if (popupElm.classList.contains("show")) {
            popupElm.classList.remove("show");
        }
        setTimeout(() => {
          popupElm.remove();
        }, 200);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/main.scss";


  .base-flash_msg {
    margin: var(--gap-1-2);
    visibility: hidden;
    opacity: 0;
    width: calc(100% - var(--gap-1));
    min-width: calc(150px - var(--gap-1));
    max-width: calc(200px - var(--gap-1));
    position: relative;
    @include box-shadow-1;
    @include hide-anim-1;
    padding: var(--gap-1-2);

    @include screen-small {
      max-width: calc(250px - var(--gap-1));
    }

    @include screen-large {
      max-width: calc(300px - var(--gap-1));
    }

    @include screen-x-large {
      max-width: calc(350px - var(--gap-1));
    }

    &.show {
      @include show-anim-1;
    }

    // fade-out
    &.fo {
      @include fade-out-anim-1;
    }

    &.success {
      background-color: var(--success-color-t1);
    }

    &.error,
    &.danger {
      background-color: var(--danger-color-t1);
    }

    &.warning {
      background-color: var(--warning-color-t1);
    }

    &.info {
      background-color: var(--info-color-t1);
    }
    font-size: var(--fs-m);

    .flash_msg-heading {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      .flash_msg-title-container {
        font-weight: bold;
        width: 100%;

        .flash_msg-title {
          padding: calc(var(--gap-1) / 3) var(--gap-1-2);
          padding-right: var(--gap-1);
          margin: 0 var(--gap-1);
          display: flex;
          justify-content: center;
          width: calc(100% - var(--gap-1-2));
          border-bottom: solid 2px var(--wt-30);
          text-transform: uppercase;
          word-break: break-word;
        }
      }
    }

    .close_icon {
      height: var(--btn-sz);
      width: var(--btn-sz);
      line-height: 0;
      position: absolute;
      top: var(--gap-1-4);
      right: var(--gap-1-4);
      background-color: var(--wt-20);
      padding: var(--gap-1-4);
      cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
      transition: background-color 0.05s ease;
      line-height: 0;
      @include flex-center-row;
      @include inner-btn-box-shadow-1;
      * {
        transition: transform 0.05s ease;
      }

      &:hover {
        background-color: var(--wt-30);
        * {
          transform: scale(1.2);
        }
      }
    }

    .flash_msg-content {
        font-size: 0.9em;
        padding: var(--gap-1-2) var(--gap-1);
        padding-right: var(--gap-2-2);
        overflow-y: scroll;
    }

    &.titled {
      .flash_msg-content {
        padding: var(--gap-1-2) var(--gap-1-4);
      }
    }
  }
</style>
