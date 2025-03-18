<template>
    <div class="aside-card" :isCollapse="isCollapse">
        <div class="toggle-button" @click="toggleCollapse">
            <img 
                v-show="isCollapse"
                class="panel-open"
                src="@/assets/images/icon-2.svg"
                alt=""
            />
            <img 
                v-show="isCollapse"
                class="panel-close"
                src="@/assets/images/icon-2_hover.svg"
                alt=""
            />
            <img
                v-show="!isCollapse"
                class="panel-open"
                src="@/assets/images/icon-1.svg"
                alt=""
            />
            <img
                v-show="!isCollapse"
                class="panel-close"
                src="@/assets/images/icon-1_hover.svg"
                alt=""
            />
        </div>
        <el-aside
            :width="isCollapse ? '64px' : '320px'"
            :class="isCollapse ? 'aside-collapse no-scrollbar' : 'no-scrollbar'"
        >
            <div class="logo-head">
                <div 
                    :class="isCollapse ? 'size-[50px]' : 'size-[64px]'"
                    class="bg-white flex justify-center items-center rounded-full transition-all duration-150">
                    <img class="w-full" src="@/assets/images/main-logo.svg" alt="logo" sizes=""/>
                </div>
                <div v-show="!isCollapse" class="head-ttl mt-3">
                    {{  userData.hallName }}
                    <span class="font-normal">様</span>
                </div>
                <div v-show="!isCollapse" class="head-logout flex items-center gap-1" @click="dialogLogout = true">
                    ログアウト
                    <img src="@/assets/images/logout-icon.svg" class="inline-block"/>
                </div>
                <div
                    v-if="isCollapse"
                    class="h-[1px] w-[40px] bg-[#ffffff4d] px-[12px] mt-[60px] mb-[37px]"
                ></div>
            </div>
            <div
                :class="`cursor-pointer flex mb-[15px] relative items-center justify-center py-[10px] text-white text-[16px] rounded-[8px] border-[1px] border-[#666] font-medium h-[36px] mw-[100%] ${isCollapse ? 'mx-[5px] px-[12px]' : 'mx-[10px] px-20px'}`"
            >
                <div 
                    :class="`h-[8px] w-[8px] bg-[#E6A23C] rounded-lg absolute top-[14px] ${isCollapse ? 'left-[12px]' : 'mx-[14px] left-[14px]'}`">
                </div>
                <span :class="`${isCollapse && 'ml-10'}`">
                    {{ isCollapse ? 'ブランド管理者 '.substring(0,1) : 'ブランド管理者 ' }}
                </span>
            </div>
            <el-menu
                :default-active="defaultPath ? defaultPath : route.path"
                :collapse-transition="false"
                router
                menu-trigger="click"
                class="el-menu--vertical h-[calc(100v - 370px)] overflow-y-auto"
            >
                <SideBarItem 
                    v-for="(item, index) in listMenu || []"
                    :key="index"
                    :item="item"
                    :isCollapse="isCollapse"
                />
            </el-menu>
            <div class="h-[1px] my-[20px] mx-[12px] bg-[#313236]"></div>
            <div class="logo-uz">
                <img v-show="!isCollapse" src="@/assets/images/logo-uz.svg" alt="" />
                <img v-show="isCollapse" src="@/assets/images/logo-uz-mini.svg" alt="" />
                <p v-show="!isCollapse" class="mt-[12px] text-center text-[#999] text-[11px]">UZ Manager V3</p>
            </div>
        </el-aside>
    </div>
    <div class="main" :class="isCollapse ? 'aside-collapse-main' : ''">
        <HeaderMain :custom-title="String(route.meta.title)"/>
        <AppMain v-loading="store.state.loading" />
    </div>
    <el-dialog v-model="dialogLogout" align-center class="dialog-common">
    <div class="del-cont">
      <img src="@/assets/images/img-2.svg" alt="" />
      <div class="name">ログアウト</div>
      <div class="text">
        UZ managerからログアウトします。
        <br />
        よろしいですか？
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          class="el-button-h48"
          plain
          @click="dialogLogout = false"
        >
          キャンセル
        </el-button>
        <el-button type="primary" class="el-button-h48" @click="handleLogout">
          ログアウトする
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
    import { menu } from '@/constants/index'
    import AppMain from './AppMain.vue';
    import HeaderMain from './HeaderMain.vue'
    import SideBarItem from './SideBarItem.vue';
    import { useRoute } from 'vue-router';
    import { computed, ref, watch, onMounted} from 'vue';
    import { useStore } from 'vuex';
    const userData = { hallName : '喜多方ラーメン坂内'}
    const isCollapse = ref(false)
    const screenWidth = ref();
    const defaultPath = ref();
    const route = useRoute()
    const dialogLogout = ref(false)
    const userRoles = ref('admin')
    const store = useStore()
    watch(
        () => route.path,
        (value) => {
            setActiveMenuItem(value)
        }
    )
    const listMenu = computed(() => {
        return menu.filter(item => item.role.includes(userRoles.value))
    })
    function toggleCollapse() {
        isCollapse.value = !isCollapse.value;
    }

    function funCollapse() {
        screenWidth.value = document.body.clientWidth;

        if (screenWidth.value < 1050) {
            isCollapse.value = true;
        } else {
            isCollapse.value = false;
        }
    }
    const setActiveMenuItem = (value) => {
        value.split('/').length > 3
            ? (defaultPath.value = value.split('/').slice(0, 3).join('/'))
            : (defaultPath.value = value);
    };
    const handleLogout = () => {
        window.location.href = "http://localhost:5173/login"
    }
    onMounted(() => {
        funCollapse();
        setActiveMenuItem(route.path);
        console.log('List Menu:', listMenu.value);

        window.onresize = () => {
            funCollapse();
        };
    });

    watch(listMenu, (newValue) => {
        console.log('List Menu updated:', newValue);
    });
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: none !important;
  transition: width 0.3s;
  border-right: 1px solid #313236;

  :deep(.el-menu) {
    background-color: transparent !important;
    border-right: none !important;
    padding: 6px 0 !important;
    
  }

  &.aside-collapse {
    .logo-head {
      padding: 20px 7px;
    }
  }
}

.head-ttl {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.head-logout {
  font-size: 14px;
  color: #999;
  cursor: pointer;
  justify-content: center;

  &:hover {
    color: #fff;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a; 
  border-radius: 4px;
}
 
::-webkit-scrollbar-thumb {
  background: #666; 
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #888; 
}
</style>
