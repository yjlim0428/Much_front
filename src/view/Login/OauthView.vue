<script setup>
import apiClient from "@/service/config";
import { useRoute, useRouter } from "vue-router";
import { useBroadcast } from "@/composable/broadcast";

const route = useRoute();
const router = useRouter();
const bc = useBroadcast("OAUTH_SUCCESS");

const oauthCode = route.query.code;
const oauthType = route.path.split("/")[2];

async function postOauthCode(code) {
  const { data } = await apiClient.post(
    `/oauth2/code/${oauthType}?code=${code}`
  );

  // 카카오 : 추가 정보 입력
  if (data.code === 8100) {
    bc.postMessage({ code: "KAKAO", path: "/signup/kakao" });
  }
  // 구글 :  추가정보 + 문자인증 필요
  if (data.code === 8101) {
    bc.postMessage({ code: "GOOGLE", path: "/signup/google" });
  }

  // 기존 사용자 || 연동
  if (data.code === 200) {
    router.push("/");
  }

  window.close();
}

await postOauthCode(oauthCode);
</script>
<template>
  <div></div>
</template>
<style lang="scss" scoped></style>
