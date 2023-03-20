<script setup>
import { db}  from '@/firebase'
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from 'vue';


onMounted(async () =>{  
  const querySnapshot = await getDocs(collection(db, "appointments"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    // const appointments = ref([])
    // appointments.push(doc.data())
    console.log(doc.id, " => ", doc.data());
})

});
</script>

<template>
  <main>
    DataView Start Here
    <!-- {{ appointments }} -->
  </main>
</template>
