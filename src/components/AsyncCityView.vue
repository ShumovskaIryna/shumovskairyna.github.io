<template>
  <div class="cityContainer">
    <!-- Alert -->
    <div v-if="route.query.preview && savedCities.length <= 4" class="alert">
      <p>
        You are currently previewing this city, click the "+"
        icon to start tracking this city.
      </p>
    </div>
    <div v-else-if="route.query.preview && savedCities.length > 4" class="alert_danger">
      <p>
        In order to add - delete the city, 5 is a max.
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="daily_info">
      <div class="city_main_card">
        <h1>{{ route.params.city }}</h1>
        <p class="">
          {{
            new Date(weatherData.currentTime).toLocaleDateString(
              "en-us",
              {
                weekday: "short",
                day: "2-digit",
                month: "long",
              }
            )
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
            )
          }}
        </p>
        <p class="temperature">
          {{ Math.round((weatherData.current.temp-32)/1.8) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round((weatherData.current.feels_like-32)/1.8) }} &deg;
        </p>
        <p class="">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"/>
      </div>
      <!-- Hourly Weather -->
      <div class="hour_forecast">
        <h2 class="title">48 Hour Forecast</h2>
          <canvas id="myChart"></canvas>
      </div>
    </div>
    <hr class="line" />

    <!-- Weekly Weather -->
    <div class="weekly_info">
      <h2 class="title">7 Day Forecast</h2>
      <div class="day_cards">
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="day_card"
        >
          <p class="">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"/>
          <div class="">
            <p>H: {{ Math.round((day.temp.max-32)/1.8) }} &deg;</p>
            <p>L: {{ Math.round((day.temp.min-32)/1.8) }} &deg;</p>
          </div>
        </div>
      </div>
    </div>
    <div class="remove" @click="() => TogglePopup('buttonTrigger')">
      <p><font-awesome-icon class="trash" icon="fa-solid fa-trash" size="sm" /> 
        Remove city
      </p>
    </div>

		<Popup 
			v-if="popupTriggers.buttonTrigger">
			<h2>Really? Delete this city?</h2>
      <div class="btns">
        <button class="delete" @click="removeCity()">Delete</button>
        <button class="cancel" @click="() => TogglePopup('buttonTrigger')">Cancel</button>
      </div>
		</Popup>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import Popup from './Popup.vue'
import Chart from 'chart.js/auto';
import { onMounted } from "vue";
import { createApp } from 'vue'
import App from '../App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }
}; 
getCities();

const weatherData = await getWeatherData();

let hours = weatherData.hourly;
let temps = [];
let feels = [];

hours.map(({temp})=>{ 
  temps.push(Math.round((temp-32)/1.8))
});
hours.map(({feels_like})=>{ 
  feels.push(Math.round((feels_like-32)/1.8))
});

const timeLables = hours.map(({dt})=> { 
  return new Date(dt * 1000).toLocaleTimeString("en-us", {hour: "numeric"});
});

const data = {
  labels: timeLables,
  datasets: [{
    label: 'Real tempetature',
    backgroundColor: 'rgb(0, 135, 255)',
    borderColor: 'rgb(0, 135, 255)',
    data: temps,
  },
  {
    label: 'Feels like',
    backgroundColor: 'rgb(255, 235, 0)',
    borderColor: 'rgb(255, 235, 0)',
    data: feels,
  }]
};
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature'
        },
        suggestedMin: Math.min(...temps),
        suggestedMax: Math.max(...temps)
      }
    }
  },
};
onMounted(() => {
  const myChart = 
  new Chart(
    document.getElementById('myChart'), 
    config
  );
})
const popupTriggers = ref({
			buttonTrigger: false
		});
	const TogglePopup = (trigger) => {
			popupTriggers.value[trigger] = !popupTriggers.value[trigger]
		}

const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem(
    "savedCities",
    JSON.stringify(updatedCities)
  );
  router.push({
    name: "savedCities",
  });
};
</script>

<style scoped>
.cityContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}
.alert, .alert_danger{
  width: 100%;
  height: fit-content;
  min-height: 40px;
  padding: 10px 0;
  text-align: center;
  background-color: rgb(110, 145, 0);
}
.alert{
  background-color: rgb(110, 145, 0);
}
.alert_danger{
  background-color: rgb(154, 39, 81);
}
.remove{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
}
.btns{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
}
.delete{
  padding: 10px;
  border: 2px solid rgb(255, 165, 198);
  background-color: rgb(154, 39, 81);
  color: aliceblue;
}
.cancel {
  padding: 10px;
  border: 2px solid rgb(205, 165, 111);
  background-color: rgb(134, 114, 26);
  color: aliceblue;
}
p {
  font-size: 16px;
  color: rgb(255, 255, 255);
}
h1, h2 {
  font-size: 24px;
  color: rgb(255, 255, 255);
}
.daily_info {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.city_main_card, .hour_forecast{
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 10px;
}
.city_main_card {
  width: 30%;
}
.temperature{
  font-size: 45px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
.hour_forecast{
  width: 80%;
}
#myChart{
  width: 100%;
}
.line{
  width: 90%;
}
.weekly_info {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title{
  text-align: center;
}
.day_cards {
  position: relative;
  display: inline-table;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}
.day_card {
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);

  text-align: center;
  height: auto;
  width: 11%;
  margin: 6px;
}
@media (max-width:1300px) {
  .cityContainer {
    max-width: 970px;
  }
}
@media (max-width:992px) {
  .cityContainer {
    max-width: 750px;
  }
  .day_card {
    width: 22%;
    margin: 10px;
  }
}
@media (max-width:767px) {
  .cityContainer {
    max-width: 520px;
  }
  .alert{
    width: 100%;
    padding: 10px;
  }
  .daily_info {
    flex-direction: column;
  }
  .city_main_card {
    width: 100%;
  }
  .hour_forecast{
    width: 100%;
    margin: 0;
  }
  .day_card {
    width: 23%;
    margin: 4px;
  }
}
@media (max-width:530px) {
  .cityContainer {
    max-width: 450px;
  }
  .alert{
    width: 90%;
    padding: 10px;
  }
  .day_card {
    width: 26%;
    margin: 5px;
  }
}
@media (max-width:395px) {
  .cityContainer {
    max-width: 300px;
  }
  .alert{
    width: 95%;
  }
  .day_card {
    width: 30%;
    margin: 5px;
  }
}
.remove {
  cursor: pointer;
}
.trash {
  color: white;
  margin: 0 10px;
}
.trash:hover {
 color: rgb(255, 116, 116);
}
</style>