import { createRouter, createWebHashHistory } from 'vue-router'

import TodayView from './views/TodayView.vue'
import WeekView from './views/WeekView.vue'
import TomorrowView from './views/TomorrowView.vue'


export default createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        component: TodayView,
        path: "/today/:cityName?",
        name: 'today'
      },
      {
        component: TomorrowView,
        path: "/tomorrow"
      },
      {
        component: WeekView,
        path: "/week/:cityName?",
        name: 'week'
      }
    ]
  })
