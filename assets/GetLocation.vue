<script>
import axios from 'axios';
import moment from 'moment'
  export default {

    data(){
        return{
            cityName: null,
            longitude: null,
            latitude: null,
            country: null,
            date: null,
            datesOfWeek: [],
            datesOfWeekName: [],
            weeklyWeatherCode: [],
            weekWeatherData: null

        }
    },
    created(){
      const todaysDate = "2017-08-30";
      console.log(moment(todaysDate).format('dddd'));
    },
    methods: {
        getLocation(){
            axios.get(`https://api.geoapify.com/v1/geocode/search?city=${this.cityName}&state=${this.cityName}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)
            .then(response => {
          // handle the response data

          console.log(response.data.results[0].lon);
          console.log(response.data.results[0].lat);
          console.log(response.data.results[0].country)
          console.log(response.data.results[0].city)
          console.log(response.data)
          
          this.cityName = null;
          // console.log(response.data.results[0].datasource.url)
              this.latitude = response.data.results[0].lat
              this.longitude = response.data.results[0].lon
              console.log(this.longitude, this.latitude);


          this.getTodaysWeather()
          this.get6DaysWeather()

        })
        },

        getTodaysWeather(){

          axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m&forecast_days=1`)
         .then(response => {

        //Hämtar värdena från
        console.log(response.data.current.temperature_2m )
        console.log(response.data.current.weather_code)
        console.log(response.data.current.precipitation)

         }
         )

      },
      get6DaysWeather(){

        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max`)
        .then(response2 => {


          console.log("6 days: "+ JSON.stringify(response2.data.daily))

          this.weekWeatherData = response2.data.daily

          this.datesOfWeek = (response2.data.daily.time)
          // console.log(JSON.stringify(response2.data.daily))

          this.datesOfWeek.forEach((time) => {
            // Här översätt veckand datum till dagens namn alltså Monday osv.
          this.datesOfWeekName.push(moment(`${time}`).format('dddd'))
           });

           this.weeklyWeatherCode = (response2.data.daily.weather_code)

      //      const todaysDate = "2017-08-30";
      // console.log(moment(todaysDate).format('dddd'));

        })
      }
    },
    computed:{
        isDisabled(){
            // return !this.cityName || this.cityName === ''
            return !this.cityName || this.cityName.trim() === ''
        }
    }

  }


</script>
<!-- v-on:keyup.enter="getLocation()" -->
<template>
    <div id="inputfield-btn-wrapper">
    <input v-model="cityName"
      type="text"
      id="search-weather"
      placeholder="City name.."
    />
    <!-- :class="{ 'disabled-butt' : isDisabled }" -->
    <!-- isDisable är boolean som är sann om inputfältet är tomt och false om det har en input -->
    <button :disabled="isDisabled"  @click = getLocation() type="submit" class="weather-search-btn">
        <svg class="magnifying-glass"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
            fill="currentColor"
        />
        </svg>
    </button>
  </div>
  <ul v-for="(day, index) in datesOfWeekName " id="container-all-cities">
        <li>
           <h3> {{ day }}</h3>
           <p> Temperature: {{ weekWeatherData.temperature_2m_max[index] }} C° max //</p>
           <p> Temperature: {{ weekWeatherData.temperature_2m_min[index] }} C° min //</p>
           <p> Precipitation: {{ weekWeatherData.precipitation_sum[index] }} C° min //</p>
           <p> Max wind speed: {{ weekWeatherData.wind_speed_10m_max[index] }} //</p>
        </li>
  </ul>
</template>

<style scoped>

button{
  color: aquamarine;
  width: 50px;
}
/* .disabled-butt{
 background-color: black;
} */

.magnifying-glass:hover{
  width: 32px;
  height: 32px;
  color: rgb(232, 219, 219);
}

</style>
