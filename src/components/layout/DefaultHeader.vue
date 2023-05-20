<script setup>
import logo from "@/assets/logo.svg";
</script>
<template>
  <header class="header">
    <img class="header--logo" :src="logo" alt="logo" />
  </header>
</template>
<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #cccccc;
  &--logo {
    height: 28px;
  }
}
</style>
