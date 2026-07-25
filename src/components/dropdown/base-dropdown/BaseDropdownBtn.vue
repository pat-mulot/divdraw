<template>
  <button
    @click="handleClickOnDropdownToggler"
    @touchstart="handleClickOnDropdownToggler"
    :class="getActiveClass"
  >
    <span class="text" v-if="text">{{ text }}</span>
    <span class="icon" v-if="icon"><fa :icon="icon" /></span>
    <div v-if="img" class="img-container">
      <img :src="img" :alt="`${this.alt ?? ''}`" />
    </div>
  </button>
</template>


<script>
export default {
  name: "BaseDropdownBtn",
  props: {
    selected: String,
    text: String,
    img: String,
    icon: String,
    alt: String,
    disabled: Boolean,
  },
  inject: ["sharedState"],
  methods: {
    handleClickOnDropdownToggler(evt) {
      evt.preventDefault();
      if (!this.disabled) {
        this.sharedState.active = !this.sharedState.active;
      }
    },
  },
  computed: {
    getActiveClass() {
      if (this.disabled) return " disabled";
      if (this.sharedState.active) return " active";
      return "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.toogler-btn {
  @include btn-size-medium;
  @include btn-style-1;
  &.active {
    @include btn-style-1-active;
  }
  &.disabled {
    @include btn-style-1-disabled;
  }
  &:hover {
    @include btn-style-1-hover;
  }
  .text {
    margin-right: var(--gap-1-2);
  }
  .img-container {
    display: flex;
    img {
      object-fit: contain;
      // height: 1.2em;
      height: 1rem;
      width: auto;
    }
  }
}
</style>
