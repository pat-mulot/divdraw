<template>
  <div v-if="isFlashMsg" class="base-flash_msg-container">
    <BaseFlashMsg
      v-for="msgDatas in flashMsgList"
      :key="msgDatas"
      :msgDatas="msgDatas"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseFlashMsg from "@/components/flash-msg/BaseFlashMsg.vue";

export default {
  name: "BaseFlashMsgWrapper",
  components: {
    BaseFlashMsg,
  },
  computed: {
    ...mapGetters({
      isFlashMsg: "flashMsg/check",
      flashMsgList: "flashMsg/getList",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/main.scss";

.base-flash_msg-container {
  position: fixed;
  top: var(--gap-1);
  right: var(--gap-1);
  z-index: 10;

  * {
    color: var(--wt-90);
  }
}

body.dm {

  .base-flash_msg-container {

    * {
      color: var(--bk-90);
    }
  }
}
</style>
