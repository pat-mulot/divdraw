<template>
  <div v-clickoutside="away" class="select-wrapper">
    <slot name="toggler">
      <BaseSelectBtn
        class="toogler-btn"
        :selectedDatas="getSelectedDatas"
        :img="img"
        :alt="alt"
        :disabled="disabled"
      />
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
    fromtest: String,
  },
  data() {
    return {
      sharedState: {
        active: false,
        default : {
          name : "--",
          text : "--",
          value : null,
        },
        selected : {
          name : "--",
          text : "--",
          value : null,
        },
        selecteds : [],
        selectedValues : [],
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

  computed: {
    getSelectedDatas() {
      if (this.multiple) {
        if (this.sharedState?.selecteds?.length > 0) {
          this.$emit("selected-option",this.sharedState.selecteds)
          return this.sharedState.selecteds;
        }
        this.$emit("selected-option",[this.sharedState.default])
        return [this.sharedState.default];
      }
      if (this.sharedState?.selected) {
        this.$emit("selected-option",this.sharedState.selected)
        return this.sharedState.selected;
      }
      this.$emit("selected-option",this.sharedState.default)
      return this.sharedState.default;
    },
  },

  methods: {
    handleClickOnSelectToggler(evt) {
      evt.preventDefault();
      this.sharedState.active = true;
    },

    away() {
      this.sharedState.active = false;
    },

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
