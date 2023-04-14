<template>
  <div class="day_card" v-if="city.weather">
    <h2>{{ city.city }}</h2>
    <p>
      {{ Math.round((city.weather.main.temp-32)/1.8) }}&deg; C
    </p>
    <img :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"/>
    <div class="remove" >
      <button @click="goToCityView(city)"> Details</button>
      <button @click="() => TogglePopup('buttonTrigger')">
        <font-awesome-icon class="trash" icon="fa-solid fa-trash" size="sm" />
      </button>
    </div>
    <Popup 
      v-if="popupTriggers.buttonTrigger">
      <h2>Really? Delete this city?</h2>
      <div class="btns">
        <button class="delete" @click="(removeCity(city), TogglePopup('buttonTrigger'))">Delete</button>
        <button class="cancel" @click="() => TogglePopup('buttonTrigger')">Cancel</button>
      </div>
    </Popup>
  </div>
</template>

<script setup>

import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import Popup from './Popup.vue'
import { createApp } from 'vue'
import App from '../App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

const route = useRoute();
const router = useRouter();
let savedCities = ref([]);

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
const popupTriggers = ref({
	buttonTrigger: false
});
const TogglePopup = (trigger) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}
const props = defineProps({
city: {
  type: Object,
  default: () => {},
},
removeCity: {
  type: Function,
}
});
</script>

<style scoped>
.day_card {
  position: relative;
  display: inline-block;
  text-align: center;
}
.remove{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
}
.btns{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.delete{
  padding: 10px;
  border: 2px solid rgb(255, 165, 198);
  background-color: rgb(154, 39, 81);
  color: aliceblue;
  cursor: pointer;
}
.cancel {
  padding: 10px;
  border: 2px solid rgb(205, 165, 111);
  background-color: rgb(134, 114, 26);
  color: aliceblue;
  cursor: pointer;
}
p {
  font-size: 26px;
  color: rgb(255, 255, 255);
}
h1, h2 {
  font-size: 24px;
  color: rgb(255, 255, 255);
}
</style>