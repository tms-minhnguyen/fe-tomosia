<template>
    <div class="mb-[30px]">
      <el-breadcrumb :separator-icon="SeparatorIcon">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
          <div
            :class="
              index === breadcrumb.length - 1
                ? 'pointer-events-none'
                : 'cursor-pointer hover:text-[#226ACE] hover:underline transition-all duration-150'
            "
            @click="goToPage(item.path)"
          >
            {{ item.name }}
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
  
      <p class="header-title">
        {{ customTitle }}
      </p>
    </div>
  </template>
  
  <script setup>
  import SeparatorIcon from '@/components/icons/SeparatorIcon.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  defineProps({
    customTitle: String
  });
  
  const breadcrumb = ref([]);
  const route = useRoute();
  const router = useRouter();
  
  function setBreadcrumb() {
    breadcrumb.value = route.matched
      .map((item) => {
        return {
          name: String(item.meta.title),
          path: replacePath(
            item.path,
            route.params
          )
        };
      })
      .filter((item) => !!item.name);
  }
  
  const replacePath = (path, params) => {
    return path.replace(/:(\w+)/g, (_, key) => String(params[key] ?? ''));
  };
  
  const goToPage = (path) => {
    router.push(path);
  };
  
  watch(
    () => route.path,
    () => {
      setBreadcrumb();
    }
  );
  
  onMounted(() => {
    setBreadcrumb();
  });
  </script>
  
  <style lang="scss" scoped>
  .link {
    color: var(--el-color-primary);
    text-decoration: underline;
    cursor: pointer;
  
    &:hover {
      opacity: 0.6;
    }
  }
  </style>
  