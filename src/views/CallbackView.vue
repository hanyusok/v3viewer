<script setup>
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'
// import { useCookies } from 'vue3-cookies'

// const { cookies } = useCookies()
// let ac = $cookies.get('authorize-access-token')
// let cookieVal = cookies.get('authorize-access-token')
//console.log(cookieVal)
//console.log($cookies.get('authorize-access-token'))
//const authCode = ref(location.search.substring(6))
const authCode = location.search.substring(6)
console.log(`authCode : ${authCode}`)


// const getKakaoToken = (authCode) => {   
//   try {
//     axios({
//         method: 'POST',       
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//           },
//         data: qs.stringify({
//           'grant_type': 'authorization_code',
//           'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',        
//           'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',
//           'code': authCode,          
//           'redirect_uri': 'http://127.0.0.1:5173/callback'
//         }),
//         url: 'https://kauth.kakao.com/oauth/token'
//       })
//       .then((response) => {
//           console.log(response)
//       })  
//     } catch(err){
//       console.log(err)
//     }
  
// //     //  let token = resp.data.access_token
// //     //  accToken.value = token
     
     
// //    //  .then((response) => {
// //    //   console.log(response.data())
// //           // let token = response.data()
// //           // accToken.value = token 
// //           // console.log(token)       
// //           // Kakao.Auth.setAccessToken(ac_token)   
// //      //   })
//    }



</script>


<template>
  <div>
    <h1>This is an callback page</h1>
    <p>authCode : {{ authCode }} </p> 
    <button @click="getKakaoToken">카카오 토큰</button>
    
    
  </div>
</template>

<style>

</style>
