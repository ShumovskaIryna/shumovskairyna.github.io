<template>
    <font-awesome-icon class="plus" icon="fa-solid fa-plus" size="lg" style="color: #FFFFFF; cursor: pointer;" 
    @click="addCity"
    v-if="isAllowedToAddCity"/>
    
    <font-awesome-icon class="plus" icon="fa-solid fa-plus" size="lg" style="color: #FFFFFF; cursor: pointer;" 
    @click="() => TogglePopup('buttonTrigger')"
    v-else/>

    <Popup 
        v-if="popupTriggers.buttonTrigger">
            <h2>
                In order to add - delete the city, 5 is a max.
            </h2>
            
            <div class="btns">
                <button class="cancel" @click="() => TogglePopup('buttonTrigger')">Ok, I see</button>
            </div>
    </Popup>


</template>

<script setup>
import { ref } from "vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import Popup from './Popup.vue'

library.add(faPlus)

const popupTriggers = ref(
    {
	    buttonTrigger: false
    },
);
const TogglePopup = (trigger) => {
	popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

const props = defineProps({
    savedCities: {
        type: Object,
        default: () => {},
    },
    addCity: {
        type: Function,
    }
});

const isAllowedToAddCity = props.savedCities?.length < 5;
</script>