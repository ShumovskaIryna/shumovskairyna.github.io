<template>
  <div class="day_card">
  <h2>{{ city.city }}</h2>
    <p class="temperature">
        {{ Math.round(city.weather.main.temp) }}&deg; C
    </p>
        <img :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"/>
  </div>
</template>

<script setup>
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
  background-color: #b5b5b5;
  text-align: center;
}
.temperature{
  font-size: 40px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>