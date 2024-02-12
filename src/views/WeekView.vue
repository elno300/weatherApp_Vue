<template>
    <div class="input-field">
      <UserInput @search-location="get6DaysWeather" />
    </div>
    <ul class="week-weather-ul">
        <li v-for="(day, index) in datesOfWeekName " class="week-weather-li">
            <div class="week-weather-text-container">
                <h4 class="week-weather-text">  {{ Math.round(weekWeatherData.temperature_2m_max[index]) }}°  </h4>
                <p class="day-text"> {{ day }}</p>
            </div>
           <GetWeatherCode class="weekSymbols" :weather-symbol="this.weatherCode[index]">Weather symbol: {{ codes }}</GetWeatherCode>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import UserInput from '../components/UserInput.vue';
import GetWeatherCode from '../components/GetWeatherCode.vue';

export default{

    components: {
      UserInput,
      GetWeatherCode
    },
    data(){
        return{
            datesOfWeek: [],
            datesOfWeekName: [],
            weeklyWeatherCode: [],
            weekWeatherData: null,
            weatherCode:null,
            cityInfo: null
        }
    },
    methods:{
        get6DaysWeather(cityInfo){
            // Reseting the arrays/number before populating them with data
            this.datesOfWeek = [];
            this.datesOfWeekName = [];
            this.weeklyWeatherCode = [];
            this.weatherCode = null;

            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max`)
                 .then(response2 => {
                console.log("6 days: "+ JSON.stringify(response2.data.daily))
                this.weatherCode=""

                this.weekWeatherData = response2.data.daily
                this.weatherCode = response2.data.daily.weather_code
                this.datesOfWeek = (response2.data.daily.time)

                console.log(JSON.stringify(this.datesOfWeek))
                console.log(JSON.stringify(this.weatherCode))

                // The time or dates of the week transformed into name of day, number of the day and month (ex.Monday 6th May For each "time" and pushed into the array.)
                this.datesOfWeek.forEach((time) => {
                this.datesOfWeekName.push(moment(`${time}`).format('dddd Do MMMM'))
                });

                //Type of weatherCode = number.
                console.log(typeof(this.weatherCode[0]))

            });
        },
    }
}

</script>

<style scoped>
 #weather-symbol{
    height: 10px;
    width: 10px;
  }
</style>
