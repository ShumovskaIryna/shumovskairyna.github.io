<template>
    <div class="headerContainer">
        <div class="headerLeft">
            <RouterLink :to="{ name: 'search' }" class="logo">
                    <img src="../assets/panda_black&white.png" class="logoImg"/>
                    <p class="logoText">Weather</p>
            </RouterLink>
            <RouterLink :to="{ name: 'savedCities' }" class="logo">
                    <p class="logoText">
                        Saved Cities
                    </p>
            </RouterLink>
        </div>
        <div class="headerCenter" v-if="route.query.preview">
            <CitySaver 
                :addCity = addCity 
                :savedCities = "savedCities" 
            />

        </div>
        <div class="headerRight">
            <font-awesome-icon class="lung" icon="fa-solid fa-language" size="lg" style="color: #FFFFFF; cursor: pointer;" @click=""/>
            <font-awesome-icon class="thema" icon="fa-solid fa-sun" size="lg" style="color: #FFFFFF;" />
        </div>
    </div>
</template>
  
<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLanguage, faSun } from '@fortawesome/free-solid-svg-icons'
import { uid } from "uid";
import { ref, onMounted } from "vue";
import CitySaver from './CitySaver.vue'
library.add(faLanguage, faSun)


const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
    if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
        localStorage.getItem("savedCities")
    );
    }
    const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
        lat: route.query.lat,
        lng: route.query.lng,
    },
    };
    savedCities.value.push(locationObj);
    localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
    );
    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({ query });
};

onMounted(() => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(
            localStorage.getItem("savedCities")
        );
    }
})
  
</script>

<style scoped>
.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    }
.headerLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 2;
}
.headerCenter{
    text-align: center;
    flex: 1;
}
.headerRight{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex: 2;
}
.logo, .plus, .lung, .thema {
    cursor: pointer;
    text-decoration-line: none;
    padding: 10px 15px;
}
.logoText {
    font-size: 18px;
    margin: 1px;
    font-weight: bold;
    color: rgb(255, 255, 255);
}
.logoImg{
    margin-left: 10px;
    height: 50px;
    align-items: center;
    display: flex;
}
.btns{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
}
.delete{
  padding: 10px;
  border: 2px solid rgb(255, 165, 198);
  background-color: rgb(25, 127, 134);
  color: aliceblue;
}
.cancel {
  padding: 10px;
  border: 2px solid rgb(205, 165, 111);
  background-color: rgb(134, 114, 26);
  color: aliceblue;
}
</style>