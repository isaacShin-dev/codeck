<template>
    <v-app >
        <v-app-bar class="main-app-outer" color="transparent" elevation="0" app mobile-breakpoint="580">
            <img src="/logo.svg" alt="logo.png" class="main-app-logo" @click="goHome"/>
            <div class="app-inner-box d-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex">
                <v-menu
                    open-on-hover
                    close-on-content-click
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ props }">
                        <v-app-bar-nav-icon
                            class="dotted-border"
                            variant="text"
                            v-bind="props"
                        ></v-app-bar-nav-icon>
                    </template>

                    <v-list :items="subMenu"></v-list>
                </v-menu>
                <NuxtLink class="menu-item" to="/">FEEDS</NuxtLink>
                <NuxtLink class="menu-item" to="/slider" >SLIDERS</NuxtLink>
                <p class="menu-item">ABOUT</p>
                <p class="menu-item">ABOUT</p>
            </div>
            <div class="app-bar-action d-none d-md-flex d-lg-flex d-xl-flex d-xxl-flex">
                <v-text-field
                    density="compact"
                    variant="solo"
                    label="검색어를 입력하세요."
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    class="app-bar-search"
                    rounded
                ></v-text-field>
                </div>
        </v-app-bar>
        <v-main >
            <v-container>
                <NuxtPage />
            </v-container>
        </v-main>
        <v-bottom-navigation
            v-model="bottomNav"
            color="teal"
            grow
            class="d-flex d-md-none d-lg-none d-xl-none d-xxl-none"
        >
            <v-btn>
                <v-icon>mdi-history</v-icon>
                Recents
            </v-btn>

            <v-btn>
                <v-icon>mdi-history</v-icon>
                Recents
            </v-btn>

            <v-btn>
                <v-icon>mdi-history</v-icon>
                Recents
            </v-btn>


            <v-btn>
                <v-icon>mdi-map-marker</v-icon>

                Nearby
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {useRouter} from 'vue-router'

const router = useRouter()
const drawer = ref(false)
const appBarColor = ref('transparent')
const bottomNav = ref(0)
const items = ref([
    { title: 'Home', icon: 'mdi-home' },
    { title: 'About', icon: 'mdi-help-box' },
    { title: 'Contact', icon: 'mdi-email' },
])
const subMenu = ref([
    {title: 'item1', value: 1},
    {title: 'item2', value: 2},
    {title: 'item3', value: 3},
    {title: 'item4', value: 4},
])

const goHome = () => {
    router.push('/')
}
const appBarColorChanger = () => {
    if(window.scrollY > 100){
        appBarColor.value = 'rgba(255,255,255,0.82)'
    }else{
        appBarColor.value = 'transparent'
    }
}

onMounted(() => {
    window.addEventListener('scroll', appBarColorChanger)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', appBarColorChanger)
})
</script>

<style>


.main-app-outer{
    display: flex;
    justify-content: center;
    align-items: center;
    /*
    position: fixed;
    */
    width: 100%;
    /*height: 90px !important;*/
}

.app-inner-box{
    background-color: #F0F0F0;
    border-radius: 55px;
    box-shadow: 0 0 10px 1px #ccc;
    width: 430px;
    height: 45px;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-around;
    opacity: 0.9;
}

.menu-item{
    text-decoration: none;
    color: #000 !important;
    font-weight: bold;
    padding:  15px;
    height: 100%;
    margin: 0 !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

}
.app-inner-box  .menu-item:hover{
    color: #ccc !important;
    opacity: 1;
}
.app-inner-box .menu-item:nth-child(2),
.app-inner-box .menu-item:nth-child(3),
.app-inner-box .menu-item:nth-child(4) {
    border-right: 1px dashed rgba(0, 0, 0, 0.36);
    padding-right: 23px;
}
.app-inner-box .menu-item:nth-child(2){
    margin-left: 23px;
}
.app-inner-box .menu-item:nth-child(5){
    padding-right: 23px;
}

.menu-item  a{
    text-decoration: none;
    color: #000 !important;
    font-weight: bold;
}
.dotted-border{
    border-right: 1px dashed rgba(0, 0, 0, 0.36);
    cursor: pointer;
}

.main-app-logo{
    height:100px;
    cursor: pointer;
}
.app-bar-search{
    width: 230px;

}

.v-toolbar__content{
    justify-content: space-evenly;
    align-items: center;
}
</style>