<template>
<v-container>
<!--    <v-btn value="add" @click="addNewTab" elevation="4" style="margin-bottom: 1rem;">슬라이드 추가 + </v-btn>-->
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      show-arrows
    >
      <v-tab :value="tab.value" v-for="(tab, index) in tabs" :key="tab.tabId">
        {{tab.name + (index + 1)}}
          <v-btn @click="removeSlide(tab.tabId)" icon size="x-small" variant="tonal" max-height="20" max-width="20" class="tab-btn">X</v-btn>
      </v-tab>
      <div style="display: flex; align-content: center; justify-content: center; flex-direction: column; width: 60px;">
      <v-btn @click="addNewTab" size="x-small" icon elevation="3" class="tab-btn"> <v-icon>mdi-plus</v-icon></v-btn>
      </div>
    </v-tabs>
  <div class="slider-editor-wrapper drag-prevent" @mousemove="moving" @mouseup="end" @click="resetTarget" @contextmenu.prevent>
      <template v-for="slider in sliders" >
        <template v-for="tag in slider.tags">
              <component
                        :is="tag.tag"
                        :class="[{'moving': currentTagId === tag.id}, tag.attrs.class, 'tag']"
                        v-if="tag.slideNo === tab"
                        :style="{...tag.style, width: tag.width + 'px', height: tag.height + 'px' , top: tag.y + 'px', left: tag.x + 'px'}"
                        @mousedown.left="event => start(event, tag.id)"
                        @mousedown.right="showTagOption(tag.id, $event)"
                        @contextmenu.prevent
              >{{tag.innerText}}</component>
        <SliderTagMenu
          v-show="currentTagId === tag.id && showOption"
          @menu-action="menuAction"
          @update-height="sizeChange"
          @update-width="sizeChange"
          :style="[{top: (menuPosition.y - 65) + 'px', left: menuPosition.x + 'px'}]"
          :width="tag.width"
          :height="tag.height"
          @click.stop.prevent
        />
            <v-card v-show="inputPopup" absolute>
                <v-textarea label="ddd" variant="outlined">
                </v-textarea>
            </v-card>
        </template>
      </template>

      <div class="modal-wrapper" v-show="showImgInput" @click.stop="showImgInput=false">
        <div class="modal-inner">
            <v-row>
                <v-col>이미지 등록</v-col>
                <v-col cols="12">
                    <v-file-input
                            v-model="imgFile"
                            label="파일을 선택해주세요"
                            prepend-icon="mdi-camera"
                            accept="image/*"
                            @change="showImgInput=false"
                            underline
                    ></v-file-input>
                </v-col>
                <v-row >
                    <v-spacer></v-spacer>
                    <v-col cols="2" style="text-align: center;">
                        <v-btn @click="showImgInput=false" color="primary">확인</v-btn>
                    </v-col>
                    <v-col cols="2" style="text-align: center;">
                        <v-btn @click="showImgInput=false" color="cancel">취소</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>


            </v-row>

        </div>
      </div>


  </div>
<SliderOptionBox @addTag="newTag" @add-img="ImageInput"/>
</v-container>
</template>

<script setup>
import SliderOptionBox from "@/components/SliderOptionBox.vue";
import SliderTagMenu from "@/components/SliderTagMenu.vue";
import { v4 as uuidV4 } from 'uuid';
import { ref, onMounted } from 'vue';
const tab = ref(null);
const tabs = ref([]);
const sliders  = ref([]);
const isDragging = ref(false);
const oldX = ref(0);
const oldY = ref(0);
const currentTagId = ref(null);
const showOption = ref(false);
const inputPopup = ref(false);
const showImgInput = ref(false);
const imgFile = ref(null)
const menuPosition = ref({
    x: 0,
    y: 0,
});
const addNewTab = () => {
    const tabId = uuidV4();
  tabs.value.push({
    tabId,
    name: `슬라이드 `,
  });
  const tabCount = tabs.value.length;
  tab.value = tabCount - 1;
  sliders.value.push({
    tabId,
    tags: []
  });
};

const removeSlide = (tabId) => {
  const idx = tabs.value.findIndex((tab) => tab.tabId === tabId);
  tabs.value.splice(idx, 1);
  sliders.value.splice(idx, 1);
  if (tab.value === idx) {
    tab.value = idx - 1;
  }



};

const newTag = (tag) => {
  console.log(tag)
  if (tabs.value.length === 0) {
    alert("슬라이드를 먼저 추가해주세요");
    return;
  }

  const newTagObj = Object.assign({}, tag, {
    slideNo: tab.value,
    id: uuidV4(),
    x: 10, // 초기 x 위치
    y: 10,  // 초기 y 위치
    width: tag.width, // 초기 width
    height: tag.height, // 초기 height
    innerText: tag.innerText,
    lang: tag?.lang,
  });
  sliders.value[tab.value].tags.push(newTagObj);
};


const start = (event, tagId) => {
  isDragging.value = true;
  oldX.value = event.clientX;
  oldY.value = event.clientY;
  currentTagId.value = tagId;

};

const moving = (event) => {
  if (!isDragging.value) return;
  const diffX = event.clientX - oldX.value;
  const diffY = event.clientY - oldY.value;
  const idx = sliders.value[tab.value].tags.findIndex((tag) => tag.id === currentTagId.value);

  const updatedTag = {
    ...sliders.value[tab.value].tags[idx],
    x: sliders.value[tab.value].tags[idx].x + diffX,
    y: sliders.value[tab.value].tags[idx].y + diffY,
  };

  // 전개 연산자 방식
  sliders.value[tab.value].tags = [
    ...sliders.value[tab.value].tags.slice(0, idx),
    updatedTag,
    ...sliders.value[tab.value].tags.slice(idx + 1),
  ];

  oldX.value = event.clientX;
  oldY.value = event.clientY;
};
const end = () => {
    isDragging.value = false;
    oldY.value = 0;
    oldX.value = 0;
};
const sizeChange = (newSize) => {
    console.log('sizeChange called', newSize)
    const idx = sliders.value[tab.value].tags.findIndex((tag) => tag.id === currentTagId.value);
    console.log('Current index of tag:', idx);

    if (idx === -1) {
        console.error('No tag found with the current ID:', currentTagId.value);
        return;
    }

    const updatedTag = {
        ...sliders.value[tab.value].tags[idx],
        width: parseInt(newSize.width, 10),
        height: parseInt(newSize.height, 10),
    };

    console.log('Updated tag:', updatedTag);

    sliders.value[tab.value].tags.splice(idx, 1, updatedTag);

    console.log('Updated sliders:', sliders.value[tab.value].tags);
};

const showTagOption = (tagId, event) => {
  if (currentTagId.value === tagId) {
    showOption.value = !showOption.value; // 이미 선택된 태그를 다시 선택하면 메뉴를 숨김
    menuPosition.value = {  // 메뉴의 위치를 초기화
      x: 0,
      y: 0,
    };
  } else {
    currentTagId.value = tagId;
    showOption.value = true;
    menuPosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  }
};

const resetTarget = () => {
  currentTagId.value = null;
  showOption.value = false;
  inputPopup.value = false;
};

const menuAction = (action) => {
  const idx = sliders.value[tab.value].tags.findIndex((tag) => tag.id === currentTagId.value);
  switch(action) {
    case "edit":
      inputPopup.value = true;
      break;
    case "delete":
      sliders.value[tab.value].tags.splice(idx, 1);
      break;
    case "copy":
      // 복사 작업을 수행합니다.
      break;
    case "up":
      // 위로 이동 작업을 수행합니다.
      break;
    case "down":
      // 아래로 이동 작업을 수행합니다.
      break;
  }
  showOption.value = false; // 메뉴를 숨깁니다.
};

const ImageInput = () =>{
    console.log('ImageInput called')
    showImgInput.value = true;

}



onMounted(()=>{
    addNewTab()
})



</script>

<style scoped>
@import "public/css/tagStyle.css";
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

* {
  box-sizing: border-box;
}

.slider-editor-wrapper{
  height: 68vh;
  width: 100%;
  box-shadow: #011028 0 0 4px 1px ;
  border-radius: 5px;
  margin: 1rem 0 auto;
  overflow: hidden;
}

.drag-prevent{
  user-select: none;
}
.tab-btn{
    margin-left: 12px !important;
}
.modal-wrapper {
    position: fixed; /* or 'absolute' if necessary for your layout */
    z-index: 1010;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    overflow: hidden; /* Prevents scroll on the background */
    display: flex;
    align-items: flex-end; /* Start from bottom */
    justify-content: center; /* Center horizontally */
}
.modal-inner {
    display: flex;
    align-items: center;
    width: 500px;
    height: 220px;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: black 0 0 8px 0px;
    border-radius: 5px;
    /* Start from below the view */
    transform: translateY(100vh);
    animation: slideUp 0.5s forwards; /* Animation applied here */
}

@keyframes slideUp {
    to {
        /* End at the center of the view */
        transform: translateY(0) translate(0%, -190%);
    }
}
</style>
