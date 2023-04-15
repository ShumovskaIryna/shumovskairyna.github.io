<template>
  <font-awesome-icon
    v-if="isAllowedToAddCity"
    class="plus"
    icon="fa-solid fa-plus"
    size="lg"
    @click="addCity"
  />

  <font-awesome-icon
    v-else
    class="plus"
    icon="fa-solid fa-plus"
    size="lg"
    @click="() => TogglePopup('buttonTrigger')"
  />

  <Popup
    v-if="popupTriggers.buttonTrigger"
  >
    <h2>
      In order to add - delete the city, 5 is a max.
    </h2>

    <div class="btns">
      <button
        class="cancel"
        @click="() => TogglePopup('buttonTrigger')"
      >
        Ok, I see
      </button>
    </div>
  </Popup>
</template>

<script setup>
import { ref } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Popup from './Popups.vue'

library.add(faPlus)

const popupTriggers = ref(
  {
    buttonTrigger: false
  }
)

const savedCities = ref([])

if (localStorage.getItem('savedCities')) {
  savedCities.value = JSON.parse(
    localStorage.getItem('savedCities')
  )
}

const TogglePopup = (trigger) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

defineProps({
  addCity: {
    type: Function
  }
})
const isAllowedToAddCity = savedCities.value?.length < 5
</script>

<style scoped>
.plus{
  cursor: pointer;
}
.cancel {
  padding: 10px;
  border: 2px solid rgb(255, 165, 198);
  background-color: rgb(109, 36, 63);
  color: aliceblue;
  cursor: pointer;
}
</style>
