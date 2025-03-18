<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { ja } from 'element-plus/es/locales.mjs';
</script>

<template>
  <el-config-provider :locale="ja">
    <router-view/>
  </el-config-provider>
</template>