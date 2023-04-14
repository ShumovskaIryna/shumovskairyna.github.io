<template>
  <div class="citiesContainer">
    <div
      v-for="city in savedCities"
      :key="city.id"
      class="city_card"
    >
      <CityCard
        :city="city"
        :remove-city="removeCity"
      />
    </div>
  </div>
  <div
    v-if="savedCities.length === 0"
    class="alertContainer"
  >
    <p>
      No locations added. To start tracking a location, search on home page.
    </p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CityCard from './CityCard.vue'
const savedCities = ref([])

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(
      localStorage.getItem('savedCities')
    )
    const requests = []
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      )
    })
    const weatherData = await Promise.all(requests)
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data
    })
  }
}

const removeCity = async (cityToDelete) => {
  console.log('cityToDelete', cityToDelete.id)
  const cities = JSON.parse(localStorage.getItem('savedCities'))

  const updatedCities = cities.filter(
    (city) => city.id !== cityToDelete.id
  )
  localStorage.setItem(
    'savedCities',
    JSON.stringify(updatedCities)
  )
  await getCities()
}

onMounted(async () => {
  await getCities()
})

</script>

<style scoped>
.citiesContainer{
  display: inline-block;
  width: 92%;
  justify-content: center;
  padding: 50px 30px 10px 20px;
  margin: 0px;
}
.city_card {
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 31%;
  cursor: pointer;
  margin: 10px;
}
.alertContainer {
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 95%;
  cursor: pointer;
  margin: 10px;
  color:aliceblue;
}
@media (max-width: 992px) {
  .citiesContainer{
    display: inline-block;
    margin: 0px;
  }
  .city_card {
    width: 31%;
    margin: 5px;
  }
}
@media (max-width:767px) {
  .city_card {
    width: 43%;
    margin: 15px;
  }
}
@media (max-width:530px) {
  .city_card {
    width: 48%;
    margin: 2px;
  }
}
@media (max-width:395px) {
  .city_card {
    width: 90%;
    margin-left: 15px;
  }
}
</style>
