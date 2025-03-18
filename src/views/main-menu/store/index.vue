<template>
  <div class="w-full">
    <div
        class="relative w-full h-auto min-h-[271px] py-5 sm:py-10 px-4 sm:px-[50px] border-[1px] border-solid border-[#E5E5E5] rounded-lg bg-[#FFF]"
    >
        <div class="text-[16px] sm:text-[18px] font-bold">検索条件</div>
        <el-form class="flex flex-col sm:inline-flex mt-4 sm:mt-[30px] gap-4 sm:gap-[20px]">
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-[20px]">
                <LabelSearch label="店舗コード" class="w-full sm:w-[300px] text-gray-400">
                    <InputSearch 
                        keyInput="storeCode"
                        placeholderText="店舗コードを入力"
                        class="w-full min-w-0"
                    />
                </LabelSearch>

                <LabelSearch label="店舗名" class="w-full sm:w-[300px] text-gray-400">
                    <InputSearch 
                        keyInput="storeName"
                        placeholderText="店舗名を入力・選択"
                        class="lg:w-full min-w-0 sm:w-[200px]"
                    />
                </LabelSearch>
            </div>
        </el-form>
        <div class="w-full mt-6 sm:mt-[45px] justify-center gap-3 sm:gap-[20px] flex flex-col sm:flex-row"> 
            <ButtonAction 
                text="すべてクリア"
                classWidHei="w-full sm:w-[168px] h-[40px]"
                fontSize="text-[14px] sm:text-[16px]"
                :action="false"
            />
            <ButtonAction 
                text="検索する" 
                classWidHei="w-full sm:w-[168px] h-[40px]" 
                fontSize="text-[14px] sm:text-[16px]" 
                :action="true"
            />
        </div>
    </div>
    <div class="mt-20">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <h1 class="text-4xl font-bold">72</h1>
          <span class="text-xl text-gray-500 items-center justify-center flex">
            件中 件を表示
          </span>
        </div>
        <div class="flex gap-5 items-center">
          <div class="flex gap-5 items-center">
            <span class="font-normal text-xl text-gray-500">
              並べ替え              
            </span>
            <el-select  placeholder="並べ替え" class="custom-select">
              <el-option label="店舗コード" value="storeCode"></el-option>
              <el-option label="店舗名" value="storeName"></el-option>
            </el-select>
          </div>
          <div class="flex gap-5 items-center">
            <span class="font-normal text-xl text-gray-500">
              表示件数          
            </span>
            <el-select  placeholder="表示件数" class="custom-select">
              <el-option label="20件" :value="20"></el-option>
              <el-option label="50件" :value="50"></el-option>
              <el-option label="100件" :value="100"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-table 
        style="width: 100%; margin-top: 5px;"
        :data="stores"
      >
        <el-table-column prop="id" label="店舗コード" width="120" align="left" />
        <el-table-column prop="name" label="店舗コード" width="150" align="left" />
        <el-table-column prop="prefectures" label="店舗コード" width="150" align="left" />
        <el-table-column prop="address1" label="店舗コード" width="150" align="left" />
        <el-table-column prop="address2" label="店舗コード" width="150" align="left" />
        <el-table-column prop="building" label="店舗コード" width="150" align="left" />
        <el-table-column prop="phone" label="店舗コード" width="160" align="left" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" plain size="small">詳細</el-button>
            <el-button type="danger" size="small" @click="deleteStore(row.id)">削除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import LabelSearch from '@/components/element/LabelSearch.vue';
import InputSearch from '@/components/element/InputSearch.vue';
import ButtonAction from '@/components/button/ButtonAction.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Lấy danh sách stores từ Vuex
const stores = computed(() => store.getters["stores/storesList"]);
const isLoading = computed(() => store.getters["stores/isLoading"]);
onMounted(async () => {
  await store.dispatch("stores/fetchStores");
  console.log("Fetched stores data:", stores.value); // Lúc này dữ liệu đã có
});
const columns = [
  { prop: 'time', label: '時間', width: 150, align: 'left' },
  { prop: 'storeCode', label: '店舗コード', width: 150, align: 'left' },
  { prop: 'storeName', label: '店舗名', width: 150, align: 'left' },
  { prop: 'address', label: '住所', width: 150, align: 'left' },
  { prop: 'phone', label: '電話番号', width: 150, align: 'left' },
  { prop: 'manager', label: '担当者', width: 150, align: 'left' },
  { prop: 'status', label: 'ステータス', width: 150, align: 'left' },
  { prop: 'actions', label: '操作', width: 150, align: 'left' }
];

</script>

<style lang="scss" scoped>
.select-custom {
  :deep(.el-select__wrapper) {
    height: 36px;
  }
}

.custom-select {
  width: 200px;
  :deep(.el-input__wrapper) {
    padding: 0 16px !important;
  }
  :deep(.el-input__inner) {
    text-align: left;
  }
}

.el-table {
  table-layout: fixed;
  width: 100%;
  
  :deep(.el-table__header) {
    width: 100% !important;
    table-layout: fixed !important;
    
    .el-table__cell {
      height: 50px;
      padding: 0;
      background-color: #F5F7FA;
    }
  }
  
  :deep(.el-table__body) {
    width: 100% !important;
    table-layout: fixed !important;
  }

  :deep(.el-table__body-wrapper) {
    .el-table__cell {
      height: 60px;
      padding: 0 35px !important;
    }
  }

  :deep(.el-table__column) {
    padding: 0 35px !important;
  }

  :deep(.el-table__header-wrapper) {
    .el-table__cell {
      padding: 0 35px !important;
    }
  }

  :deep(.el-table__inner-wrapper) {
    .el-table__cell {
      padding: 0 35px !important;
    }
  }

  :deep(.el-table__fixed-right) {
    .el-table__cell {
      padding: 0 35px !important;
    }
  }

  :deep(.el-table__fixed) {
    .el-table__cell {
      padding: 0 35px !important;
    }
  }
}
</style>
