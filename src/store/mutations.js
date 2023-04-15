export const mutations = {
  setCityForecast (state, payload) {
    state.cities = payload
  },
  removeCityById (state, cityToDelete) {
    state.cities = state.cities?.filter((city) => city.id !== cityToDelete.id)
  }
}
