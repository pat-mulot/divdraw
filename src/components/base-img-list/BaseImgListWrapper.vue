<template>
    <div class="base_img_list-wrapper">
      <div
        v-for="index in maxPerPage"
        :key="`img-${currentPage}-${index}`"
        class="base_img_list-item-container"
        :style="getWidth"
      >
        <div
          v-if="getImageData(index - 1)"
          :class="`base_img_list-item animation-${ this.currentAnimationClass }`"
          :style="`animation-delay: ${(index - 1) * 0.03}s;`"
        >
          <div
            class="image-container"
          >
            <img
              :src="getImageData(index - 1).imageData"
              :alt="`${ this.getImageData(index - 1).fileName }`"
              class=""
            >
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "BaseImgListWrapper",

  props: {
    imgsList: Array,
    currentPage: Number,
    maxPerPage: Number,
    perRow: Object,
    rowsNb: Number,
    perPage: Number,
    currentAnimationClass: String,
  },

  computed: {
    getWidth() {
      return `
        --width-xs: calc(100% / ${ this.perRow.xs });
        --width-sm: calc(100% / ${ this.perRow.sm });
        --width-m: calc(100% / ${ this.perRow.m });
        --width-l: calc(100% / ${ this.perRow.l });
        --width-xl: calc(100% / ${ this.perRow.xl });
        --width-xxl: calc(100% / ${ this.perRow.xxl });
      `;
    },
  },

  methods: {
    getImageData(index) {
      return this.imgsList && index < this.imgsList.length ? this.imgsList[index] : '';
    }
  },

};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.base_img_list-wrapper {
  @include flex-start-row;
  flex-wrap: wrap;
  margin: var(--gap-1-2);
  width: 100%;

  .base_img_list-item-container {
    @include flex-center-row;
    width: var(--width-xs);

    @include screen-small {
      width: var(--width-sm);
    }

    @include screen-medium {
      width: var(--width-m);
    }

    @include screen-large {
      width: var(--width-l);
    }

    @include screen-x-large {
      width: var(--width-xl);
    }

    @include screen-xx-large {
      width: var(--width-xxl);
    }

    .base_img_list-item {
      width: 100%;
      padding: 0.5rem;
      min-height: 32px;
      max-height: 100%;
      opacity: 0;
      transition: .5s max-height ease;

      @include screen-x-small {
        padding: 1rem;
      }

      @include screen-small {
        padding: 1.5rem;
      }

      &.animation-switch-left {
        animation: img-anim-switch-left .2s forwards;
      }

      &.animation-switch-right {
        animation: img-anim-switch-right .2s forwards;
      }

      &.animation-default {
        animation: img-anim-default .2s forwards;
      }

      img {
        object-fit: contain;
        max-width: 100%;
        height: 100%;
        max-height: 70vh;
      }
    }
  }
}

@keyframes img-anim-switch-right {
  0% {
    visibility: visible;
    opacity: 0;
    transform: translateX(-100%) scale(0.5);
  }
  35% {
    transform: translateX(4%);
  }
  65% {
    transform: translateX(-3%);
  }
  80% {
    transform: translateX(2%);
  }
  90% {
    transform: translateX(-1%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    visibility: visible;
  }
}

@keyframes img-anim-switch-left {
  0% {
    visibility: visible;
    opacity: 0;
    transform: translateX(100%) scale(0.5);
  }
  35% {
    transform: translateX(-4%);
  }
  65% {
    transform: translateX(3%);
  }
  80% {
    transform: translateX(-2%);
  }
  90% {
    transform: translateX(1%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    visibility: visible;
  }
}

@keyframes img-anim-default {
  0% {
    visibility: visible;
    opacity: 0;
    transform: translateY(100%) scale(0.5);
  }
  35% {
    transform: translateY(-4%);
  }
  65% {
    transform: translateY(3%);
  }
  80% {
    transform: translateY(-2%);
  }
  90% {
    transform: translateY(1%);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    visibility: visible;
  }
}

</style>
