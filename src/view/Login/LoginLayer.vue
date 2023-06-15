<script setup>
import { BaseLayer } from "@/components/base";
import BaseInput from "@/components/base/BaseInput.vue";
import { reactive } from "vue";

const props = defineProps({
  authLayerOpen: {
    type: Boolean,
  },
});

const emit = defineEmits(["close", "signup"]);

const inputs = reactive({
  id: "",
  pw: "",
});
</script>

<template>
  <BaseLayer :isOpen="authLayerOpen" @close="() => emit('close')">
    <h4 class="title">로그인</h4>
    <BaseInput v-model="inputs.id" :width="360" :placeholder="'아이디 입력'">
      <template #label>
        <div class="label">
          <spna class="label__text--required">아이디</spna>
        </div>
      </template>
    </BaseInput>
    <BaseInput
      v-model="inputs.pw"
      :width="360"
      :placeholder="'비밀번호 입력'"
      :type="'password'"
    >
      <template #label>
        <div class="label">
          <spna class="label__text--required">비밀번호</spna>
        </div>
      </template>
    </BaseInput>
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
<style lang="scss" scoped>
:deep() {
  .inputbox {
  }
  .base-button {
    margin-left: 10px;
  }
  .bottomtext {
    margin-top: 10px;

    &--success {
      & > span {
        color: #6b71fc;
        font-size: 10px;
      }
    }
    &--err {
      & > span {
        color: #ff636c;
        font-size: 10px;
      }
    }
  }
}
</style>
