<template>
  <div class="citiesContainer">
    <div
      v-for="city in cities"
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
    v-if="cities.length === 0"
    class="alertContainer"
  >
    <p>
      {{ $t('noLocations') }}
    </p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import CityCard from './CityCard.vue'
import '../../index.css'
import { useI18n } from 'vue-i18n'

useI18n({ useScope: 'global' })
const savedCities = ref([])

const store = useStore()

const cities = computed({
  get () {
    return store.getters.getCities
  },
  set (val) {
    savedCities.value = val
  }
})

const removeCity = async (cityToDelete) => {
  store.dispatch('removeCityById', cityToDelete)
  savedCities.value = store.getters.getCities
}

onBeforeMount(async () => {
  store.dispatch('getCityForecast')
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
  text-align: center;
  width: 31%;
  cursor: pointer;
  margin: 10px;
}
.alertContainer {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 95%;
  cursor: pointer;
  margin: 10px;
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
