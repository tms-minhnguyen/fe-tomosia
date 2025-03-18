<template>
    <el-button
      type="default"
      class="button-custom"
      :class="[
        classWidHei, 
        action ? 'button' : 'button-default'
      ]"
      @click="eventButton"
    >
      <span class="button-text" :class="fontSize">{{ text }}</span>
    </el-button>
  </template>
  
  <script setup>
  import { toRefs } from 'vue';
  const props = defineProps({
    action: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    classWidHei: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    }
  });
  
  const { action, text, disabled, classWidHei, fontSize } = toRefs(props);
  
  const emit = defineEmits(["event-button"]);
  
  const eventButton = () => {
    console.log("Button clicked, action:", action.value);
    emit("event-button");
  };
  </script>
  
  <style scoped>
  .button-custom {
    font-weight: bold;
    border-radius: 4px;
    padding: 10px 16px;
    transition: opacity 0.3s ease-in-out;
  }
  
  /* Khi là button action */
  .button {
    background-color: #226ACE !important;
    color: #FFFFFF;
    border: none;
  }
  
  .button:hover {
    background-color: #226ACE !important;
    color: #FFFFFF;
    opacity: 0.5;
  }
  
  /* Khi là button default */
  .button-default {
    background-color: #FFF;
    border: 1px solid #226ACE;
    color: #226ACE;
  }
  
  .button-default:hover {
    background-color: #FFF;
    border-color: #226ACE;
    color: #226ACE;
    opacity: 0.5;
  }
  
  /* Text bên trong button */
  .button-text {
    letter-spacing: 0.8px;
    font-weight: 500;
  }
  </style>
  