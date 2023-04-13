<template>
  <div class="saved_cities">
    <div class="city_card" v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>
    
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      );
    });
    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
console.log(savedCities)
</script>

<style scoped>
.saved_cities{
  position: relative;
  display: inline-block;
  min-width: 60%;
  max-width: 97%;
  justify-content: space-between;
  padding: 10px 50px 10px 50px;
  margin: 14px;
}
.city_card {
  position: relative;
  display: inline-block;
  background-color: #b5b5b5;
  text-align: center;
  width: 205px;
  margin: 5px 5px 5px 10px;
  cursor: pointer;
}
</style>