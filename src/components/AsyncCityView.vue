<template>
  <div class="cityContainer">
    <!-- Alert -->
    <div v-if="route.query.preview" class="alert">
      <p>
        You are currently previewing this city, click the "+"
        icon to start tracking this city.
      </p>
    </div>
    <!-- Weather Overview -->

    <div class="card_field">
      <div class="card">
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
        <p class="">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
        <p class="">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class=""
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          "
          alt=""
        />
      </div>
    </div>
    <!-- Hourly Weather -->
    <div class="cards_forecast">
      <h2 class="title">Hourly Weather</h2>
      <div class="hour_cards">
        <div
          v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="hour_card"
        >
          <p class="">
            {{
              new Date(
                hourData.currentTime
              ).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </p>
          <img
            class=""
            :src="
              `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <p class="">
            {{ Math.round(hourData.temp) }}&deg;
          </p>
        </div>
      </div>
    </div>

    <hr class="" />

    <!-- Weekly Weather -->
    <div class="cards_forecast">
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
          <img
            class=""
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <div class="">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
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
const weatherData = await getWeatherData();
</script>

<style scoped>
  .cityContainer{
    height: fit-content;
    min-width: 80%;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 20px 20px;
  }
  .alert{
    width: 100%;
    height: fit-content;
    min-height: 40px;
    padding: 10px 0 10px 0;
    text-align: center;
    background-color: rgb(251, 148, 88);
  }
  .card_field {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .card {
    display: inline-block;
    text-align: center;
    min-width: 300px;
    margin: 10px;
    background-color: #b5b5b5;
    justify-content: center;
    transition: box-shadow 500ms ease;
  }
  .card:hover {
    box-shadow: 4px 4px 10px 3px grey;
  }
  .cards_forecast {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .title{
    text-align: center;
  }
  .hour_cards, .day_cards {
    display: inline-block;
    position: relative;
    min-width: 90%;
    height: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .hour_card, .day_card {
    text-align: center;
    background-color: #b5b5b5;
    display: inline-block;
    position: relative;
    height: auto;
  }
  .hour_card {
    width: 115px;
    margin: 15px;
  }
  .day_card {
    width: 130px;
    margin: 9px;
  }
</style>