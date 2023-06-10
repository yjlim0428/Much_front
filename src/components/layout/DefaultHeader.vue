<script setup>
import { ref } from "vue";
import logo from "@/assets/logo.svg";

import apiClient from "@/service/config";
import { useBroadcast } from "@/composable/broadcast";
import { useRouter } from "vue-router";

import LoginLayer from "@/view/Login/LoginLayer.vue";

const bc = useBroadcast("OAUTH_SUCCESS");
const router = useRouter();

const authLayerOpen = ref(false);

function handleLayer() {
  authLayerOpen.value = !authLayerOpen.value;
}

async function getAuthUrl(type) {
  const { code, message, result } = await apiClient(
    `/oauth2/authorization/${type}`
  );

  console.log({ code, message, result });
  if (code !== 200) {
    alert(message);
    return;
  }

  openOauthPopup(result);
}

function openOauthPopup(data) {
  window.open(
    result.loginUri,
    "_blank",
    "toolbar=no,resizable=no,width=450,height=600"
  );
}

function gotoSignup() {
  router.push("/signup");
}

bc.listenMessage((e) => {
  const { data } = e;
  if (data.code === "KAKAO") {
    router.push(data.path);
  }
  if (data.code === "GOOGLE") {
    router.push(data.path);
  }
});
</script>
<template>
  <header class="header">
    <img class="header__logo" :src="logo" alt="logo" />
    <div class="header__right">
      <button class="header__right__btn" @click="handleLayer">로그인</button>
      <!-- <button class="header__right__btn" @click="gotoSignup">회원가입</button> -->
    </div>
  </header>

  <!-- 로그인&회원가입 모달 -->
  <LoginLayer
    :authLayerOpen="authLayerOpen"
    @close="handleLayer"
    @signup="gotoSignup"
  />
</template>
<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #cccccc;
  &__logo {
    height: 28px;
  }
  &__right {
    margin-left: auto;
    & > * + * {
      margin-left: 20px;
    }
    &__btn {
      background: none;
      border: none;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
}

.outer :deep() {
  .layer {
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
    & > .title {
      font-size: 20px;
      font-weight: 500;
      margin: 50px 0;
    }
    & > .btn {
      width: 340px;
      height: 40px;
      border-radius: 4px;
      cursor: pointer;
      &--google {
        background-color: #fff;
        border: 1px solid #d4d4d4;
      }
      &--kakao {
        background-color: #ffea17;
        border: none;
      }
    }
    & > .btn + .btn {
      margin-top: 10px;
    }
    & > .sub {
      font-size: 12px;
      text-align: center;
      margin: 40px 0 23px 0;
      & > strong {
        font-weight: 500;
        color: red;
      }
    }
    & > .layer-cg-btn {
      all: unset;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
}
</style>
