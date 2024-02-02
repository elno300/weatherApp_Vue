<script>
  import CitiesList from './components/CitiesList.vue'
  import HelloWorld from './components/HelloWorld.vue'
  import MainLayout from './components/MainLayout.vue'
  import GetLocation from './components/GetLocation.vue'

  export default {
    components: {
      CitiesList,
      HelloWorld,
      MainLayout,
      GetLocation
    }
  }
</script>

<template>
  <GetLocation></GetLocation>
  <MainLayout></MainLayout>
  <HelloWorld msg="Hello World!" />
  <CitiesList />
</template>
