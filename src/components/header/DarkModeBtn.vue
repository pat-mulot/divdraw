<template>
  <div class="menu-btn dark_mode-btn">
    <span v-if="!darkModeEnabled" class="menu-btn-icon"
      ><fa icon="moon"
    /></span>
    <span v-if="darkModeEnabled" class="menu-btn-icon"><fa icon="sun" /></span>
  </div>
</template>

<script>
export default {
  name: "DarkModeBtn",
  props: {
    darkModeEnabled: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.dark_mode-btn {
  // border: 0.1em solid var(--btn-color-1);
  color: var(--btn-color-1);
  padding: var(--gap-1-2) var(--gap-1);
  cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
  &:active {
    color: var(--btn-color-1-active);
  }
  &:hover {
    color: var(--btn-color-1-hover);
  }
}
</style>
