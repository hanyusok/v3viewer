<script setup>
import axios  from 'axios'
import qs from 'qs'

let authCode = location.search.substring(6)

const accessToken = (authCode) => {
  axios({
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
  }).then((response) => {
    let ac_token = response.data.access_token    
    Kakao.Auth.setAccessToken(ac_token)   
  }).cath((err) => {
    console.log(err)
  })  
 
}


</script>


<template>
  <div>
    <h1>This is an callback page</h1>
    <p>access Token : {{ accessToken }}</p>
  </div>
</template>

<style>

</style>
