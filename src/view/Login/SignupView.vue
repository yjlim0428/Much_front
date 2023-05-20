<script setup>
import { BaseInput } from "@/components/base";
</script>
<template>
  <article class="contents">
    <div>sdfs</div>
    <BaseInput :label="'전화번호'" :submitButton="true" />
  </article>
</template>
<style lang="scss" scoped>
.contents {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
}
</style>
