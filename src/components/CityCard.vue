<template>
  <div class="day_card">
    <h2>{{ city.city }}</h2>
    <p>
      {{ Math.round((city.weather.main.temp-32)/1.8) }}&deg; C
    </p>
      <img :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"/>
  </div>
</template>

<script setup>
import { createApp } from 'vue'
import App from '../App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

defineProps({
city: {
  type: Object,
  default: () => {},
},
});
</script>

<style scoped>
.day_card {
  position: relative;
  display: inline-block;
  text-align: center;
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