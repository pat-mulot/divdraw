<template>
  <div class="fullscreen-modal">
    <div
      class="clickable_background"
      @click.prevent="handleClickOnBackground"
      @touchend.prevent="handleClickOnBackground"
    >
    </div>
    <div class="fullscreen-modal-content">
      <div class="fullscreen-modal-header" ><slot name="header" /></div>
      <div class="fullscreen-modal-body" ><slot name="body" /></div>
      <div class="fullscreen-modal-footer" ><slot name="footer" /></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BaseFullscreenModal",
  methods: {
    handleClickOnBackground() {
      this.$emit("click-on-background");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--view-height);
  color: var(--bk-70);
  @include flex-center-col;
  z-index: 8;
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

  &.show {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }

  .modal-btn {
    line-height: 0;
    @include flex-center-row;
    background-color: var(--btn-bg-1);
    outline: none;
    height: var(--btn-size);
    padding: var(--gap-1-1);
    color: var(--bk-70);
    border: solid var(--border-sz-1) var(--bk-30);
    box-shadow: 0 0 0.5rem var(--bk-20), 0 0 0.25rem var(--wt-40) inset;
    transition: .1s background-color ease;
    margin-left: var(--gap-1-1);
    transform: scale(1);
    transition: 0.1s transform ease;

    &:first-child {
      margin-left: 0;
    }

    .text {
      margin-right: var(--gap-1-1);
    }

    .icon {
      height: auto;
    }

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

  .fullscreen-modal-content {
    max-width: calc(100% - (var(--gap-2) * 2));
    border: solid var(--border-sz-1) var(--bk-40);
    border-radius: var(--gap-1-2);
    background-color: var(--wt-70);
    box-shadow: 0 0 0.25rem var(--wt-90) inset, 0 0 0.25rem var(--bk-50);

    .fullscreen-modal-header {

      .fullscreen-modal-title-container {
        @include flex-center-row;
        
        .fullscreen-modal-title {
          @include flex-center-row;
          width: 100%;
          padding: var(--gap-1-1);
        }

        .close-modal-btn {
          height: var(--btn-size);
          width: var(--btn-size);
          display: flex;
          border:none;
          background-color: transparent;
          box-shadow: none;
          padding: var(--gap-1-4);

          .icon {
            transition: 0.1s transform ease;
            transform: scale(1);
            display: flex;
            height: 100%;
            width: 100%;

            img {
              height: 100%;
              width: 100%;
            }
          }
        
          &:hover {
            .icon {
              transform: scale(1.4);
            }
          }
        }

      }
    }
    .fullscreen-modal-body {
      padding: var(--gap-1-1);
    }
    .fullscreen-modal-footer {
      padding: var(--gap-1-1);

      .btns-container {
        @include flex-between-row;
      }
    }
  }
}
</style>
