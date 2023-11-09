<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['addTag', 'addImg']);
const tagList = ref([
  {
    name: "제목1",
    value: {
      tag: "h1",
      innerText:"제목1",
      attrs: {
        class: "header-1 text-4xl font-bold",
      },
      style:{
        position: "relative",
        display: "inline-block",
      },
      width: 80,
      height: 40,
    },

  },
  {
    name: "제목2",
    value: {
      tag: "h2",
      innerText: "제목2",
      attrs: {
        class: "header-2 text-3xl font-bold",
      },
      style:{
        position: "relative",
        display: "inline-block",
      },
      width: 60,
      height: 40,
    },

  },
  {
    name: "제목3",
    value: {
      tag: "h3",
      innerText: "제목3",
      attrs: {
        class: "header-3 text-2xl font-bold",
      },
      style:{
        position: "relative",
        display: "inline-block",
      },
      width: 50,
      height: 40,
    },

  },
  {
    name: "코드블럭",
    value: {
      tag: "pre",
      innerText: "Please input code here",
      lang: "python",
      attrs: {
        class: "pre text-2xl font-bold",
      },
      style:{
        position: "relative",
        display: "inline-block",
      },
      width: 240,
      height: 140,
    },
  },
    {
      name: "텍스트",
      value: {
        tag: "p",
        innerText: "텍스트를 입력해주세요.",
        attrs: {
          class: "text-2xl",
        },
        style:{
          position: "relative",
          display: "inline-block",
        },
        width: 180,
        height: 40,
      },
    },
    {
        name: "이미지",
        value: {
          tag: "v-file-input",
            src: "https://picsum.photos/200/300",
          attrs: {
            class: "text-2xl",
          },
          style:{
            position: "relative",
            display: "inline-block",
          },
          width: 80,
          height: 40,
        },
    },

])

const addTag = (tag) => {
    if(tag.name === '이미지'){
        emit('addImg')
        return
    }
    emit('addTag', tag.value)
}

</script>

<template>
  <div class="option-box">
    <v-chip-group>
      <v-chip
        v-for="tag in tagList"
        :key="tag.name"
        :value="tag.name"
        @click="addTag(tag)"
      >
        {{ tag.name }}
      </v-chip>

    </v-chip-group>
  </div>
</template>

<style scoped>

</style>
