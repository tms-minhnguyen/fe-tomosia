<template>
    <el-form-item :name="keyInput" class="relative w-[280px] h-[36px] mb-0">
      <el-input
        ref="inputRef"
        :model-value="value"
        :disabled="disabled"
        :placeholder="placeholderText"
        @input="changeInput"
      />
    </el-form-item>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const props = defineProps({
    value: {
      default: "",
    },
    keyInput: {
      default: "",
    },
    label: {
      default: "",
    },
    disabled: {
      default: false,
    },
    placeholderText: {
      default: "",
    },
  });
  
  const emit = defineEmits(["update:value", "update:disabled"]);
  
  const changeInput = (e) => {
    emit("update:value", e);
  };
  
  const inputRef = ref();
  </script>
  
  <style lang="scss" scoped>
  .el-input {
    :deep(.el-input__wrapper) {
      padding: 1px 11px 0 15px;
    }
  }
  </style>
  