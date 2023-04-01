<script setup>
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'

const authCode = location.search.substring(6)
console.log(`authCode : ${authCode}`)
const options = {
          'grant_type': 'authorization_code',
          'client_id': '3c4ba9cc89263b9e66bca4c176a4eaf3',            
          'client_secret': '8orFiiKOUqaaP5N1fbwfARNMmIuPpJCG',          
          'code': authCode,
          'redirect_uri': 'http://localhost:5173/callback'
        }

const getKakaoToken = async() => {         
    await axios({
        url: 'https://kauth.kakao.com/oauth/token',
        method: 'POST',       
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
        data: qs.stringify(options)        
      })
      .then((response) => {
        console.log(response.data())
        let respData = resp.data.access_token
        console.log(respData)        
      })  
      .catch((err) => {
        console.log(err)
    })
  }
  
//    //   console.log(response.data())
//           // let token = response.data()
//           // accToken.value = token 
//           // console.log(token)       
//           // Kakao.Auth.setAccessToken(ac_token)   
//      //   })
   
  


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
