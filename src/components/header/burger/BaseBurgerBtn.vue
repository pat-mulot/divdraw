<template>
  <div
    @touchstart="handleClickOnMenu"
    @click="handleClickOnMenu"
    :class="'burger-icon-container ' + burgerActiveClass"
  >
    <div :class="'burger-icon ' + burgerActiveClass">
      <span></span>
    </div>
  </div>
</template>

<script>

export default {
  name: "BaseBurgerBtn",
  data() {
    return {
      burgerActiveClass: "",
    };
  },
  methods: {
    handleClickOnMenu(evt) {
      evt.preventDefault();
      let burgerButton = evt.currentTarget;
      burgerButton.classList.toggle("active");
      if (this.burgerActiveClass === "active") {
        this.burgerActiveClass = "";
      } else {
        this.burgerActiveClass = "active";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.burger-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  padding: var(--gap-1-2);

  .burger-icon {
    width: 1.4rem;
    height: 1.4rem;
    width: 1rem;
    height: 1rem;
    cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
    position: relative;

    span {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1.35rem;
      height: 2px;
      background-color: rgba(192, 192, 192, 0.65);
      border-radius: 0.1rem;
      transition: background-color var(--anim-duration-2) ease-in-out;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0%;
        width: 100%;
        height: 2px;
        background-color: rgba(192, 192, 192, 0.65);
        border-radius: 0.1rem;
        transition: transform var(--anim-duration-2) ease-in-out;
        padding: 0;
        margin: 0;
      }

      &::before {
        transform: translateY(-0.45rem);
      }

      &::after {
        transform: translateY(0.45rem);
      }
    }

    &.active {

      span {
        background-color: transparent;

        &::before {
          width: 1.5rem;
          transform: translateY(0) rotateZ(45deg);
          // transform: translateY(0) rotateZ(135deg);
          // transform: translateY(0) rotateZ(315deg);
          // transform: translateX(20%) rotateZ(60deg);
        }

        &::after {
          width: 1.5rem;
          transform: translateY(0) rotateZ(-45deg);
          // transform: translateY(0) rotateZ(-135deg);
          // transform: translateY(0) rotateZ(-315deg);
          // transform: translateX(-20%) rotateZ(-60deg);
        }
      }
    }
  }
}
</style>
