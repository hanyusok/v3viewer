import { createRouter, createWebHistory } from 'vue-router'
import DataView from '../views/DataView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',            
      component: HomeView
    },
    // {
    //   path: '/login',  
    //   name: 'login',            
    //   component: LoginView
    // },  
    {
      path: '/data',
      name: 'data',      
      component: DataView,    
    }  
  ]
})

export default router
