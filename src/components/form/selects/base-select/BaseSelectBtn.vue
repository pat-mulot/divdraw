<template>
  <button
     @click="handleClickOnDropdownToggler"
     @touchstart="handleClickOnDropdownToggler"
    :class="getActiveClass"
  >
    <div v-if="sharedState.isMultiple" class="text-container">
      <div v-for="option in selectedDatas" :key="option.value">
        <span
          v-if="option?.text"
          class="text"
        >
          {{ option.text }}
        </span>
        <span
          v-if="option?.icon"
          class="icon"
        >
          <fa :icon="option.icon" />
        </span>
      </div>
    </div>
    <div v-else class="text-container">
      <span
        v-if="selectedDatas?.text"
        class="text"
      >
        {{ selectedDatas.text }}
      </span>
      <span
        v-if="selectedDatas?.icon"
        class="icon"
      >
        <fa :icon="selectedDatas.icon" />
      </span>

    </div>
    <div v-if="selectedDatas?.img" class="img-container">
      <img :src="selectedDatas?.img" :alt="`${this.alt ?? ''}`" />
    </div>
    <!-- <div class="toogler-btn-icon">
      <span class="icon" ><fa icon="caret-down" /></span>
    </div> -->
    <div class="toogler-btn-icon">
      <img class="img-icon divdraw" :src="require(`@/assets/images/icons/caret_down_sm_icon.png`)" :alt="`${this.alt ?? ''}`" />
    </div>
  </button>
</template>


<script>
export default {
  name: "BaseSelectBtn",
  props: {
    selected: String,
    selectedDatas: Object,
    img: String,
    icon: String,
    alt: String,
    disabled: Boolean,
  },
  inject: ["sharedState"],
  methods: {
    handleClickOnDropdownToggler(evt) {
      evt.preventDefault();
      this.sharedState.active = !this.sharedState.active;
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
    background-color: transparent;
    border:none;
    cursor: url("@/assets/images/cursors/cursor_pointer.png"), auto;
    color: var(--bk-70);
    transition: 0.1s background-color ease;
    @include flex-center-row;
    padding: 0;

    .text-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .text {
        display: flex;
        height: 100%;
        padding: var(--gap-1-2);
      }
    }

    .toogler-btn-icon {
      display:flex;
      @include flex-center-row;
      height: 100%;
      min-width: 1rem;
      padding: var(--gap-1-2);

      .img-icon {
        height: 1rem;
        width: auto;
        object-fit: contain;
      }
    }
    
    &:hover {
      background-color: var(--bk-10);
    }
    &.active {
      background-color: var(--bk-10);
    }
  }

</style>
