<template>
  <div :class="`fullscreen-loader${this.isLoading ? ' show' : ''}`">
    <fa icon="spinner" class="loader-icon" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseFullscreenLoader",
  computed: {
    ...mapGetters({
      isLoading: "loader/check",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.fullscreen-loader {
  width: 100vw;
  height: var(--view-height);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--wt-50);
  @include flex-center-row;
  visibility: hidden;
  opacity: 0;
  @include hide-anim-2;
  cursor: wait;
  &.show {
    @include show-anim-2;
  }
}
</style>
