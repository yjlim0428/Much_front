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
  height: calc(100vh - 61px);
}
</style>
