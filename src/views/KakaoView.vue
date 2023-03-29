<script setup>
import axios  from 'axios'
import qs from 'qs'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'




// console.log(this.$route.query.code)

// const authCode = ref(location.search.substring(6))
// console.log(authCode)

</script>


<template>
    <main>
        <h3>Kakao 메세지 보내기</h3>        
        <p>code : {{ props.acode }}</p>
        
    </main>
</template>

<style>

</style>
