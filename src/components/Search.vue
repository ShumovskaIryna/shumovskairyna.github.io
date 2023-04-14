<template>
  <div class="searchCityContainer">
    <div class="search_container">
      <div class="search_bar">
        <input
          v-model="searchQuery"
          type="text"
          name="city"
          class="searchInput"
          onChange="{onInputChange}"
          placeholder="Search for a city"
          @input="getSearchResults"
        >
        <div className="suggestion_bar">
          <ul
            v-if="mapboxSearchResults"
            class="suggestion_list"
          >
            <p v-if="searchError">
              Sorry, something went wrong, please try again.
            </p>
            <p v-if="!searchError && mapboxSearchResults.length === 0">
              No results match your query, try a different term.
            </p>
            <template v-else>
              <li
                v-for="searchResult in mapboxSearchResults"
                :key="searchResult.id"
                class="suggestion_city"
                @click="previewCity(searchResult)"
              >
                {{ searchResult.place_name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <img
      class="rain_panda"
      src="../assets/rain_panda.png"
      alt="rain_panda"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',')
  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(' ', ''), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}
const mapboxAPIKey =
  'pk.eyJ1IjoiaXJ5bmthcGFuZGEiLCJhIjoiY2xnYjkxcm9wMGw0bjNjcWxhcW5qZWJhNSJ9.T2d9setCNRmlOh3ix874Pw'
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        )
        mapboxSearchResults.value = result.data.features
      } catch {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}
</script>

<style scoped>
.searchCityContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}
.search_container{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}
.search_bar {
  position: relative;
  display: flex;
  height: 60px;
  background-color: white;
  align-items: center;
  border-radius: 30px;
}
.searchInput {
  border: none;
  font-size: larger;
  margin: 5px 20px;
}
.searchInput:focus {
  outline: none;
}
@media (max-width:1300px) {
  .searchInput{
      width: 660px;
  }
}
@media (max-width:992px) {
  .searchInput{
      width: 560px;
  }
}
@media (max-width:767px) {
  .searchCityContainer{
      padding: 30px 10px;
  }
  .search_container{
      padding: 30px 10px;
  }
  .searchInput{
      width: 460px;
  }
}
@media (max-width:530px) {
  .searchInput{
      width: 280px;
  }
}
.suggestion_bar{
  position: absolute;
  top: 50px;
  left: 5%;
  width: 90%;
}
.suggestion_list{
  background-color: rgba(0, 0, 0, 0.2);
  width: auto;
  text-align: start;
  padding: 10px 10px;
}
.suggestion_city{
  background-color: rgba(0, 0, 0, 0.4);
  list-style: none;
  font-size: medium;
  cursor: pointer;
  margin: 10px 10px;
  padding: 10px 10px;
  color: white;
}
.rain_panda{
  position: absolute;
  bottom: 0;
  right: 1%;
  max-width: 200px;
  margin: 10px;
  z-index: 1;
}
</style>
