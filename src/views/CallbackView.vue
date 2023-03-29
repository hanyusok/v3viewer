<script setup>
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'

const authCode = ref(location.search.substring(6))
console.log(authCode)
const accToken = ref()

const getKakaoToken = async(authCode) => {  
  const resp = await axios({
       method: 'POST',
       url: 'https://kauth.kakao.com/oauth/token',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
         },
       data: qs.stringify({
         'grant_type': 'authorization_code',
         'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',
         'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',
         'code': authCode,
         'redirect_uri': 'http://127.0.0.1:5173/callback'
       })
     })  

     let token = resp.data.access_token
     accToken.value = token
     
     
   //  .then((response) => {
   //        let token = response.data()
   //        accToken.value = token 
   //        console.log(token)       
          // Kakao.Auth.setAccessToken(ac_token)   
   //      })
   //  .cath((err) => {
   //        console.log(err)
   //      })   
   }



</script>


<template>
  <div>
    <h1>This is an callback page</h1>
    <button @click="getKakaoToken">카카오 토큰</button>
    <p>access Token : {{ accToken }} </p> 
    
  </div>
</template>

<style>

</style>
