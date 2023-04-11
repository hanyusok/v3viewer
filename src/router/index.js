import { createRouter, createWebHistory } from 'vue-router'
import DataView from '../views/DataView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useIdentityStore } from '../stores/identityStore'




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
      meta: { auth: false},
      component: LoginView
    },  
    {
      path: '/data',
      name: 'data',
      meta: { auth: true},
      component: DataView,       
    }  
  ]
})

// router.beforeEach((to, from, next) => {
//   const identityStore = useIdentityStore()
//   const allowed = identityStore.isAllowed
//   return '/'

  // if(!to.meta.auth ) {
  //     next('/login')
  //   } else if (to.meta.auth ) {
  //     next('/data')
  //   } else {
  //     next('/')
  //   }
// }) 



export default router
