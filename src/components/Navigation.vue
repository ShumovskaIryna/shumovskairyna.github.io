<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="headerContainer">
    <div class="headerLeft">
      <RouterLink
        :to="{ name: 'search' }"
        class="logo"
      >
        <img
          src="../assets/panda_black&white.png"
          class="logoImg"
        >
        <p class="logoText">
          Weather
        </p>
      </RouterLink>
      <RouterLink
        :to="{ name: 'savedCities' }"
        class="logo"
      >
        <p class="logoText">
          {{ $t('route') }}
        </p>
      </RouterLink>
    </div>
    <div
      v-if="route.query.preview"
      class="headerCenter"
    >
      <CitySaver
        :add-city="addCity"
        :saved-cities="savedCities"
      />
    </div>
    <div class="headerRight">
      <font-awesome-icon
        class="lung"
        icon="fa-solid fa-language"
        size="lg"
        @click="changeLanguage"
      />
      <font-awesome-icon
        id="icon"
        class="dark_thema"
        icon="fa-solid fa-moon"
        size="lg"
        @click="changeThema()"
      />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLanguage, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { uid } from 'uid'
import { ref, onMounted } from 'vue'
import CitySaver from './CitySaver.vue'
import { useI18n } from 'vue-i18n'

library.add(faLanguage, faSun, faMoon)

const { locale } = useI18n({ useScope: 'global' })

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(
      localStorage.getItem('savedCities')
    )
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng
    }
  }
  savedCities.value.push(locationObj)
  localStorage.setItem(
    'savedCities',
    JSON.stringify(savedCities.value)
  )
  const query = Object.assign({}, route.query)
  delete query.preview
  query.id = locationObj.id
  router.replace({ query })
}

onMounted(() => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(
      localStorage.getItem('savedCities')
    )
  }
  const thema = localStorage.getItem('thema')
  document.body.classList.toggle(thema)
})

const changeThema = () => {
  let thema = localStorage.getItem('thema')
  thema === 'dark' ? thema = 'light' : thema = 'dark'
  localStorage.setItem('thema', thema)

  document.body.classList.toggle('dark')
}

const changeLanguage = () => {
  locale.value === 'en' ? locale.value = 'uk' : locale.value = 'en'
  localStorage.setItem('lang', locale.value)
}

</script>

<style scoped>
.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    }
.headerLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 2;
}
.headerCenter{
    text-align: center;
    flex: 1;
}
.headerRight{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex: 2;
}
.logo, .plus, .lung{
    cursor: pointer;
    text-decoration-line: none;
    padding: 10px 15px;
    color: var(--n);
}
.dark_thema {
    cursor: pointer;
    text-decoration-line: none;
    color: var(--n);
    padding: 10px 5px;
}
.logoText {
    font-size: 18px;
    margin: 1px;
    font-weight: bold;
    color: var(--n);
}
.logoImg{
    margin-left: 10px;
    height: 50px;
    align-items: center;
    display: flex;
}
</style>
