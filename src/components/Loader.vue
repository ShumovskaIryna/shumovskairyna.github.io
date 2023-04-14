<template>
  <div class="citiesContainer">
    <div class="city_card">
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        spin
        size="2xl"
        style="color: #f7f7f7;"
      />
    </div>
  </div>
</template>

<script setup>
import { createApp } from 'vue'
import App from '../App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
</script>

<style scoped>
.citiesContainer{
  display: inline-block;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
}
.city_card {
  text-align: center;
  width: 100%;
}
</style>
