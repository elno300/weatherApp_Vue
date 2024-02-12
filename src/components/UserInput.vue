
<script>
// Hanterar inputfältet för att ange staden.
// Emiterar ett custom event (cityInfo) när användaren ändrar staden.

import axios from 'axios';

  export default {
    data(){
        return{

            inputCityName: this.city,

            cityInfo: {
            longitude: null,
            latitude: null,
            country: null,
            city: null,
      },
     }
    },
    watch:{
        '$route.params.cityName': {
        immediate: true,
        handler(newCityName, oldCityName) {
        if (newCityName !== null && newCityName !== oldCityName) {
          this.inputCityName = newCityName;
          this.getLocation(this.inputCityName);
        }
      },
    },
    },
    methods: {
        getLocation(){

            if(this.inputCityName!== null && this.inputCityName.trim() !== "" && this.inputCityName !== `/^[a-zA-Z\s]+$/`){

            axios.get(`https://api.geoapify.com/v1/geocode/search?city=${this.inputCityName}&state=${this.inputCityName}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)
            .then(response => {

            console.log(response.data.results[0].lon);
            console.log(response.data.results[0].country)
            console.log(response.data.results[0].city)
            console.log(response.data)

            const locationData = response.data.results[0]

            console.log("Longitude och latitude: " + locationData.lon + "," + locationData.lat)
            console.log("Country:" + locationData.country)
            console.log("City: " + locationData.city)
            console.log("All location data" + locationData)

            // För att tömma input-fältet
            this.inputCityName = null;

            this.cityInfo.latitude = locationData.lat
            this.cityInfo.longitude = locationData.lon
            this.cityInfo.country = locationData.country
            this.cityInfo.city = locationData.city


            if ( this.$route.name === "today"){
                  //the name of the city is sent to the adressfield.
                this.$router.push({ name: 'today', params: { cityName: this.cityInfo.city } });
            }
            else{
                this.$router.push({ name: 'week', params: { cityName: this.cityInfo.city } });
            }

            // cityInfo skickas som object tillsammans med eventet search-location
            this.$emit('search-location', this.cityInfo);

            });
        }}},

    computed:{
        isDisabled(){
            // return !this.cityName || this.cityName === ''
            return !this.inputCityName || this.inputCityName.trim() === ''
        }
    }
}
</script>

<template>
     <!-- <h1>Om {{ $route.params.city }}</h1> -->
        <div class="input-butt-wrapper" id="inputfield-btn-wrapper">
        <input v-model="inputCityName"
        type="text"
        id="search-weather"
        placeholder="City name.."
        />

    <!-- isDisable är boolean som är sann om inputfältet är tomt och false om det har en input -->
        <button :disabled="isDisabled"  @click = "getLocation" type="submit" class="weather-search-btn">
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
</template>
