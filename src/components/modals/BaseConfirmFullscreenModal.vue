<template>
  <BaseFullscreenModal
    :class="`
      confirm-fullscreen-modal-container
      ${ isConfirmMsg ? confirmDatas?.class : '' }
      ${ showClass }
    `"
    v-on:click-on-background="handleClickOnBackground"
  >
    <template
        v-if="isConfirmMsg" v-slot:header>
      <div
        class="fullscreen-modal-title-container">
        <h3 class="fullscreen-modal-title" >{{ confirmDatas?.title ?? "" }}</h3>
        <button
          class="close-modal-btn modal-btn"
          @click.prevent="handleClickOnCloseModal"
          @touchend.prevent="handleClickOnCloseModal"
        >
          <div class="icon">
            <img :src="require(`@/assets/images/icons/cross_icon.png`) ?? ''" alt="" class="img-icon divdraw">
          </div>
        </button>
      </div>
    </template>

    <template
        v-if="isConfirmMsg" v-slot:body>
      <p v-if="confirmDatas.message">{{ confirmDatas?.message }}</p>
    </template>

    <template
        v-if="isConfirmMsg" v-slot:footer>
      <div class="btns-container">
        <button
          class="modal-btn danger"
          @click="cancelAction"
          @touchend="cancelAction"
        >
          <span class="text">{{ $t("cancel_btn") }}</span>
          <span class="icon"><fa icon="times" /></span>
          </button>
        <button
          class="modal-btn success"
          @click="confirmAction"
          @touchend="confirmAction"
        >
          <span class="text">{{ $t("confirm_btn") }}</span>
          <span class="icon"><fa icon="check" /></span>
          
        </button>
      </div>
    </template>

  </BaseFullscreenModal>
</template>

<script>
import store from "@/store";
import BaseFullscreenModal from "@/components/modals/BaseFullscreenModal.vue";
import { mapGetters } from "vuex";


export default {
  name: "BaseConfirmFullscreenModal",
  components: {
    BaseFullscreenModal,
  },

  data() {
    return {
      modalClass: "",
    }
  },

  mounted() {
    if (this.isConfirmMsg) {
      this.modalClass = " show";
    }
  },

  computed: {
    ...mapGetters({
      isConfirmMsg: "confirmMsg/check",
      confirmDatas: "confirmMsg/getMsg",
      showClass: "confirmMsg/getShowClass",
    }),
  },

  methods: {
    handleClickOnBackground() {
      this.removeConfirmMsg();
    },

    cancelAction() {
      this.removeConfirmMsg();
    },

    confirmAction() {
      this.confirmDatas?.confirm_callback();
      this.removeConfirmMsg();
    },

    handleClickOnCloseModal() {
      this.removeConfirmMsg();
    },

    handleClickOnModalBg() {
      this.removeConfirmMsg();
    },

    removeConfirmMsg() {
      this.modalClass = "";
      store.dispatch("confirmMsg/hide");
      setTimeout(() => {
        store.dispatch("confirmMsg/set", null);
      }, 100);
    },
  }
};
</script>

