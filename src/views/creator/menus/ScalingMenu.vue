<template>
  <div class="scaling-menu-container top-menu-bloc">
    <div class="scale-group-btns-wrapper">
      <div class="actions-group-btns scale-group-btns-row">
        <button
          class="action-btn scale-down-btn"
          @click.prevent="handleClickOnScaleBtn(-1)"
          @touchstart.prevent="handleClickOnScaleBtn(-1)"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/zoom_minus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
        <div class="text-input-container">
          <input
            type="text"
            :value="`${ scale * 100 }`"
            placeholder="---"
            @blur="handleTypeScale"
            @keyup.enter="onPressEnter"
          />
        </div>
        <button
          class="action-btn scale-up-btn"
          @click.prevent="handleClickOnScaleBtn(1)"
          @touchstart.prevent="handleClickOnScaleBtn(1)"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/zoom_plus_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
      <div class="actions-group-btns scale-range-row">
        <input
          class="range-btn"
          type="range"
          @input.prevent="handleRangeScale"
          min="0"
          max="400"
          :value="`${ scale * 100 }`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScalingMenu",
  
  props: {
    scale: Number,
  },

  data() {
    return {
      showScaleMenu: false,
    };
  },

  methods: {
    onPressEnter(evt) {
      evt.currentTarget.blur();
    },

    handleRangeScale(evt) {
      let scaleValue = parseInt(evt.currentTarget.value) / 100;
      this.$emit("set-scale", scaleValue);
    },

    handleClickOnScaleBtn(dirValue) {
      let scaleValue = parseInt((this.scale + ((dirValue / 100) * 4)) * 100) / 100;
      this.$emit("set-scale", scaleValue);
    },

    handleTypeScale(evt) {
      evt.preventDefault();
      let scaleValue = parseInt(evt.currentTarget.value) / 100;
      this.$emit("set-scale", scaleValue);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.single-cursor-btn {
  display: none;
  @include screen-small {
    display: flex;
  }
}

.scale-group-btns-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text-input-container {
    
    input {
      display: flex;
      max-width: calc(var(--btn-size) * 3);
      background-color: transparent;
      text-align: center;
      height: var(--btn-size);
      outline: none;
      min-width: 2.5rem;
    }
  }

  .scale-range-row {
    max-width: calc(var(--btn-size) * 4 - (var(--gap-1)));

    .range-btn {
      display: flex;
      width: 100%;
      height: var(--btn-size);
      margin: 0;
    }

  }
}

</style>
