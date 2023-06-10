<script setup>
import DefaultHeader from "./DefaultHeader.vue";
</script>
<template>
  <DefaultHeader />
  <main>
    <router-view />
  </main>
</template>
<style scoped lang="scss">
main {
  /* min-height: calc(100vh - 61px); */
  overflow-y: auto;
}
</style>
