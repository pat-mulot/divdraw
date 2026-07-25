<template>
<li
  @click="handleClickOnItem"
  @touchstart="handleClickOnItem"
  :class="`option${getActiveClass }`"
>
  <div class="select-item-btn">
    <span v-if="option.text" class="text">{{ option.text }}</span>
    <span v-if="option.icon" class="icon">
      <fa :icon="option.icon" />
    </span>
    <div v-if="option.img" class="img-container">
      <img ref="img" :src="option.img" :alt="`${this.alt ?? ''}`" />
    </div>
  </div>
</li>
</template>


<script>
export default {
  name: "BaseSelectItem",
  props: {
    itemName: String,
    value: String,
    img: String,
    alt: String,
    active: Boolean,
    option: Object,
    disabled: Boolean,
  },
  inject: ['sharedState'],
  computed: {
    getActiveClass() {
      console.log(this.option.value);
      console.log(this.sharedState.selectedValues);
      console.log(this.sharedState.selectedValues.includes(this.option.value));
      if (this.option.value && this.sharedState.selectedValues.includes(this.option.value)) return " active";
      // if (this.active) return " active";
      return "";
    },
  },
  methods: {
    handleClickOnItem(evt) {
      evt.preventDefault();
      if (this.sharedState.isMultiple) {
        if (!this.option.value) {
          this.sharedState.selectedValues = [];
          this.sharedState.selecteds = [];
          this.sharedState.active = false;
        } else {
          if (this.sharedState.selectedValues.includes(this.option.value)) {
            this.sharedState.selectedValues.splice(this.sharedState.selectedValues.indexOf(this.option.value), 1);
            this.sharedState.selecteds.splice(this.sharedState.selectedValues.indexOf(this.option.value), 1);
            if (this.sharedState.selecteds.length === 0) {
              this.sharedState.selectedValues = [];
              this.sharedState.selecteds = [];
            }
          } else {
            this.sharedState.selectedValues.push(this.option.value);
            this.sharedState.selecteds.push(this.option);
          }
        }
      } else {
        if (this.sharedState.selected.value === this.option.value) {
          this.sharedState.selected = this.sharedState.default;
        } else {
          this.sharedState.selected = this.option;
        }
        this.sharedState.active = false;
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.option {
  padding: var(--gap-1-2) calc(var(--gap-1));
  cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
  border-bottom: solid var(--border-sz-1) var(--bk-30);
  box-shadow: 0 0 0.5rem var(--wt-70) inset;
  transition:
    .2s background-color ease,
    .2s box-shadow ease;

  &:last-child {
    border-bottom: none;
  }

  &.active {
    background-color:var(--bk-20);
  }
  
  &:hover {
    background-color:var(--bk-30);
  }

  * {
    white-space: nowrap;
  }
}
</style>
<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.select-item {
  display: flex;
  width: 100%;
  @include btn-size-medium;
  @include btn-style-1;
  border-top: solid var(--border-sz-1) var(--bk-30);
  @include btn-bs-1;

  &.active {
    @include btn-style-1-active;
  }

  &:hover {
    @include btn-style-1-hover;
  }
  
  &:first-child {
    border-top: none;
  }

  * {
    white-space: nowrap;
  }

  .select-item-btn {
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
