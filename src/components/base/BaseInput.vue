<script setup>
import { ref } from "vue";
const props = defineProps({
  label: {
    type: String,
  },
  submitButton: {
    type: Boolean,
    default: false,
  },
  buttonLabel: {
    type: String,
    default: "제출",
  },
});
</script>
<template>
  <form class="input-form">
    <template v-if="label">
      <h6>{{ label }}</h6>
    </template>
    <template v-if="submitButton">
      <div class="input-form__button-area">
        <input class="input-form__button-area--input" />
        <button class="input-form__button-area--button">
          {{ buttonLabel }}
        </button>
      </div>
    </template>
    <template v-else>
      <input class="input-form--input" />
    </template>
  </form>
</template>
<style scoped lang="scss">
.input-form {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  & input {
    height: 40px;
  }
  &__button-area {
    border: 1px solid red;
    display: flex;
    &--input {
      /* width: 240px; */
    }
  }
}
</style>
