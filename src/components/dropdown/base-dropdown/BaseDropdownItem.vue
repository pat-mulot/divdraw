<template>
  <li
    :class="`dropdown-item${this.getActiveClass}`"
    :data-value="value"
    @click="handleClickOnItem"
    @touchstart="handleClickOnItem"
    :disabled="disabled"
  >
    <router-link class="dropdown-item-btn" v-if="to" :to="to">
      <span v-if="text" class="text">{{ text }}</span>
      <span v-if="icon" class="icon">
        <fa :icon="icon" />
      </span>
      <div v-if="img" class="dropdown-item-btn img-container">
        <img ref="img" :src="img" :alt="`${this.alt ?? ''}`" />
      </div>
    </router-link>
    <div v-else class="dropdown-item-btn">
      <span v-if="text" class="text">{{ text }}</span>
      <span v-if="icon" class="icon">
        <fa :icon="icon" />
      </span>
      <div v-if="img" class="img-container">
        <img ref="img" :src="img" :alt="`${this.alt ?? ''}`" />
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "BaseDropdownItem",
  props: {
    text: String,
    itemName: String,
    icon: String,
    to: String,
    value: String,
    img: String,
    alt: String,
    active: Boolean,
    disabled: Boolean,
  },
  inject: ["sharedState"],
  methods: {
    handleClickOnItem(evt) {
      evt.preventDefault();
      if (!this.sharedState.isMultiple) {
        return (this.sharedState.active = false);
      }
    },
  },
  computed: {
    getActiveClass() {
      if (this.active) return " active";
      return "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.dropdown-item {
  display: flex;
  width: 100%;
  @include btn-size-medium;
  @include btn-style-1;
    border-top: solid var(--border-sz-1) var(--bk-30);
  &.active {
    @include btn-style-1-active;
  }
  &:hover {
    @include btn-style-1-hover;
  }
  @include btn-bs-1;
  &:first-child {
    border-top: none;
  }
  * {
    white-space: nowrap;
  }
  .dropdown-item-btn {
    @include flex-center-row;
    width: 100%;
  }
  &.disabled {
    @include btn-style-1-disabled;
  }
}
img {
  min-height: 1rem;
  min-width: 1rem;
  object-fit: contain;
}
</style>
