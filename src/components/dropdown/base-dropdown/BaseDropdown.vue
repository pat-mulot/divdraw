<template>
  <div v-clickoutside="away" class="dropdown-wrapper">
    <slot name="toggler">
      <BaseDropdownBtn
        :class="`toogler-btn${ this.btnClass != '' ? ' ' + this.btnClass : ''}`" 
        :text="text"
        :img="img"
        :alt="alt"
        :icon="icon"
        :disabled="disabled"
      />
    </slot>
    <slot />
  </div>
</template>

<script>
import BaseDropdownBtn from "@/components/dropdown/base-dropdown/BaseDropdownBtn.vue";

export default {
  name: "BaseDropdown",
  components: {
    BaseDropdownBtn,
  },
  props: {
    text: String,
    icon: String,
    img: String,
    alt: String,
    btnClass: String,
    multiple: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      sharedState: {
        active: false,
        isMultiple: false,
      },
    };
  },
  mounted() {
    this.sharedState.isMultiple = this.multiple;
  },
  provide() {
    return {
      sharedState: this.sharedState,
    };
  },
  methods: {
    away() {
      this.sharedState.active = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.dropdown-wrapper {
  position: relative;
  display: flex;
}
</style>
