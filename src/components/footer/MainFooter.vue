<template>
  <footer class="main_footer">
    <BaseNavBar :navLinks="navLinks"/>
  </footer>
</template>

<script>
import BaseNavBar from "@/components/navbar/BaseNavBar.vue";

export default {
  name: "MainFooter",
  components: {
    BaseNavBar,
  },
  props: {
    // currentUserLoggedData: Object,
  },
  data() {
    return {
      navLinks: [],
    }
  },
  created() {
    this.navLinks = [];
    for (let index = 1; index < 5; index++) {
      this.navLinks.push({
          text: `link ${ index }`,
          to : `/link-${ index }`,
          icon : null
        })
    }
  },
  methods: {
    // handleClickOnNavPageLink: function (evt) {
    //   evt.preventDefault();
    //   let pageToDisplay = evt.currentTarget.dataset.pageToDisplayName;
    //   this.showPageToDisplay(pageToDisplay);
    // },
    // showPageToDisplay: function (pageToDisplay) {
    //   let allDisplayablePages = document.querySelectorAll(".displayable_pages");

    //   for (let displayablePage of allDisplayablePages) {
    //     displayablePage.style.display = "none";

    //     if (pageToDisplay === displayablePage.dataset.pageName) {
    //       displayablePage.style.display = "block";
    //     }
    //   }
    // },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.main_footer {
  @include flex-center-col;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);

}

</style>