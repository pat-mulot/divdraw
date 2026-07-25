<template>
  <div v-clickoutside="away" class="Select-wrapper">
    <slot name="toggler">
      <BaseSelectBtn
        class="toogler-btn"
        :text="sharedState.selected.text"
        :img="img"
        :alt="alt"
        :icon="icon"
        :disabled="disabled"
      />
        <!-- :text="text" -->
    </slot>
    <slot />
  </div>
</template>

<script>
import BaseSelectBtn from "@/components/form/selects/base-select/BaseSelectBtn.vue";

export default {
  name: "BaseSelectWrapper",
  components: {
    BaseSelectBtn,
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
        selected : {
          name : "Toogle",
          text : "Toogle",
          value : null,
        },
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
  computed: {
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.select-wrapper {
  position: relative;
  display: flex;
}
</style>
