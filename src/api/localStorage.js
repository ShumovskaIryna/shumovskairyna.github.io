export const LocalStorageAPI = {
  getCitites () {
    const savedCitites = localStorage.getItem('savedCities')
    if (savedCitites) {
      return JSON.parse(savedCitites)
    }
  },
  saveCities (updatedCities) {
    localStorage.setItem('savedCities', JSON.stringify(updatedCities))
  }
}
