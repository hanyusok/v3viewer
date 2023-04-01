<script setup>
import { async } from '@firebase/util';
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'

const authCode = location.search.substring(6)
let access_token 
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
        method: 'POST',       
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
        data: qs.stringify(options),
        url: 'https://kauth.kakao.com/oauth/token'
      })
    .then((response) => {          
          access_token = response.data.access_token
          Kakao.Auth.setAccessToken(access_token)       
      })          
    .catch((err) => {
      console.log(err)
    })
  }


</script>


<template>
  <div>
    <h1>This is an callback page</h1>
    <p>authCode : {{ authCode }} </p> 
    <hr>
    <button @click="getKakaoToken">카카오 토큰</button>
    <hr>
    <p>access_Token : {{ access_token }} </p> 
    
    
  </div>
</template>

<style>

</style>
