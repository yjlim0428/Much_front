<script setup>
import { onMounted, computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 360,
  },
  height: {
    type: Number,
    default: 40,
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};

onMounted(() => {
  document.body.style = `overflow: hidden`;
  return () => (document.body.style = `overflow: auto`);
});

const cssProps = computed(() => {
  return {
    "--width": props.width + "px",
    "--height": props.height + "px",
  };
});
</script>
<template>
  <template v-if="isOpen">
    <div class="outer" :style="cssProps">
      <div class="layer">
        <button class="layer__close" @click="handleClose">
          <span class="material-symbols-outlined"> close </span>
        </button>
        <slot />
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.outer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.layer {
  width: var(--width);
  height: var(--height);
  background-color: white;
  position: relative;
  padding: 20px;
  border-radius: 12px;
  box-sizing: border-box;
  &__close {
    all: unset;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #d4d4d4;
    cursor: pointer;
  }
}
</style>
