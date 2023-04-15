<template>
  <div
    v-if="city.weather"
    class="day_card"
  >
    <h2>{{ city.city }}</h2>
    <p>
      {{ Math.round((city.weather.main.temp-32)/1.8) }}&deg; C
    </p>
    <img :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`">
    <div class="btns">
      <button
        class="detail_info"
        @click="goToCityView(city)"
      >
        Details
      </button>
      <button
        class="delete"
        @click="() => TogglePopup('buttonTrigger')"
      >
        <font-awesome-icon
          class="trash"
          icon="fa-solid fa-trash"
          size="sm"
        />
      </button>
    </div>
    <Popup
      v-if="popupTriggers.buttonTrigger"
    >
      <h2>Really? Delete this city?</h2>
      <div class="btns">
        <button
          class="delete"
          @click="(removeCity(city), TogglePopup('buttonTrigger'))"
        >
          Delete
        </button>
        <button
          class="cancel"
          @click="() => TogglePopup('buttonTrigger')"
        >
          Cancel
        </button>
      </div>
    </Popup>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { ref, createApp } from 'vue'
import Popup from './Popups.vue'
import App from '../App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)

const router = useRouter()

const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng
    }
  })
}
const popupTriggers = ref({
  buttonTrigger: false
})
const TogglePopup = (trigger) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

defineProps({
  city: {
    type: Object,
    default: () => {}
  },
  removeCity: {
    type: Function
  }
})

</script>

<style scoped>
.day_card {
  position: relative;
  display: inline-block;
  text-align: center;
}
.btns{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 20px;
}
.delete{
  padding: 10px;
  border: 2px solid rgb(255, 165, 198);
  background-color: rgb(109, 36, 63);
  color: aliceblue;
  cursor: pointer;
}
.cancel {
  padding: 10px;
  border: 2px solid rgb(116, 151, 248);
  background-color: rgb(65, 101, 178);
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
.detail_info {
  padding: 10px;
  border: 2px solid rgb(116, 151, 248);
  background-color: rgb(65, 101, 178);
  color: aliceblue;
  cursor: pointer;
}
</style>
