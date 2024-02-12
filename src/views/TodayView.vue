
<template>
    <div>
      <UserInput @search-location="getTodaysWeather" />
    </div>
    <!-- <UserInput :name="" -->
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
    <p v-else>No weather information available, try to type in a name of a city above.</p>

</template>

<script>
    import axios from 'axios';
    import UserInput from '../components/UserInput.vue';
    import GetWeatherCode from '../components/GetWeatherCode.vue';
    import moment from 'moment';

  export default {

    components: {
      UserInput,
      GetWeatherCode,

    },
    data(){
        return{
            cityInfo: null,
            currentTemperature: null,
            precipitation:null,
            weatherCode:null,
            windSpeed: null,
            todaysDate: null,
            city: null

        }
    },
    created(){
      //Get todays date using moment. ex. Mondat 6th May
      this.todaysDate = moment(new Date()).format('dddd Do MMMM')

    },
    methods: {
     getTodaysWeather(cityInfo){

      // Save parameter to  data-vaiable
        this.cityInfo = cityInfo

        // //the name of the city is sent to the adressfield.
        // this.$router.push({ name: 'today', params: { cityName: this.cityInfo.city } });

        // Här hämtas staden från inputvärdet i textboxen
        //  const cityInputValue = cityInput.value

        // Här sparas inputvärdet i localStorage så att man kan gå ur och komma tillbaka och ändå se den senast sökta staden
        // localStorage.setItem('saveCity', cityInputValue)

        console.log(this.cityInfo)
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.cityInfo.latitude}&longitude=${this.cityInfo.longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1`)
        .then(response => {

        //Kollar värdena från
        console.log("1.Current temp: " + response.data.current.temperature_2m )
        console.log("2.Symbol code:" + response.data.current.weather_code)
        console.log("3.Precipitation: " + response.data.current.precipitation)

        // Save the route-param cityName to this.city to get the sity name from the adress-field
        this.city = this.$route.params.cityName + " Weather";

        //
        const currentWeather = response.data.current

        // Save temperature infromation to data variables.
        this.currentTemperature = currentWeather.temperature_2m
        this.weatherCode = currentWeather.weather_code
        this.precipitation = 'Precipitation: ' + currentWeather.precipitation

         // 3.6 omvandlar km/h till m/s
        this.windSpeed = 'Wind: ' + Math.round(currentWeather.wind_speed_10m/3.6) + 'm/s'
      })
  },
}}
</script>
