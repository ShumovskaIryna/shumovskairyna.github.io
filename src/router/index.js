import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import CityView from '../views/CityView.vue'
import SavedCities from '../views/SavedCities.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchView
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: CityView
    },
    {
      path: '/savedCities',
      name: 'savedCities',
      component: SavedCities
    }
  ]
})

export default router
