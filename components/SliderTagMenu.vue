<script setup>
import { ref, defineEmits, defineProps, watchEffect, watch } from 'vue';
import {he} from "vuetify/locale";
const emit = defineEmits(['updateWidth', 'updateHeight', 'menuAction']);

const menus = ref([
  {
    title: "수정",
    action: "edit",
  },
  {
    title: "삭제",
    action: "delete",
  },
  {
    title: "복사",
    action: "copy",
  },
  {
    title: "위로",
    action: "up",
  },
  {
    title: "아래로",
    action: "down",
  },
]);
const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
});
const newWidth = ref(props.width);
const newHeight = ref(props.height);


const menuActionTrigger = (action) => {
  emit('menuAction', action);
};

watch(newWidth, () => {
    const size = {
        width: parseInt(newWidth.value),
        height: parseInt(newHeight.value),
    };
    emit('updateWidth', size);
});

watch(newHeight, () => {
    const size = {
        width: parseInt(newWidth.value),
        height: parseInt(newHeight.value),
    };
    emit('updateHeight', size);
});





</script>


<template>
  <v-card class="menu"
          :close-on-content-click="false"
          transition="false"
          min-width="190"
          :ripple="false"
  >
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on"></div>
    </template>
    <v-list :lines="false"
            density="compact"
            nav close-on-content-click="false">
      <v-list-item v-for="(menu, index) in menus" :key="index" @click="menuActionTrigger(menu.action)">
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-row>
          <v-col cols="6">
            <v-text-field @click.stop="" label="가로 사이즈" variant="underlined" clearable v-model="newWidth"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field @click.stop="" variant="underlined" label="세로 사이즈" clearable v-model="newHeight"></v-text-field>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.menu-item{
  font-weight: normal !important;
  font-size: 0.5rem !important;
}
.menu{
  position: absolute;
  z-index: 999;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
</style>
