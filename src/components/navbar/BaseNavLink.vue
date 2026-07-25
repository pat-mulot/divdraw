<template>
  <li class="nav-item">
    <router-link :to="link.to" class="nav_link">
      <span>{{ link.text }}</span>
      <span v-if="link.icon" class="nav_link-icon">
        <fa icon="{{ link.icon }}" />
      </span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "BaseNavLink",
  props: {
    link: {},
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.nav-item {
  display: flex;
  .nav_link {
    font-weight: bold;
    padding: calc(var(--gap) / 2) var(--gap-1-2);
    box-sizing: border-box;
    border-bottom: solid 0.2rem transparent;
    transition: var(--anim-duration-2) border ease;
    * {
      color: var(--link-color);
      white-space: nowrap;
      @include link-transition;
      transition: var(--anim-duration-2) color ease;
    }

    &.router-link-exact-active {
      border-bottom-color: var(--link-color-active);
      box-shadow: 0 0 0.4rem var(--bk-50);
      * {
        color: var(--link-color-active);
        font-weight: bold;
        @include link-transition;
      }
    }
  }
  .nav_link:hover {
    border-bottom-color: var(--link-color-hover);
    * {
      color: var(--link-color-hover);
      @include link-transition;
    }
  }
}
</style>
