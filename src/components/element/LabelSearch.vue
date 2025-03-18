<template>
    <div class="h-[60px]">
      <div class="mb-[6px] font-normal flex items-center">
        <span class="text-[14px] tracking-[0.7px] font-bold">{{ label }}</span>
      </div>
      <slot />
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String
  });
  </script>
  