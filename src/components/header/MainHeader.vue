<template>
  <header :class="`main_header${fixed ? ' fixed' : ''}${hide ? ' hide' : ''}`">
    <div class="main_header-title-container">
      <div class="left-menu-container">
        <!-- <baseBurgerBtn /> -->
        <div class="home-btn">
          <router-link :to="{ path: `/${ this.$getLocale() ?? 'fr' }/` }" class="home-link">
            <div class="divdraw_letters-wrapper">
              <div class="letter-container d_letter_1-container">
                <img
                  class="home-btn-logo divdraw img-icon d_letter_1"
                  src="@/assets/images/letters/d_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
              <div class="letter-container i_letter-container">
                <img
                  class="home-btn-logo divdraw img-icon i_letter"
                  src="@/assets/images/letters/i_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
              <div class="letter-container v_letter-container">
                <img
                  class="home-btn-logo divdraw img-icon v_letter"
                  src="@/assets/images/letters/v_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
              <div class="letter-container d_letter_2-container">
                <img
                  class="home-btn-logo divdraw img-icon d_letter_2"
                  src="@/assets/images/letters/d_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
              <div class="letter-container ra_letter-container">
                <img
                  class="home-btn-logo divdraw img-icon ra_letter"
                  src="@/assets/images/letters/ra_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
              <div class="letter-container w_letter-container">
                <img
                  class="home-btn-logo divdraw img-icon w_letter"
                  src="@/assets/images/letters/w_letter_sm.png"
                  alt="logo divdraw"
                />
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="right-menu-container">
        <div class="menu-btn">
          <darkModeBtn
            @click="handleClickOnDarkModeBtn"
            @touchstart="handleClickOnDarkModeBtn"
            :darkModeEnabled="darkModeEnabled"
          />
        </div>
        <div class="menu-btn">
          <baseDropdown :img="getLocaleFlag" class="language-selector">
            <BaseDropdownContent class="fix-center border">
              <BaseDropdownItem
                :name="`en`"
                :value="`en`"
                :img="require(`@/assets/images/country-flags/en.svg`)"
                :alt="$t(`en_flag_img`)"
                :active="getLocale === 'en'"
                @click="handleClickOnLocale"
                @touchstart="handleClickOnLocale"
              />
              <BaseDropdownItem
                :name="`fr`"
                :value="`fr`"
                :img="require(`@/assets/images/country-flags/fr.svg`)"
                :alt="$t(`fr_flag_img`)"
                :active="getLocale === 'fr'"
                @click="handleClickOnLocale"
                @touchstart="handleClickOnLocale"
              />
            </BaseDropdownContent>
          </baseDropdown>
        </div>
      </div>
    </div>
    <!-- <baseNavBar>
      <BaseNavLink v-for="link in navLinks" :key="link" :link="link" />
    </baseNavBar> -->
  </header>
</template>

<script>
// import baseNavBar from "@/components/navbar/BaseNavBar.vue";
// import BaseNavLink from "@/components/navbar/BaseNavLink.vue";
import baseDropdown from "@/components/dropdown/base-dropdown/BaseDropdown.vue";
import BaseDropdownContent from "@/components/dropdown/base-dropdown/BaseDropdownContent.vue";
import BaseDropdownItem from "@/components/dropdown/base-dropdown/BaseDropdownItem.vue";
import darkModeBtn from "@/components/header/DarkModeBtn.vue";
// import baseBurgerBtn from "@/components/header/burger/BaseBurgerBtn.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainHeader",
  components: {
    // baseNavBar,
    // BaseNavLink,
    baseDropdown,
    BaseDropdownContent,
    BaseDropdownItem,
    // baseBurgerBtn,
    darkModeBtn,
  },
  props: {
    darkModeEnabled: Boolean,
    isUserLoggedIn: Boolean,
    fixed: Boolean,
    hide: Boolean,
  },
  setup() {
    const msg = {};
    return { msg };
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      getLocale: "language/locale",
      getLocaleFlag: "language/flag",
    }),

    isDarkModeEnabled() {
      return this.darkModeEnabled;
    },
  },
  methods: {
    ...mapActions({
      setLocaleAction: "language/set",
    }),

    handleClickOnLocale(evt) {
      evt.preventDefault();
      let selectedLocale = evt.currentTarget.dataset.value;
      this.selectedImgSrc =
        evt.currentTarget.querySelector(".img-container img")?.src;
      this.setLocaleAction(selectedLocale);
      this.$router.push({
        name: this.$route.name,
        params: {
          lang: selectedLocale,
        },
      });
    },
    
    handleClickOnDarkModeBtn(evt) {
      evt.preventDefault();
      this.$emit("dark-mode", !this.darkModeEnabled);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.main_header {
  height: var(--header-height);
  @include flex-center-col;
  visibility: visible;
  transition: var(--anim-duration-2) transform ease, var(--anim-duration-2) visibility 0s ease;
  width: calc(100% - var(--gap-1));
  padding: 0 var(--gap-1-2);
  background-color: var(--wt-30);

  .main_header-title-container {
    @include flex-between-row;
    width: 100%;
    height: 100%;

    .left-menu-container,
    .right-menu-container {
      height: 100%;
      @include flex-center-row;
    }

    .left-menu-container {
    }
    .right-menu-container {
    }
    .home-btn {
      .home-link {
        @include flex-center-row;

        .home-btn-logo {
          @include flex-center-row;
          max-height: 1.5rem;
          height: 100%;
          width: auto;
          padding: var(--gap-1-8);
        }
        .hom-link-text {
          display: flex;
          margin-left: var(--gap-1);
        }
      }

      .divdraw_letters-wrapper {
        @include flex-center-row;
        position: relative;

        .d_letter_1-container {
          left: 0;
        }

        .i_letter-container {
          left: 17px;
        }

        .v_letter-container {
          left: 21px;
        }

        .d_letter_2-container {
          left: 35px;
        }

        .ra_letter-container {
          left: 53px;
        }

        .w_letter-container {
          left: 72px;
        }

        // &:hover {
          .letter-container {
            position: absolute;

            .d_letter_1 {
              animation: 5s letter-anim-1 1s linear infinite;
            }

            .i_letter {
              animation: 5s letter-anim-1 .8s linear infinite;
            }

            .v_letter {
              animation: 5s letter-anim-1 .6s linear infinite;
            }

            .d_letter_2 {
              animation: 5s letter-anim-1 .4s linear infinite;
            }

            .ra_letter {
              animation: 5s letter-anim-1 .2s linear infinite;
            }

            .w_letter {
              animation: 5s letter-anim-1 .0s ease-in-out infinite;
            }

          }
        // }

        // &:hover {
        // }

        @keyframes letter-anim-1 {
          0% {
            transform: scale(1,1) rotate(0) translateX(0);
          }
          25% {
            transform: scale(1.2,0.9) rotate(5deg) translateX(10%);
          }
          75% {
            transform: scale(0.9,1.2) rotate(-5deg) translateX(-10%);
          }
          100% {
            transform: scale(1,1) rotate(0) translateX(0);
          }
        }
        
        .home-btn-logo {
          padding:0;
          margin:0;
          height: 1.5rem;
          object-fit: contain;
          // transition: transform .2s ease;
          // position: absolute;
          z-index: 1;
          transform: scale(1,1) rotate(0);
          transition: .2s transform ease;

          // &:hover {
          //   z-index: 2;
          // }
        }

        .d_letter_1-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        .i_letter-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        .v_letter-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        .d_letter_2-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        .ra_letter-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        .w_letter-container {
          &:hover {
            animation: 2s letter-anim-2 .0s ease-out;
          }
        }

        @keyframes letter-anim-2 {
          0% {
            transform: scale(1,1) translate(0, 0);
          }
          2% {
            transform: scale(0.8,0.8) translate(-15%, 10%);
          }
          12% {
            transform: scale(1.1,1.1) translate(0, 0);
          }
          28% {
            transform: scale(0.9,0.9) translate(10%, -5%);
          }
          55% {
            transform: scale(1.05,1.05) translate(0, 0);
          }
          75% {
            transform: scale(0.95,0.95) translate(5%, 0);
          }
          100% {
            transform: scale(1,1) translate(0%, 0);
          }
        }
      }
    }
    .menu-btn {
      @include flex-center-row;
      height: 100%;
    }
  }
  
  &.fixed {
    position: fixed;
    z-index: 9;
  }
  
  &.hide {
    transform: translateY(-100%);
    visibility: hidden;
  }

  .language-selector {
    height: 100%;
  }
}
</style>
<style lang="scss">
.language-selector {
  .dropdown-item,
  .toogler-btn {
    .img-container {
      display: flex;
      border: solid var(--border-size-1) var(--bk-30);
      img {
        object-fit: contain;
        height: 1rem;
        width: auto;
      }
    }
  }
}
</style>