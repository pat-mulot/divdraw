<template v-if="navLinks.length > 0">
  <div class="main_header-navbar-container">
    <nav class="main_header-navbar">
      <ul class="nav_links-wrapper">
        <slot/>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "BaseNavBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.main_header-navbar-container {
  @include flex-center-row;
  width: 100%;
  .main_header-navbar {
    @include flex-center-row;
    width: 100%;

    // padding: 30px;
    .nav_links-wrapper {
      @include flex-between-row;
      width: 100%;
    }
  }
}
</style>
