<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "값을 입력해주세요",
  },
  maxLength: {
    type: Number,
    default: 80,
  },
  type: {
    type: String,
    default: "text",
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

const modelValue = defineModel();

const cssProps = computed(() => {
  return {
    "--width": props.width + "px",
    "--height": props.height + "px",
  };
});
</script>
<template>
  <div class="inputbox" :style="cssProps">
    <template v-if="label">
      <div :class="!required ? 'inputbox__label' : 'inputbox__label--required'">
        {{ label }}
      </div>
    </template>

    <el-input v-model="modelValue" :placeholder="placeholder" :type="type" />
    <slot name="button" />
    <slot name="bottomtext" />
  </div>
</template>
<style lang="scss" scoped>
.inputbox {
  &__label {
    font-size: 12px;
    margin-bottom: 5px;
    background-color: red;

    /* &--required::before {
      content: "\002A"+ " ";
      color: #ff636c;
    } */
  }

  & :deep() {
    .el-input {
      width: var(--width);
      height: var(--height);
      border-radius: 4px;
    }
  }
}
</style>
