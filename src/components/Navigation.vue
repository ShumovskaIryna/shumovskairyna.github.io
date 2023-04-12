    <template>
        <div class="headerContainer">
            <RouterLink :to="{ name: 'search' }" class="logo">
                <div class="headerLeft">
                    <img src="../assets/panda.png" class="logoImg"/>
                    <NavLink to="/" class="logoText">Weather</NavLink>
                </div>
            </RouterLink>
            <font-awesome-icon icon="fa-solid fa-plus" style="color: #000000; cursor: pointer;" 
            @click="addCity"
            v-if="route.query.preview"/>
        </div>
    </template>
  
    <script setup>
    import { RouterLink, useRoute, useRouter } from "vue-router";
    import { createApp } from 'vue'
    import App from '../App.vue'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faPlus } from '@fortawesome/free-solid-svg-icons'
    import { uid } from "uid";
    import { ref } from "vue";
    library.add(faPlus)

    createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)

    const savedCities = ref([]);
    const route = useRoute();
    const router = useRouter();
    const addCity = () => {
        if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(
            localStorage.getItem("savedCities")
        );
        }
        const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng,
        },
        };
        savedCities.value.push(locationObj);
        localStorage.setItem(
        "savedCities",
        JSON.stringify(savedCities.value)
        );
        let query = Object.assign({}, route.query);
        delete query.preview;
        router.replace({ query });
    };
    </script>
  
    <style scoped>
        .headerContainer {
        height: 80px;
        width: 100%;
        margin-bottom: 10px;
        background-color: #b5b5b5;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 999;
        }
        .headerLeft {
        flex: 2;
        }
        .logo {
        cursor: pointer;
        text-decoration-line: none;
        padding: 10px;
        }
        .logoText {
        font-size: 20px;
        margin-left: 20px;
        margin-right: 20px;
        font-weight: bold;
        color: rgb(0, 0, 0);
        }
        .logoImg{
        height: 50px;
        align-items: center;
        display: flex;        
        margin-left: 30px;
        margin-right: 30px;
        }
    </style>