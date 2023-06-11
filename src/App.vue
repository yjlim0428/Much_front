<script setup>
import { computed } from "vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import DefaultEmptyLayout from "@/components/layout/DefaultEmptyLayout.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layoutComputed = computed(() => {
  return route.meta.layout === "empty" ? DefaultEmptyLayout : DefaultLayout;
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
