<template>
  <div>
    <UserInput @search-location="getTodaysWeather" />
  </div>

  <div>
    <p class="current-date">{{ todaysDate }}</p>
    <p class="current-city"> {{ city }}</p>
  </div>

  <div v-if="city">
    <div class="today-symbol-container">
      <div class="today-weather-symbol-container">
        <!-- A prop is sent and then a custom event is gotten -->
        <GetWeatherCode :weather-symbol="this.weatherCode" class="today-weather-symbol">Weather symbol: {{ weatherCode }}</GetWeatherCode>
      </div>
    </div>

    <p class="current-temp"> {{ Math.round(currentTemperature) }}° </p>
    <p class="current-precipitation"> {{ precipitation }} </p>
    <p> {{ windSpeed }} </p>
  </div>

  <div v-else>
    <p>No weather information available, try to type in a name of a city above.</p>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import UserInput from '../components/UserInput.vue';
import GetWeatherCode from '../components/GetWeatherCode.vue';

export default {
  components: {
    UserInput,
    GetWeatherCode,
  },
  data() {
    return {
      cityInfo: null,
      currentTemperature: null,
      precipitation: null,
      weatherCode: null,
      windSpeed: null,
      todaysDate: null,
      city: null,
    };
  },
  created() {
    // Get today's date using moment. ex. Monday 6th May
    this.todaysDate = moment(new Date()).format('dddd Do MMMM');
  },
  methods: {
    getTodaysWeather(cityInfo) {
      // Save parameter to data-variable
      this.cityInfo = cityInfo;

      console.log(this.cityInfo);
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.cityInfo.latitude}&longitude=${this.cityInfo.longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1`)
        .then(response => {
          // Check values from the response
          console.log("1. Current temp: " + response.data.current.temperature_2m);
          console.log("2. Symbol code: " + response.data.current.weather_code);
          console.log("3. Precipitation: " + response.data.current.precipitation);

          // Save the route-param cityName to this.city to get the city name from the address-field
          this.city = this.$route.params.cityName + " Weather";

          const currentWeather = response.data.current;

          // Save temperature information to data variables.
          this.currentTemperature = currentWeather.temperature_2m;
          this.weatherCode = currentWeather.weather_code;
          this.precipitation = 'Precipitation: ' + currentWeather.precipitation;

          // Convert wind speed from km/h to m/s
          this.windSpeed = 'Wind: ' + Math.round(currentWeather.wind_speed_10m / 3.6) + 'm/s';
        });
    },
  },
};
</script>
