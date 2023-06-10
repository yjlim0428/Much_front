<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
  },
  fontColor: {
    type: String,
    default: "#6b71fc",
  },
  width: {
    type: Number,
    default: 110,
  },
  height: {
    type: Number,
    default: 40,
  },
});

const emit = defineEmits(["onClick"]);

const cssProps = computed(() => {
  return {
    "--width": props.width + "px",
    "--height": props.height + "px",
    "--bgColor": props.bgColor,
    "--color": props.fontColor,
  };
});
</script>
<template>
  <button class="base-button" :style="cssProps" @click="emit('onClick')">
    {{ label }}
  </button>
</template>
<style lang="scss" scoped>
.base-button {
  all: unset;
  width: var(--width);
  height: var(--height);
  background-color: var(--bgColor);
  color: var(--color);
  text-align: center;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #6b71fc;
  cursor: pointer;
  &:hover {
    /* transition: background-color;
    background-color: #f6f6ff; */
  }
}
</style>
