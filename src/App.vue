<script setup>
import { RouterLink, RouterView } from 'vue-router'
Kakao.init('a58f889b066015dd555af2bb7577af7e');
console.log('kakao_initialized: ', Kakao.isInitialized());
</script>

<template>
  <!-- <header>
    <div>
              <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/data">Data</RouterLink>
              </nav>
            </div>
          </header> -->

  <RouterView />
</template>

<style scoped></style>
