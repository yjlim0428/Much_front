<script setup>
import { BaseLayer } from "@/components/base";
import BaseInput from "@/components/base/BaseInput.vue";

const props = defineProps({
  authLayerOpen: {
    type: Boolean,
  },
});

const emit = defineEmits(["close", "signup"]);
</script>

<template>
  <BaseLayer :isOpen="authLayerOpen" @close="() => emit('close')">
    <h4 class="title">로그인</h4>
    <!-- <BaseInput :width="250" /> -->
    <!-- <button class="btn btn--google" @click="() => getAuthUrl('google')">
      구글 계정으로
    </button>
    <button class="btn btn--kakao" @click="() => getAuthUrl('kakao')">
      카카오 계정으로
    </button> -->

    <button class="layer-cg-btn" @click="() => emit('signup')">
      회원가입 하기
    </button>
  </BaseLayer>
</template>
<style lang="scss" scoped></style>
