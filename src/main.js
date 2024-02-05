import { createApp } from 'vue'

import App from './App.vue'
// import '../assets/weather.css'
// import router from '/src/router.js'
import router from "./router"

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
app.mount("#app")
