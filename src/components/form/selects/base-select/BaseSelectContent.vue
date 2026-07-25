<template>
  <ul :class="`select-content${active ? ' show' : ''}`">
    <slot/>
  </ul>
</template>

<script>
export default {
  name: "BaseSelectContent",
  inject: ['sharedState'],
  computed: {
    active () {
      return this.sharedState.active
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.select-content {
  position: absolute;
  top: calc(100% + var(--gap-1-2));
  opacity: 0;
  visibility: hidden;
  // background-color: var(--select-bg-color);
  background-color: var(--wt-90);

  transition:
    var(--anim-duration-1) visibility ease,
    var(--anim-duration-1) opacity ease,
    var(--anim-duration-1) transform ease;
  &.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0) scale(1);
    z-index: 9;
  }
  &.border {
    border: solid var(--border-sz-1) var(--bk-30);
  }
}
.select-content.fix-center {
  left: 50%;
  transform: translate(-50%, calc(var(--gap-1) * 2)) scale(0.9);
  &.show {
    transform: translateX(-50%) scale(1);
  }
}
.select-content.fix-left {
  left: 0;
  transform: translateX(calc(var(--gap-1) * 2 * -1)) scale(0.9);
  &.show {
    transform: translateX(0) scale(1);
  }
}
.select-content.fix-right {
  right: 0;
  transform: translateX(calc(var(--gap-1) * 2)) scale(0.9);
  &.show {
    transform: translateX(0) scale(1);
  }
}
</style>
