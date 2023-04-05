import { createRouter, createWebHistory } from 'vue-router'
import DataView from '../views/DataView.vue'
import CallbackView from '../views/CallbackView.vue'
import KakaoView from '../views/KakaoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'data',
      component: DataView
    }
    // ,
    // {
    //   path: '/kakao',
    //   name: 'kakao',      
    //   component: KakaoView
    // },
    //  {
    //   path: '/callback',
    //   name: 'callback',      
    //   component: CallbackView
    //  }
  ]
})

export default router
