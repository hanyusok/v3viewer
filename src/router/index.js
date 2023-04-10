import { createRouter, createWebHistory } from 'vue-router'
import DataView from '../views/DataView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useIdentityStore } from '../stores/identityStore'
import { all } from 'axios'



const router = createRouter({  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',      
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',      
      component: LoginView
    },  
    {
      path: '/data',
      name: 'data',
      // meta: { auth: true},
      component: DataView, 
      beforeEnter: () => {
        const identityStore = useIdentityStore()
        if(identityStore.isAllowed){
          return false
        } else {
          return true
        }
      }
    }  
  ]
})

// router.beforeEach((to, from, next) => {
//   const identityStore = useIdentityStore()
//   const allowed = identityStore.isAllowed
//   if(to.meta.requiresAuth && allowed) {
//       next('/data')
//     } else {
//       next('/login')
//     }
// }) 



export default router
