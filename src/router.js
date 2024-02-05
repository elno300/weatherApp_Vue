import { createRouter, createWebHashHistory } from 'vue-router'

import TodayView from './views/TodayView.vue'
import TomorrowView from './views/TomorrowView.vue'
import WeekView from './views/WeekView.vue'


export default createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        component: TodayView,
        path: "/today"
      },
      {
        component: TomorrowView,
        path: "/tomorrow"
      },
      {
        component: WeekView,
        path: "/week"
      }
    ]
  })
