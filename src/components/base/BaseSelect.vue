<script setup>
import { computed } from "vue";

const modelValue = defineModel();

const props = defineProps({
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "값을 선택해주세요",
  },
  dataList: {
    type: Array,
    default: [],
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

const cssProps = computed(() => {
  return {
    "--width": props.width + "px",
    "--height": props.height + "px",
  };
});
</script>
<template>
  <div class="selectbox" :style="cssProps">
    <slot name="label" />
    <el-select
      v-model="modelValue"
      class="m-2"
      :placeholder="placeholder"
      size="large"
    >
      <el-option
        v-for="item in dataList"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.selectbox {
  & :deep() {
    .el-select {
      width: var(--width);
      height: var(--height);
      border-radius: 4px;
    }
  }
}
</style>
