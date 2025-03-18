<template>
  <el-dialog
    v-model="isOpen"
    align-center
    class="dialog-common w-[496px]"
  >
    <div class="del-cont">
      <img v-if="isAction === 'add'" class="size-[60px]" src="@/assets/images/waring-delete.svg" />
      <img v-else-if="isAction === 'update'" class="size-[60px]" src="@/assets/images/waring-delete.svg" />
      <img v-else class="size-[60px]" src="@/assets/images/waring-delete.svg" />
      <div class="name">{{ textTitle }}</div>
      <div class="text ow-bw">
        {{ textQuestion }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          class="el-button-h48"
          plain
          @click="handleCancel()"
        >
        {{ textCancel }}
        </el-button>
        <el-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          class="el-button-h48"
          @click="handleEvent()"
          >{{ textSubmit }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref<boolean>(false)

const props = defineProps<{
  isOpen: boolean;
  isAction: string;
  name: string;
  textTitle: string;
  textQuestion: string
  textCancel: string
  textSubmit: string
}>();

const emit = defineEmits(['cancel:isVisibleDialog','event-button']);

const handleCancel = () => {
  emit('cancel:isVisibleDialog', false)
}

const handleEvent = () => {
  loading.value = true
  emit('event-button')
  if (!props.isOpen) {
    loading.value = false
  }
}
</script>
