import axios from 'axios'
import { LocalStorageAPI } from '@/api/localStorage'
import { API_ROUTES } from '@/api/routes'

export const actions = {
  async getCityForecast ({ commit }) {
    try {
      const cities = LocalStorageAPI.getCitites()

      if (!cities) return

      const requests = []
      const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY

      for (const city of cities) {
        requests.push(
          axios.get(
              `${API_ROUTES.WEATHER}?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${API_KEY}&units=imperial`
          )
        )
      }

      const citiesWeatherData = await Promise.all(requests)

      for (let i = 0; i < citiesWeatherData.length; ++i) {
        cities[i].weather = citiesWeatherData[i].data
      }
      commit('setCityForecast', cities)
    } catch (error) {
      console.error(error)
    }
  },
  async removeCityById ({ commit }, cityToDelete) {
    const cities = LocalStorageAPI.getCitites()

    if (!cities) return

    const updatedCities = cities.filter(
      (city) => city.id !== cityToDelete.id
    )

    LocalStorageAPI.saveCities(updatedCities)

    commit('removeCityById', cityToDelete)
  }
}
