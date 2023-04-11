import { createRouter, createWebHistory } from 'vue-router'
import DataView from '../views/DataView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useIdentityStore } from '../stores/identityStore'
import Swal from 'sweetalert2'



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
      // meta: { auth: false},
      component: LoginView
    },  
    {
      path: '/data',
      name: 'data',
      // meta: { auth: true},
      component: DataView, 
      // beforeEnter: (to, from, next) => {
      //   const identityStore = useIdentityStore()
      //   if (identityStore.isAllowed == false) {
      //     next('/login')
      //   } else {
      //     next()
      //   }
      // }
    
    }  
  ]
})

router.beforeResolve()




router.beforeEach((to, from, next) => {
  const identityStore = useIdentityStore()
  if (to.name !== 'login' && !identityStore.isAllowed) next({ name: 'login'})
  else next()
})





export default router
