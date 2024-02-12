
<template>
    <body>
      <section>
    <NavBar />
    <RouterView />
    </section>
  </body>
</template>

<script>
import NavBar from '../src/components/NavBar.vue';
import { RouterView } from 'vue-router';


export default {
components: {
  NavBar,
  RouterView,
},
};


// if ("geolocation" in navigator) {
//   // Prompt user for permission to access their location
//       navigator.geolocation.getCurrentPosition(
//     // Success callback function
//     (position) => {
//       // Get the user's latitude and longitude coordinates
//       this.longitude = position.coords.latitude;
//       this.latitude = position.coords.longitude;


//       // Do something with the location data, e.g. display on a map
//       console.log(`Latitude: ${lat}, longitude: ${lng}`);
//     }

</script>


<style >

  body{
    background-color: aliceblue;
  }

  section{
      width: 360px;
      height: 100%;
      min-height: 100vh;
      background: rgb(231,248,255);
      background: linear-gradient(180deg, rgba(231,248,255,1) 0%, rgba(128,206,238,1) 100%, rgba(255,248,57,1) 100%);
      background-repeat: no-repeat;
      padding: 0;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 16px;
  }

  .top-nav{
      display: flex;
      margin: 0;
      padding: 0;
      top: 0;
      justify-content: center;
  }

  .router-link{
    text-decoration: none;
    color: black;
  }

  .routerlink-container{
    display: flex;
    justify-content:space-between;
    /* align-items: stretch; */
    /* background-color: red; */
    width: 70%;
  }

  input{
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    height: 28px;
    width: 70%;
    margin:0;
    box-shadow:10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    border: 1px solid #FFF;
    padding: 4px 20px 4px 15px;
  }

  button{
    background: rgba(255, 255, 255, 0.719);
    color: #878787db;
    margin-left: 10px;
    margin-right: 0;
    width: 48px;
    height: 48px;
    border-radius: 15px;
    cursor: pointer;
    border: none;
  }

  button:hover{
    border-color: #FFF;
    border: solid 1px #FFF;
  }

  .magnifying-glass{
    padding-top: 4px;
    padding-right: 2px;
  }

  button:hover .magnifying-glass{
    color: rgb(0, 0, 0);
    font-size: large;
    height: 28px;
    width: 28px;
  }

  .input-butt-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }

ul{
  list-style: none;
  padding: 0;
  margin: 10px;
}

  #weather-symbol{
  width: 100%;
  height: 100%;
  }

.weekSymbols{
    height: 40px;
    width: 40px;
  }

  .week-weather-li{
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    padding: 15px 00;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding:10px 16px;
  }

  .week-weather-text-container{
    flex-grow: 1;
  }


  h4{
    font-size: 28px;
    font-weight:lighter;
    margin: 0;
    padding: 0;
  }

  p, h2, h3, h4, li{
    font-family: Inter regular, Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }

  .day-text{
    font-size: 14px;
    margin: 0;
  }

@font-face {
  font-family: Inter regular;
  src: url(../assets/Font/Inter/static/Inter-Regular.ttf);
}

.today-weather-symbol-container{

  width: 60%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.today-symbol-container{
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
}

.current-city{
  font-size: 24px;
  text-transform: uppercase;
  padding-top: 8px;
}

.current-date{
  padding-top: 10px;
  font-size: 14px;
}

.current-temp{
  font-size: 85px;
}


  /* .dark-mode-icon:hover{
      transform: rotate(-45deg);
      color: rgb(24, 70, 70);
  }

  .dark-mode-icon:active{
     transform: rotate(360deg);
     transition: transform .5s ease-in-out;
  }

  .dark-mode-icon{
      align-items: center ;
      justify-self: center;
      transition: transform .3s ease-in-out;
      transition: transform .5s ease-in-out;
  /* } */
</style>
