<template>
  <el-sub-menu
    :class="{
      'is-active': $route.fullPath.includes(item.url),
      'is-collapse': isCollapse,
      'is-opened': isOpened
    }"
    class="menu-item"
    :index="item.url"
    :expand-close-icon="isCollapse ? BlankIcon : ExpandCloseIcon"
    :expand-open-icon="isCollapse ? BlankIcon : ExpandOpenIcon"
    :style="{ backgroundColor: 'none' }"
    @click="toggleMenu"
    ref="subMenu"
  >
    <template #title>
      <el-tooltip v-if="isCollapse" :content="item.name" effect="dark" placement="right">
        <div class="flex items-center h-full w-full" :class="{ 'justify-center': isCollapse }">
          <el-icon class="menu-icon" :class="{ 'is-active': $route.fullPath.includes(item.url) }">
            <img
              :src="getImgUrl($route.fullPath.includes(item.url) ? item.iconActive : item.iconNoActive)"
            />
          </el-icon>
        </div>
      </el-tooltip>
      <el-icon v-else class="menu-icon" :class="{ 'is-active': $route.fullPath.includes(item.url) }">
        <img
          :src="getImgUrl($route.fullPath.includes(item.url) ? item.iconActive : item.iconNoActive)"
        />
      </el-icon>
      <span v-if="!isCollapse">{{ item.name }}</span>
      <div v-if="!isCollapse" class="flex items-center justify-end w-full">
        <img
          :src="getImgUrl(isOpened ? 'icon-arrow.svg' : 'icon-down.svg')"
          class="w-[12px] h-[12px] transition-all duration-300"
        />
      </div>
    </template>

    <!-- Chỉ hiển thị menu item nếu submenu được mở -->
    <div v-if="isCollapse && isOpened">
      <el-tooltip
        v-for="(child, index) in item.children"
        :key="index"
        :content="child.name"
        effect="dark"
        placement="right"
      >
        <el-menu-item
          v-show="!child.hidden"
          :index="trimUrlPath(child.url)"
          :route="child.url"
          :class="['collapsed-menu-item', { 'active-item': $route.fullPath.includes(child.url) }]"
        >
          <div :class="{ 'flex justify-center w-full': isCollapse }">
            {{ isCollapse ? child.name.substring(0, 1) : child.name }}
          </div>
        </el-menu-item>
      </el-tooltip>
    </div>

    <el-menu-item
      v-show="!isCollapse && !child.hidden"
      v-for="(child, index) in item.children"
      :key="index"
      :index="trimUrlPath(child.url)"
      :route="child.url"
      :class="['expanded-menu-item', { 'active-item': $route.fullPath.includes(child.url) }]"
    >
      {{ isCollapse ? child.name.substring(0, 1) : child.name }}
      <div v-if="!isCollapse" class="flex items-center justify-end w-full icon-arrow">
        <img
          src="@/assets/images/icon-left.svg"
          class="w-[12px] h-[12px] transition-all duration-300"
        />
      </div>
    </el-menu-item>
  </el-sub-menu>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import ExpandCloseIcon from '@/components/icons/ExpandCloseIcon.vue';
import ExpandOpenIcon from '@/components/icons/ExpandOpenIcon.vue';
import BlankIcon from '@/components/icons/BlankIcon.vue';

const getImgUrl = (imageNameWithExtension) => {
  if (imageNameWithExtension) {
    return new URL(`../assets/images/${imageNameWithExtension}`, import.meta.url).href;
  }
};

const props = defineProps({
  item: Object,
  isCollapse: Boolean,
});

const subMenu = ref(null);
const isOpened = ref(false);

const trimUrlPath = (value) => {
  return value.split('/').length > 3 ? value.split('/').slice(0, 3).join('/') : value;
};
const toggleMenu = (event) => {
  if (event.target.classList.contains('el-menu-item') || event.target.classList.contains('el-menu') || event.target.classList.contains('icon-arrow')) {
    return;
  }else{
    isOpened.value = !isOpened.value;
  }
};

onMounted(async () => {
  await nextTick();
  if (props.item.children) {
    const hasActiveChild = props.item.children.some(
      (child) => !child.hidden && child.url && location.href.includes(child.url)
    );

    if (hasActiveChild) {
      isOpened.value = true;
    }
  }
});

// // Watch location.href để cập nhật isOpened đúng với trạng thái menu
// watch(
//   () => location.href,
//   (newVal) => {
//     if (props.item.children) {
//       const hasActiveChild = props.item.children.some(
//         (child) => !child.hidden && child.url && newVal.includes(child.url)
//       );

//       if (hasActiveChild) {
//         isOpened.value = true;
//       }
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="scss" scoped>
  .el-sub-menu {
    background-color: transparent !important;
  
    :deep(.el-sub-menu__title) {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.4) !important;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 20px;
  
      &:hover {
        background-color: #1a1a1a !important;
        color: rgba(255, 255, 255, 0.7) !important;
      }
    }
  
    &.is-active {
      :deep(.el-sub-menu__title) {
        background-color: none !important;
        color: #fff !important;
      }
    }
  
    &.is-collapse {
      :deep(.el-sub-menu__title) {
        padding: 0 !important;
        justify-content: center !important;
      }
    }
  
    :deep(.el-menu) {
      background-color: transparent !important;
    }
  
    :deep(.el-menu-item) {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.4) !important;
      transition: all 0.3s ease;
  
      &:hover {
        background-color: #B81C22 !important;
        color: #fff !important;
      }
  
      &.is-active {
        background-color: #B81C22 !important;
        color: #fff !important;
      }
      
      &.active-item {
        background-color: #B81C22 !important;
        color: #fff !important;
      }
  
      &.collapsed-menu-item {
        padding: 0 !important;
        margin: 4px auto !important;
        width: 36px !important;
        height: 36px !important;
        display: flex !important;
        border-radius: 4px !important;
      }
  
      &.expanded-menu-item {
        padding-left: 54px !important;
        margin: 4px 10px !important;
        padding-right: 10px !important;
      }
    }
  }


</style>
