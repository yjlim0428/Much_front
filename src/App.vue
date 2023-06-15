<script setup>
import { computed, onMounted } from "vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import DefaultEmptyLayout from "@/components/layout/DefaultEmptyLayout.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();

const layoutComputed = computed(() => {
  return route.meta.layout === "empty" ? DefaultEmptyLayout : DefaultLayout;
});

onMounted(() => {
  const token = localStorage.getItem("token");
  // 로그인 했으면
  if (token) {
    // 스토어에 토큰, 유저 정보 세팅
    authStore.setToken(token);
    authStore.setLoginUser(token);
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <Component :is="layoutComputed" />
    </template>
    <template #fallback>
      <div>loading....</div>
    </template>
  </Suspense>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
}
</style>
